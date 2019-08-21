import {ALL_TASK_COUNT, AMOUNT_CARDS_TASK_FIRST_LOAD} from "./components/config";
import {renderElements} from "./components/utils";
import {getTaskData} from "./components/data";
import {renderMenu} from "./components/menu";
import {renderSearch} from "./components/search";
import {renderFilters} from "./components/filters";
import {renderBoardContainer} from "./components/board-container";
import {renderBoardFilter} from "./components/board-filter";
import {renderBoardTask} from "./components/board-tasks";
import {renderTask} from "./components/card-task";
import {renderMoreBtn, addEventListenerForLoadMore, removeLoadMoreBtn} from "./components/load-more";

const state = {
  allTasks: 0,
  renderCardTaskCounter: 0,

  set changeAllTasks(amount) {
    this.allTasks += amount;
  },

  get amountAllTasks() {
    return this.allTasks;
  },

  set changeRenderCardTask(amount) {
    this.renderCardTaskCounter += amount;
  },

  get amountRenderCardTask() {
    return this.renderCardTaskCounter;
  },

  get checkNoRenderCardsTasks() {
    return this.allTasks - this.amountRenderCardTask;
  }
};

/**
 * Функция для получения массива задач
 *
 * @param {number} count Количество задач, которое необходимо получить
 *
 * @return {Array} allTasks массив задач
 */
const getTasks = (count) => {
  const allTasks = new Array(count).fill(``).map(getTaskData);
  state.changeAllTasks = allTasks.length;
  return allTasks;
};

const tasks = getTasks(ALL_TASK_COUNT);

const elements = {
  menu: {
    container: `CONTROL`,
    content: ``,
    renderFn: renderMenu,
    amount: 1
  },
  search: {
    container: `MAIN`,
    content: ``,
    renderFn: renderSearch,
    amount: 1
  },
  filter: {
    container: `MAIN`,
    content: tasks,
    renderFn: renderFilters,
    amount: 1
  },
  boardContainer: {
    container: `MAIN`,
    content: ``,
    renderFn: renderBoardContainer,
    amount: 1
  },
  boardFilter: {
    container: `BOARD`,
    content: ``,
    renderFn: renderBoardFilter,
    amount: 1
  },
  boardTasks: {
    container: `BOARD`,
    content: ``,
    renderFn: renderBoardTask,
    amount: 1
  },
  cardTask: {
    container: `BOARD_TASKS`,
    content: tasks.slice(0, AMOUNT_CARDS_TASK_FIRST_LOAD),
    renderFn: renderTask,
    amount: AMOUNT_CARDS_TASK_FIRST_LOAD,
  },
  moreBtn: {
    container: `BOARD`,
    content: ``,
    renderFn: renderMoreBtn,
    amount: 1
  }
};

/**
 * Функция для первой отрисовки главной страницы
 *
 * @param {number} mountCardsTasks Количество карточек задач, которое необходимо отрисовать
 */
const start = (mountCardsTasks) => {
  renderElements(elements);
  state.changeRenderCardTask = mountCardsTasks;
  addEventListenerForLoadMore();
};

/**
 * Функция для отрисовки дополнительных задач по нажатию на кнопку Load more
 *
 * @param {number} amountCardsTasks Количество задач, которое необходимо отрисовать
 */
export const moreTasks = (amountCardsTasks) => {
  const startRenderCardNumber = state.amountRenderCardTask;
  let endRenderCardNumber = startRenderCardNumber + amountCardsTasks;

  if (endRenderCardNumber > state.amountAllTasks) {
    amountCardsTasks = state.amountAllTasks - state.amountRenderCardTask;
    endRenderCardNumber = startRenderCardNumber + amountCardsTasks;
  }

  const {cardTask} = elements;
  cardTask.content = tasks.slice(startRenderCardNumber, endRenderCardNumber);

  state.changeRenderCardTask = amountCardsTasks;

  renderElements({cardTask});

  if (state.checkNoRenderCardsTasks <= 0) {
    removeLoadMoreBtn();
  }
};

start(AMOUNT_CARDS_TASK_FIRST_LOAD);
