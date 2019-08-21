import {createElement, renderElement} from "./utils";

class BoardTask {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export const renderBoardTask = (container, content) => {
  const boardTask = new BoardTask(content);

  renderElement(container, boardTask.getElement());
};
