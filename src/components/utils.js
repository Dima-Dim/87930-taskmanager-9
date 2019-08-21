import {locales, timeFormat} from "./config";

/**
 * Функция, преобразующая timestamp в объект даты
 *
 * @param {number} timestamp
 *
 * @return {Date}
 */
const dateObgFromTimestamp = (timestamp) => new Date(timestamp);

const MONTH = new Map([
  [0, `January`],
  [1, `February`],
  [2, `March`],
  [3, `April`],
  [4, `May`],
  [5, `June`],
  [6, `July`],
  [7, `August`],
  [8, `September`],
  [9, `October`],
  [10, `November`],
  [11, `December`],
]);

/**
 * Функция, преобразующая timestamp в день месяца
 *
 * @param {number} timestamp
 *
 * @return {number}
 */
export const getDayFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).getDate();

/**
 * Функция, преобразующая timestamp в название месяца
 *
 * @param {number}timestamp
 * @return {string}
 */
export const getMonthFromTimeStamp = (timestamp) => MONTH.get(Number(dateObgFromTimestamp(timestamp).getMonth()));

/**
 * Функция, преобразующая timestamp во время, с учётом локали и формата
 *
 * @param {number}timestamp
 *
 * @return {string}
 */
export const getTimeFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).toLocaleString(locales, timeFormat);

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

import {ContainerClass} from "./config";

/**
 * Функция для добавления HTML-кода элементов на страницу
 *
 * @param {string} containerClassName CSS-класс контейнера, в который необходимо добавить HTML-код элемента
 * @param {string} element HTML-код, который нужно добавить в разметку страницы
 * @param {"append"|"prepend"} position Позиция вставки элемента
 */
export const renderElement = (containerClassName, element, position = `append`) => {
  const container = document.querySelector(`.${ContainerClass[containerClassName]}`);

  switch (position) {
    case `append`:
      container.append(element);
      break;
    case `prepend`:
      container.prepend(element);
      break;
  }
};

export const unRenderElement = (element) => {
  element.parentNode.removeChild(element);
};

/**
 * Функция для обработки объекта с информацией об элементах, которые необходимо добавить в разметку страницы
 *
 * @param {$ObjMap} obj объект с информацией об элементах которые нужно отрисовать
 */
export const renderElements = (obj) => {
  for (const [, {container, content, renderFn}] of Object.entries(obj)) {
    renderFn(container, content);
  }
};
