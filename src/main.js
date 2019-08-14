import {ALL_TASK_COUNT, AMOUNT_CARDS_TASK_FIRST_LOAD} from "./components/config";
import {getTaskData} from "./components/data";
import {getMarkupMenu} from "./components/menu";
import {getMarkupSearch} from "./components/search";
import {getMarkupFiltersContainer} from "./components/filters-container";
import {getMarkupFilters} from "./components/filters";
import {getMarkupBoardContainer} from "./components/board-container";
import {getMarkupBoardFilter} from "./components/board-filter";
import {getMarkupBoardTasks} from "./components/board-tasks";
import {getMarkupCardTaskEdit} from "./components/card-task-edit";
import {getMarkupCardsTask} from "./components/card-task";
import {getMarkupMoreBtn, addEventListenerForLoadMore, removeLoadMoreBtn} from "./components/load-more";
import {renderContent} from "./components/render";

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
    markup: getMarkupMenu(),
    amount: 1
  },
  search: {
    container: `MAIN`,
    markup: getMarkupSearch(),
    amount: 1
  },
  filters: {
    container: `MAIN`,
    markup: getMarkupFiltersContainer(),
    amount: 1
  },
  filter: {
    container: `FILTERS`,
    markup: getMarkupFilters(tasks),
    amount: 1
  },
  boardContainer: {
    container: `MAIN`,
    markup: getMarkupBoardContainer(),
    amount: 1
  },
  boardFilter: {
    container: `BOARD`,
    markup: getMarkupBoardFilter(),
    amount: 1
  },
  boardTasks: {
    container: `BOARD`,
    markup: getMarkupBoardTasks(),
    amount: 1
  },
  cardTaskEdit: {
    container: `BOARD_TASKS`,
    markup: getMarkupCardTaskEdit(tasks[0]),
    amount: 1
  },
  cardTask: {
    container: `BOARD_TASKS`,
    markup: getMarkupCardsTask(tasks.slice(state.amountRenderCardTask + 1, AMOUNT_CARDS_TASK_FIRST_LOAD)),
    amount: 1
  },
  moreBtn: {
    container: `BOARD`,
    markup: getMarkupMoreBtn(),
    amount: 1
  }
};

/**
 * Функция для первой отрисовки главной страницы
 *
 * @param {number} mountCardsTasks Количество карточек задач, которое необходимо отрисовать
 */
const start = (mountCardsTasks) => {
  renderContent(elements);
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
  cardTask.markup = getMarkupCardsTask(tasks.slice(startRenderCardNumber, endRenderCardNumber));

  state.changeRenderCardTask = amountCardsTasks;

  renderContent({cardTask});

  if (state.checkNoRenderCardsTasks <= 0) {
    removeLoadMoreBtn();
  }
};

start(AMOUNT_CARDS_TASK_FIRST_LOAD);
