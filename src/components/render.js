import {ContainerClass} from "./config";

/**
 * Функция для добавления HTML-кода элементов на страницу
 *
 * @param {string} containerClassName CSS-класс контейнера, в который необходимо добавить HTML-код элемента
 * @param {string} content HTML-код, который нужно добавить в разметку страницы
 */
const renderElement = (containerClassName, content) => {
  document.querySelector(`.${ContainerClass[containerClassName]}`).insertAdjacentHTML(`beforeend`, content);
};

/**
 * Функция для обработки объекта с информацией об элементах, которые необходимо добавить в разметку страницы
 *
 * @param {$ObjMap} obj объект с информацией об элементах которые нужно отрисовать
 */
export const renderContent = (obj) => {
  for (const [, item] of Object.entries(obj)) {
    const markup = Array(item[`amount`]).fill(item[`markup`]).join(``);
    renderElement(item[`container`], markup);
  }
};
