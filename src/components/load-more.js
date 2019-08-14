import {moreTasks} from "../main";
import {LOAD_MORE_COUNT} from "./config";

let loadMoreBtnElement;

/**
 * Функция, возвращающая разметку кнопки Load more
 *
 * @return {string}
 */
export const getMarkupMoreBtn = () => `<button class="load-more" type="button">load more</button>`;

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
