import {AMOUNT_CARDS_TASK_FIRST_LOAD, ClassesElements, sortTypes, LOAD_MORE_COUNT} from "../components/config";
import {state} from "../main";
import AbstractComponent from "../components/abstract-component";
import Menu from "../components/menu";
import Search from "../components/search";
import Filter from "../components/filters";
import BoardContainer from "../components/board-container";
import BoardFilter from "../components/board-filter";
import BoardFilterItem from "../components/board-filter-item";
import BoardTasks from "../components/board-tasks";
import MoreBtn from "../components/load-more";
import TaskController from "./task-controller";
import NoTasks from "../components/no-tasks";
import {filteringTask, sortingTasks} from "../components/utils";

export class Index {
  constructor(tasks) {
    this._tasksOrigin = tasks;
    this._tasks = this._tasksOrigin;
    this._memu = new Menu();
    this._search = new Search();
    this._filter = new Filter(this._tasks);
    this._boardContainer = new BoardContainer();
    this._boardFilter = new BoardFilter();
    this._boardTasks = new BoardTasks();
    this._noTasks = new NoTasks();
    this._moreBtn = new MoreBtn();
    this._state = {
      amountCards: AMOUNT_CARDS_TASK_FIRST_LOAD,
      filter: `all`,
      sort: `default`,
      loadMore: false
    };
  }

  init() {
    AbstractComponent.renderElement(`.${ClassesElements.CONTROL}`, this._memu.getElement());
    AbstractComponent.renderElement(`.${ClassesElements.MAIN}`, this._search.getElement());
    AbstractComponent.renderElement(`.${ClassesElements.MAIN}`, this._filter.getElement());
    this._changeTasksOrder(() => filteringTask[this._state.filter](this._tasksOrigin));
    this._renderBoard();
  }

  _changeTasksOrder(fn = () => this._tasks.filter((it) => !it.isArchive)) {
    if (fn) {
      this._tasks = fn();
    }
    this._boardContainer.removeElement();
    state.reset = this._tasks.length;
    this._moreBtn.removeElement();
    this._state.loadMore = false;
    this._renderBoard(this._tasks);
  }

  _renderBoard(tasks = this._tasks) {
    this._boardTasks.removeElement();
    this._boardContainer.removeElement();
    AbstractComponent.renderElement(`.${ClassesElements.MAIN}`, this._boardContainer.getElement());
    AbstractComponent.renderElement(`.${ClassesElements.BOARD}`, this._boardTasks.getElement());
    this._renderTask(`.${ClassesElements.BOARD_TASKS}`, tasks ? tasks.slice(0, this._state.amountCards) : null);
  }

  _renderTask(container, items) {
    if (items && items.length) {
      this._renderFilter();

      items.forEach((it) => {
        const taskController = new TaskController(container, it, this._onDataChange.bind(this));
        taskController.init();
        this._renderLoadMore();
      });

      state.changeRenderCardTask = items.length;
      if (!this._state.loadMore) {
        this._renderLoadMore();
        this._state.loadMore = true;
      }

    } else {
      AbstractComponent.renderElement(`.${ClassesElements.BOARD_TASKS}`, this._noTasks.getElement());
    }
  }

  _onDataChange(currentData, newDate) {
    this._tasksOrigin[this._tasksOrigin.findIndex((it) => it === currentData)] = newDate;
    this._tasks[this._tasks.findIndex((it) => it === currentData)] = newDate;
    this._changeTasksOrder();
  }

  _renderFilter() {
    this._boardFilter.removeElement();
    AbstractComponent.renderElement(`.${ClassesElements.BOARD}`, this._boardFilter.getElement(), `prepend`);

    const onFilterItemClick = (evt) => {
      this._state.sort = evt.target.closest(`a`).dataset.type;
      if (this._state.sort === `default`) {
        this._changeTasksOrder(() => filteringTask[this._state.filter](this._tasksOrigin));
      } else {
        this._changeTasksOrder(() => [...this._tasks].sort(sortingTasks[this._state.sort]).filter((it) => !it.isArchive));
      }
    };

    sortTypes.forEach((it) => {
      const filterItem = new BoardFilterItem(it);

      filterItem.getElement().addEventListener(`click`, onFilterItemClick);

      AbstractComponent.renderElement(this._boardFilter.getElement(), filterItem.getElement());
    });
  }

  _renderLoadMore() {
    let loadMoreBtnElement = this._moreBtn.getElement();

    AbstractComponent.renderElement(`.${ClassesElements.BOARD}`, loadMoreBtnElement);

    /**
     * Функция для отрисовки дополнительных задач по нажатию на кнопку Load more
     *
     * @param {number} amountCardsTasks Количество задач, которое необходимо отрисовать
     */
    const moreTasks = (amountCardsTasks) => {
      const startRenderCardNumber = state.amountRenderCardTask;
      let endRenderCardNumber = startRenderCardNumber + amountCardsTasks;

      if (endRenderCardNumber > state.amountAllTasks) {
        amountCardsTasks = state.amountAllTasks - state.amountRenderCardTask;
        endRenderCardNumber = startRenderCardNumber + amountCardsTasks;
      }

      this._renderTask(`.${ClassesElements.BOARD_TASKS}`, this._tasks.slice(startRenderCardNumber, endRenderCardNumber));

      if (state.checkNoRenderCardsTasks <= 0) {
        removeLoadMoreBtn();
      }
    };

    /**
     * Функция для обработки события клика на кнопке Load more
     *
     * @param {Event} evt
     */
    const onLoadMoreClick = (evt) => {
      let target = evt.target;
      if (!target.closest(`.load-more`)) {
        return;
      }

      moreTasks(LOAD_MORE_COUNT);
    };

    loadMoreBtnElement.addEventListener(`click`, onLoadMoreClick);

    /**
     * Функция, удаляющая кнопку Load more
     */
    const removeLoadMoreBtn = () => {
      loadMoreBtnElement.removeEventListener(`click`, onLoadMoreClick);
      loadMoreBtnElement.parentElement.removeChild(loadMoreBtnElement);
    };
  }
}
