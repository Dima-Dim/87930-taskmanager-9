import {ApiData} from "./components/config";
import {Index} from "./controllers";
import Api from "./components/api";

export const globalState = {
  api: new Api(ApiData),
  tasks: [],
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
  },

  addTasks(tasks) {
    this.tasks = tasks;
  }
};

// const api = new Api(ApiData);
globalState.api.getTasks()
  .then((tasks) => globalState.addTasks(tasks))
  .then(() => new Index());

/**
 * Функция для получения массива задач
 *
 * @param {number} count Количество задач, которое необходимо получить
 *
 * @return {Array} allTasks массив задач
 */
// const getTasks = (count) => new Array(count).fill(``).map(getTaskData);
//
// globalState.tasks = getTasks(ALL_TASK_COUNT);
// console.log(globalState.tasks);
// console.log(globalState.tasksApi);

// const start = new Index();
// start.init();
