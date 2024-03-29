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
export const getDateFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).getDate();

/**
 * Функция, преобразующая timestamp в день недели
 *
 * @param {number} timestamp
 *
 * @return {number}
 */
export const getDayFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).getDay();


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
 * Функция, преобразующая timestamp в дату для поиска в формате D12.03.2019
 *
 * @param {number}timestamp
 *
 * @return {string}
 */
export const getDateForSearchFromTimeStamp = (timestamp) => {
  let day = getDateFromTimeStamp(timestamp);
  let month = dateObgFromTimestamp(timestamp).getMonth() + 1;
  const year = dateObgFromTimestamp(timestamp).getFullYear();

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${day}${month}${year}`;
};

export const sortingTasks = {
  up: (a, b) => a.dueDate - b.dueDate,
  down: (a, b) => b.dueDate - a.dueDate,
};

export const filteringTask = {
  all: (tasks) => tasks.filter((it) => !it.isArchive),
};
