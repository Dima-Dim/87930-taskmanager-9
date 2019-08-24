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

/**
 * Шаблон класса для создания элементов разметки страницы
 */
export class elementTemplate {
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

/**
 * Функция для изготовления DOM-элемента из строки
 *
 * @param {string} template HTML-код
 *
 * @return {ChildNode}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * Функция для добавления DOM-элементов на страницу
 *
 * @param {string|Element} container CSS-селектор контейнера, в который необходимо добавить DOM-элемент
 * @param {Element} element DOM-элемент, который нужно добавить в страницу
 * @param {"append"|"prepend"|"insertBefore"|"insertAfter"} position Позиция вставки элемента, относительно контейнера, в который он вставляется
 */
export const renderElement = (container, element, position = `append`) => {
  let parentContainer;

  if (typeof container === `string`) {
    parentContainer = document.querySelector(container);
  } else {
    parentContainer = container;
  }

  switch (position) {
    case `append`:
      parentContainer.append(element);
      break;
    case `prepend`:
      parentContainer.prepend(element);
      break;
    case `insertBefore`:
      parentContainer.parentNode.insertBefore(element, parentContainer);
      break;
    case `insertAfter`:
      parentContainer.parentNode.insertBefore(element, parentContainer.nextSibling);
      break;
  }
};

/**
 * Функция для удаления DOM-элемента со страницы
 *
 * @param {Element} element DOM-элемент, который нужно удалить со страницы
 */
export const unRenderElement = (element) => {
  element.parentNode.removeChild(element);
};
