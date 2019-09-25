import {HTTPHeaders, HTTPMethod} from "./config";
import {checkStatus, fromJSON} from "./utils";
import TasksAdapter from "./tasks-adapter";

export default class Api {
  constructor({host, authorization}) {
    this._host = host;
    this._authorization = authorization;
  }

  getTasks() {
    return this._load({path: `tasks`})
      .then(fromJSON)
      .then(TasksAdapter.parseTasks);
  }

  createTask(task) {
    return this._load({
      path: `tasks`,
      method: HTTPMethod.POST,
      body: JSON.stringify(TasksAdapter.toSource(task)),
      headers: new Headers(HTTPHeaders.JSON),
    })
      .then(fromJSON)
      .then(TasksAdapter.parseTask);
  }

  updateTask(task) {
    return this._load({
      path: `tasks/${task.id}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(TasksAdapter.toSource(task)),
      headers: new Headers(HTTPHeaders.JSON)
    })
      .then(fromJSON)
      .then(TasksAdapter.parseTask);
  }

  deleteTask({id}) {
    return this._load({
      path: `tasks/${id}`,
      method: HTTPMethod.DELETE,
    });
  }

  _load({path, method = HTTPMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._host}/${path}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }

}
