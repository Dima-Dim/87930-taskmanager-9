import {AMOUNT_CARDS_TASK_FIRST_LOAD, ClassesElements, sortTypes, LOAD_MORE_COUNT} from "../components/config";
import {globalState} from "../main";
import AbstractComponent from "../components/abstract-component";
import BoardContainer from "../components/board-container";
import SortContainer from "../components/sort-container";
import BoardFilterItem from "../components/board-filter-item";
import BoardTasks from "../components/board-tasks";
import MoreBtn from "../components/load-more";
import TaskController from "./task-controller";
import NoTasks from "../components/no-tasks";
import {filteringTask, sortingTasks, getDateForSearchFromTimeStamp, taskFiltering} from "../components/utils";
import MenuController from "./menu-controller";
import Statistic from "../components/statistic";
import {getNewTaskData} from "../components/data";
import SearchController from "./search-controller";
import SearchResult from "../components/search-result";
import {getSearchResultTitle} from "../components/search-result-title";
import SearchNoResults from "../components/search-no-results";

export class Index {
  constructor() {
    this._tasks = globalState.tasks;
    this._memuController = new MenuController(`.${ClassesElements.CONTROL}`, this._onChangeView.bind(this));
    this._searchController = new SearchController(`.${ClassesElements.MAIN}`, this._onChangeView.bind(this));
    this._boardContainer = new BoardContainer();
    this._sortContainer = new SortContainer();
    this._boardTasks = new BoardTasks();
    this._statistic = new Statistic(`.${ClassesElements.MAIN}`, globalState.tasks);
    this._searchResult = new SearchResult(`.${ClassesElements.MAIN}`, this._onChangeView.bind(this));
    this._noResults = new SearchNoResults();
    this._noTasks = new NoTasks();
    this._moreBtn = new MoreBtn();
    this._state = {
      amountCards: AMOUNT_CARDS_TASK_FIRST_LOAD,
      filter: `all`,
      text: null,
      sort: `default`,
      loadMore: false,
      menuItems: new Map([
        [`control__task`, this._boardContainer],
        [`control__task--filter`, this._boardContainer],
        [`control__statistic`, this._statistic],
        [`search`, this._searchResult],
      ]),
      page: `control__task`,
    };

    this.init();
  }

  init() {
    this._memuController.init();
    this._searchController.init();
    this._statistic.init();
    this._searchResult.init();
    this._changeTasksOrder();

    window.addEventListener(`online`, () => {
      globalState.provider.sync()
        .then(this._dataChangeHandler({}));
    });
  }

  _onChangeView(activeMenuItem, add, searchData) {
    switch (activeMenuItem) {
      case `control__task`:
        this._state.menuItems.get(this._state.page).hide();
        this._state.page = activeMenuItem;
        this._state.menuItems.get(this._state.page).show();
        this._searchController.searchInputClean();
        break;

      case `control__statistic`:
        this._state.menuItems.get(this._state.page).hide();
        this._state.page = activeMenuItem;
        this._state.menuItems.get(this._state.page).show();
        this._searchController.searchInputClean();
        break;

      case `search`:
        this._state.text = searchData.text;
        this._state.filter = searchData.filter;

        if (this._state.text) {
          this._state.menuItems.get(this._state.page).hide();
          this._state.page = activeMenuItem;
          this._state.menuItems.get(this._state.page).show();

          if (this._state.text.length === 10 && ((this._state.text[2] === `.` && this._state.text[5] === `.`) || (this._state.text[2] === `/` && this._state.text[5] === `/`) || (this._state.text[2] === `,` && this._state.text[5] === `,`))) {
            this._changeTasksOrder(() => this._tasks.filter((it) => getDateForSearchFromTimeStamp(it.dueDate) === this._state.text.replace(/\./g, ``).replace(/\//g, ``).replace(/\,/g, ``)));
          } else if (this._state.text[0] === `#`) {
            this._changeTasksOrder(() => this._tasks.filter((it) => it.tags.has(this._state.text.slice(1))));
          } else {
            this._changeTasksOrder(() => this._tasks.filter((it) => it.description.includes(this._state.text)));
          }

          this._searchResult.getElement().querySelector(`.${ClassesElements.MAIN_SEARCH_RESULT_TITLE}`).innerHTML = getSearchResultTitle(this._state.text, this._tasks.length);
        } else {
          this._searchResult.hide();
          this._state.page = `control__task--filter`;

          this._changeTasksOrder();
        }

        break;
    }

    if (add) {
      this._onDataChange(null, getNewTaskData());
    }
  }

  _changeTasksOrder() {
    globalState.reset = this._tasks.length;
    this._moreBtn.removeElement();
    this._state.loadMore = false;

    if (!this._tasks.length && (this._state.page[`control__task--filter`] || this._state.page[`search`])) {
      AbstractComponent.renderElement(`.${ClassesElements.MAIN_SEARCH_RESULT_TITLE}`, this._noResults.getElement(), `insertAfter`);
    } else {
      this._renderTasksBoard(taskFiltering(this._state.filter));
    }
  }

  _renderTasksBoard(tasks = this._tasks) {
    this._boardTasks.removeElement();
    this._boardContainer.removeElement();
    AbstractComponent.renderElement(`.${ClassesElements.MAIN}`, this._boardContainer.getElement());
    AbstractComponent.renderElement(`.${ClassesElements.BOARD}`, this._boardTasks.getElement());
    this._renderTask(`.${ClassesElements.BOARD_TASKS}`, tasks ? tasks.slice(0, this._state.amountCards) : null);
  }

  _renderTask(container, items = (this._tasks ? this._tasks.slice(0, this._state.amountCards) : null)) {
    if (items && items.length) {
      if (this._state.page !== `search`) {
        this._renderFilter();
      }

      items.forEach((it) => {
        const taskController = new TaskController(container, it, this._onDataChange.bind(this));
        taskController.init();
      });

      globalState.changeRenderCardTask = items.length;
      if (!this._state.loadMore) {
        this._renderLoadMore();
        this._state.loadMore = true;
      }

    } else {
      AbstractComponent.renderElement(`.${ClassesElements.BOARD_TASKS}`, this._noTasks.getElement());
    }
  }

  _dataChangeHandler({cb}) {
    return () => globalState.provider.getTasks()
      .then((tasks) => globalState.addTasks(tasks))
      .then(() => cb ? cb.success() : ``)
      .then(() => (this._tasks = globalState.tasks))
      .then(() => this._changeTasksOrder());
  }

  _onDataChange(currentData, newDate, cb) {
    if (!newDate) {
      globalState.provider.removeTask(currentData)
        .then(this._dataChangeHandler({cb}))
        .catch((err) => cb.error(err));
    } else if (!currentData) {
      this._tasks.unshift(newDate);
      this._changeTasksOrder();
    } else if (currentData.isDraft) {
      globalState.provider.createTask(newDate)
        .then(this._dataChangeHandler({cb}))
        .catch((err) => cb.error(err));
    } else {
      globalState.provider.updateTask(newDate)
        .then(this._dataChangeHandler({cb}))
        .catch((err) => cb.error(err));
    }
  }

  _renderFilter() {
    this._sortContainer.removeElement();
    AbstractComponent.renderElement(`.${ClassesElements.BOARD}`, this._sortContainer.getElement(), `prepend`);

    const onFilterItemClick = (evt) => {
      this._state.sort = evt.target.closest(`a`).dataset.type;
      if (this._state.sort === `default`) {
        this._changeTasksOrder(() => filteringTask[this._state.filter](globalState.tasks));
      } else {
        this._changeTasksOrder(() => [...this._tasks].sort(sortingTasks[this._state.sort]).filter((it) => !it.isArchive));
      }
    };

    sortTypes.forEach((it) => {
      const filterItem = new BoardFilterItem(it);

      filterItem.getElement().addEventListener(`click`, onFilterItemClick);

      AbstractComponent.renderElement(this._sortContainer.getElement(), filterItem.getElement());
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
      const startRenderCardNumber = globalState.amountRenderCardTask;
      let endRenderCardNumber = startRenderCardNumber + amountCardsTasks;

      if (endRenderCardNumber > globalState.amountAllTasks) {
        amountCardsTasks = globalState.amountAllTasks - globalState.amountRenderCardTask;
        endRenderCardNumber = startRenderCardNumber + amountCardsTasks;
      }

      this._renderTask(`.${ClassesElements.BOARD_TASKS}`, this._tasks.slice(startRenderCardNumber, endRenderCardNumber));

      if (globalState.checkNoRenderCardsTasks <= 0) {
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
