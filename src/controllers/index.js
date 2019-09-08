import {AMOUNT_CARDS_TASK_FIRST_LOAD, ClassesElements, sortTypes, LOAD_MORE_COUNT} from "../components/config";
import {state} from "../main";
import AbstractComponent from "../components/abstract-component";
import Filter from "../components/filters";
import BoardContainer from "../components/board-container";
import BoardFilter from "../components/board-filter";
import BoardFilterItem from "../components/board-filter-item";
import BoardTasks from "../components/board-tasks";
import MoreBtn from "../components/load-more";
import TaskController from "./task-controller";
import NoTasks from "../components/no-tasks";
import {filteringTask, sortingTasks, getDateForSearchFromTimeStamp} from "../components/utils";
import MenuController from "./menu-controller";
import Statistic from "../components/statistic";
import {getNewTaskData} from "../components/data";
import SearchController from "./search-controller";
import SearchResult from "../components/search-result";
import {getSearchResultTitle} from "../components/search-result-title";
import SearchNoResults from "../components/search-no-results";

export class Index {
  constructor(tasks) {
    this._tasksOrigin = tasks;
    this._tasks = this._tasksOrigin;
    this._memuController = new MenuController(`.${ClassesElements.CONTROL}`, this._onChangeView.bind(this));
    this._searchController = new SearchController(`.${ClassesElements.MAIN}`, this._onChangeView.bind(this));
    this._filter = new Filter(this._tasks);
    this._boardContainer = new BoardContainer();
    this._boardFilter = new BoardFilter();
    this._boardTasks = new BoardTasks();
    this._statistic = new Statistic(`.${ClassesElements.MAIN}`);
    this._searchResult = new SearchResult(`.${ClassesElements.MAIN}`, this._onChangeView.bind(this));
    this._noResults = new SearchNoResults();
    this._noTasks = new NoTasks();
    this._moreBtn = new MoreBtn();
    this._state = {
      amountCards: AMOUNT_CARDS_TASK_FIRST_LOAD,
      filter: `all`,
      sort: `default`,
      loadMore: false,
      menuItems: new Map([
        [`control__task`, this._boardContainer],
        [`control__statistic`, this._statistic],
      ]),
      page: `tasks`
    };
  }

  init() {
    AbstractComponent.renderElement(`.${ClassesElements.MAIN_SEARCH_CONTAINER}`, this._filter.getElement(), `insertAfter`);
    this._statistic.init();
    this._changeTasksOrder(() => filteringTask[this._state.filter](this._tasksOrigin));
  }

  _onChangeView(activeMenuItem, add, text) {
    // Array.from(this._state.menuItems).forEach((it) => it[0] === activeMenuItem ? this._state.menuItems.get(activeMenuItem).show() : this._state.menuItems.get(activeMenuItem).hide());

    switch (activeMenuItem) {
      case `control__task`:
        this._state.page = `tasks`;
        this._boardContainer.show();
        this._statistic.hide();
        this._searchResult.hide();
        this._searchController.searchInputClean();
        break;
      case `control__statistic`:
        this._state.page = `statistics`;
        this._boardContainer.hide();
        this._statistic.show();
        this._searchResult.hide();
        break;
      case `search`:
        this._state.page = `searchResult`;
        this._boardContainer.hide();
        this._statistic.hide();
        this._searchResult.show();
        if (text.length === 10 && ((text[2] === `.` && text[5] === `.`) || (text[2] === `/` && text[5] === `/`) || (text[2] === `,` && text[5] === `,`))) {
          this._changeTasksOrder(() => this._tasksOrigin.filter((it) => getDateForSearchFromTimeStamp(it.dueDate) === text.replace(/\./g, ``).replace(/\//g, ``).replace(/\,/g, ``)));
        } else if (text[0] === `#`) {
          this._changeTasksOrder(() => this._tasksOrigin.filter((it) => it.tags.has(text.slice(1))));
        } else {
          this._changeTasksOrder(() => this._tasksOrigin.filter((it) => it.description.includes(text)));
        }
        this._searchResult.getElement().querySelector(`.${ClassesElements.MAIN_SEARCH_RESULT_TITLE}`).innerHTML = getSearchResultTitle(text, this._tasks.length);
        break;
    }

    if (add) {
      this._onDataChange(null, getNewTaskData());
    }
  }

  _changeTasksOrder(fnFilter = () => this._tasks.filter((it) => !it.isArchive)) {
    if (fnFilter) {
      this._tasks = fnFilter();
    }
    state.reset = this._tasks.length;
    this._moreBtn.removeElement();
    this._state.loadMore = false;
    if (this._state.page !== `searchResult`) {
      this._renderTasksBoard(this._tasks);
    } else {
      this._renderSearchResults(this._tasks);
    }
  }

  _renderTasksBoard(tasks = this._tasks) {
    this._boardTasks.removeElement();
    this._boardContainer.removeElement();
    AbstractComponent.renderElement(`.${ClassesElements.MAIN}`, this._boardContainer.getElement());
    AbstractComponent.renderElement(`.${ClassesElements.BOARD}`, this._boardTasks.getElement());
    this._renderTask(`.${ClassesElements.BOARD_TASKS}`, tasks ? tasks.slice(0, this._state.amountCards) : null);
  }

  _renderSearchResults(tasks = this._tasks) {
    const mainSearchResultCardsElement = this._searchResult.getElement().querySelector(`.${ClassesElements.MAIN_SEARCH_RESULT_CARDS}`);

    if (tasks && tasks.length) {
      mainSearchResultCardsElement.textContent = ``;
      this._renderTask(mainSearchResultCardsElement, tasks ? tasks.slice(0, this._state.amountCards) : null);
    } else {
      AbstractComponent.renderElement(`.${ClassesElements.MAIN_SEARCH_RESULT_TITLE}`, this._noResults.getElement(), `insertAfter`);
    }
  }

  _renderTask(container, items = (this._tasks ? this._tasks.slice(0, this._state.amountCards) : null)) {
    if (items && items.length) {
      if (this._state.page !== `searchResult`) {
        this._renderFilter();
      }

      items.forEach((it) => {
        const taskController = new TaskController(container, it, this._onDataChange.bind(this));
        taskController.init();
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
    const newDateIndexInTasksOrigin = this._tasksOrigin.findIndex((it) => it === currentData);
    const newDateIndexInTasks = this._tasks.findIndex((it) => it === currentData);

    if (!newDate) {
      this._tasksOrigin.splice(newDateIndexInTasksOrigin, 1);
      this._tasks.splice(newDateIndexInTasks, 1);
    } else if (!currentData) {
      this._tasksOrigin.unshift(newDate);
      this._tasks.unshift(newDate);
    } else {
      this._tasksOrigin[newDateIndexInTasksOrigin] = newDate;
      this._tasks[newDateIndexInTasks] = newDate;
    }

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
