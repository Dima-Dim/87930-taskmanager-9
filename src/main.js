import {ALL_TASK_COUNT} from "./components/config";
import {getTaskData} from "./components/data";
import {Index} from "./controllers";

export const state = {
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

  set reset(amount) {
    this.allTasks = amount;
    this.renderCardTaskCounter = 0;
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
const getTasks = (count) => new Array(count).fill(``).map(getTaskData);

const tasks = getTasks(ALL_TASK_COUNT);

const start = new Index(tasks);
start.init();
