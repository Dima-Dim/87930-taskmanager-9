import {createElement, unRenderElement} from "./utils";

/**
 * Шаблон класса для создания элементов разметки страницы
 */
export default class AbstractComponent {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `Empty`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    unRenderElement(this._element);
    this._element = null;
  }
}
