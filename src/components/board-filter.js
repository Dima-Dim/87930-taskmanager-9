import {createElement, renderElement} from "./utils";

class BoardFilter {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<div class="board__filter-list">
              <a href="#" class="board__filter">SORT BY DEFAULT</a>
              <a href="#" class="board__filter">SORT BY DATE up</a>
              <a href="#" class="board__filter">SORT BY DATE down</a>
            </div>`;
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

export const renderBoardFilter = (container, content) => {
  const boardFilter = new BoardFilter(content);

  renderElement(container, boardFilter.getElement());
};
