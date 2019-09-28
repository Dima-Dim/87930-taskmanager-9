import {ApiData, STORAGE_KEY} from "./components/config";
import {Index} from "./controllers";
import Api from "./components/api";
import Provider from "./components/provaider";
import Store from "./components/store";

export const globalState = {
  provider: new Provider({api: new Api(ApiData), store: new Store(window.localStorage, STORAGE_KEY)}),
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

globalState.provider.getTasks()
  .then((tasks) => globalState.addTasks(tasks))
  .then(() => new Index());

window.addEventListener(`online`, () => {
  globalState.provider.sync();
});
