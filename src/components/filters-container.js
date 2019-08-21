import {createElement, renderElement} from "./utils";

class FiltersContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="main__filter filter container"></section>`;
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

export const renderFiltersContainer = (container, content) => {
  const filter = new FiltersContainer(content);

  renderElement(container, filter.getElement());
};
