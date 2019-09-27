import {responseFromJSON, generateId} from "./utils";
import TasksAdapter from "./tasks-adapter";

export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getTasks() {
    if (this._isOnline()) {
      return this._api.getTasks({path: `tasks`})
        .then(responseFromJSON)
        .then(TasksAdapter.parseTasks)
        .then((tasks) => {
          this._store.setItems(tasks);
          return tasks;
        });
    } else {
      return TasksAdapter.parseTasks(this._store.getItems());
    }
  }

  createTask(task) {
    if (this._isOnline()) {
      return this._api.createTask(task)
        .then(responseFromJSON)
        .then(TasksAdapter.parseTask)
        .then((it) => {
          this._store.setItem(it);
          return task;
        });
    } else {
      this._store.setItem(generateId(10), JSON.stringify(TasksAdapter.toSource(task)));
      return TasksAdapter.parseTasks(this._store.getItems());
    }
  }

  updateTask(task) {
    if (this._isOnline()) {
      return this._api.updateTask(task)
        .then(responseFromJSON)
        .then(TasksAdapter.parseTask)
        .then((it) => {
          this._store.setItem(it);
          return task;
        });
    } else {
      this._store.setItem(task.id, JSON.stringify(TasksAdapter.toSource(task)));
      return TasksAdapter.parseTasks(this._store.getItems());
    }
  }

  removeTask({id}) {
    if (this._isOnline()) {
      this._store.removeItem(id);
      return this._api.deleteTask({id});
    } else {
      return Promise.resolve(true);
    }
  }

  sync() {
    if (this._isOnline()) {
      this._api.syncTasks(TasksAdapter.toSources(Object.keys(this._store.getItems())));
    }
    return Promise.resolve(true);
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
