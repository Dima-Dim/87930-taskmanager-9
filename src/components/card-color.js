import {cardColors} from "./config";

/**
 * Функция, возвращающая разметку элемента для выбора цвета задачи
 *
 * @param {string} it Цвет из списка возможных цветов
 * @param {string} currentColor Цвет задачи для которой обрисовывается элемент
 *
 * @return {string}
 */
const getMarkupCardColorItem = (it, currentColor) => `<input
    type="radio"
    id="color-${it}-1"
    class="card__color-input card__color-input--${it} visually-hidden"
    name="color"
    value="${it}"
    ${currentColor === it ? `checked` : ``}
  />
  <label
    for="color-${it}-1"
    class="card__color card__color--${it}"
    >${it}</label
  >`
;

/**
 * Функция, возвращающая разметку блока для выбора цвета задачи
 *
 * @param {string} currentColor Цвет задачи для которой обрисовывается элемент
 *
 * @return {string}
 */
export const getMarkupCardColors = (currentColor) => `${Array.from(cardColors).map((it) => getMarkupCardColorItem(it, currentColor)).join(``)}`;
