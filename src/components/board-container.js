import {createElement, renderElement} from "./utils";

class BoardContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="board container"></section>`;
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

export const renderBoardContainer = (container, content) => {
  const boardContainer = new BoardContainer(content);

  renderElement(container, boardContainer.getElement());
};
