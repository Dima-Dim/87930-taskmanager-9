import {HTTPHeaders, HTTPMethod} from "./config";
import {checkStatus} from "./utils";
import TasksAdapter from "./tasks-adapter";

export default class Api {
  constructor({HOST, AUTHORIZATION, TASKS, SYNC}) {
    this._host = HOST;
    this._authorization = AUTHORIZATION;
    this._paths = {
      tasks: TASKS,
      sync: SYNC,
    };
  }

  getTasks() {
    return this._load({path: this._paths.tasks});
  }

  createTask(task) {
    return this._load({
      path: this._paths.tasks,
      method: HTTPMethod.POST,
      body: JSON.stringify(TasksAdapter.toSource(task)),
      headers: new Headers(HTTPHeaders.JSON),
    });
  }

  updateTask(task) {
    return this._load({
      path: `${this._paths.tasks}/${task.id}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(TasksAdapter.toSource(task)),
      headers: new Headers(HTTPHeaders.JSON)
    });
  }

  deleteTask({id}) {
    return this._load({
      path: `${this._paths.tasks}/${id}`,
      method: HTTPMethod.DELETE,
    });
  }

  syncTasks(tasks) {
    return this._load({
      path: this._paths.sync,
      method: HTTPMethod.POST,
      body: JSON.stringify(tasks),
      headers: new Headers(HTTPHeaders.JSON)
    });
  }

  _load({path, method = HTTPMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._host}/${path}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw new Error(`fetch error: ${err}`);
      });
  }

}
