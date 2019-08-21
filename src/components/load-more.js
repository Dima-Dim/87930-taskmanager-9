import {moreTasks} from "../main";
import {LOAD_MORE_COUNT} from "./config";
import {createElement, renderElement} from "./utils";

class MoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
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

export const renderMoreBtn = (container, content) => {
  const moreBtn = new MoreBtn(content);

  renderElement(container, moreBtn.getElement());
};

let loadMoreBtnElement;

/**
 * Функция для обработки события клика на кнопке Load more
 *
 * @param {Event} evt
 */
const onLoadMoreClick = (evt) => {
  let target = evt.target;
  if (!target.closest(`.load-more`)) {
    return;
  }

  moreTasks(LOAD_MORE_COUNT);
};

/**
 * Функция, добавляющая слушатель события клика на кнопку Load more
 *
 */
export const addEventListenerForLoadMore = () => {
  loadMoreBtnElement = document.querySelector(`.load-more`);
  loadMoreBtnElement.addEventListener(`click`, onLoadMoreClick);
};

/**
 * Функция, удаляющая кнопку Load more
 */
export const removeLoadMoreBtn = () => {
  loadMoreBtnElement.removeEventListener(`click`, onLoadMoreClick);
  loadMoreBtnElement.parentElement.removeChild(loadMoreBtnElement);
};
