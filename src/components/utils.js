import {daysInDate, locales, orderWeekDays, timeFormat} from "./config";
import {globalState} from "../main";

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

const currentDate = new Date();

export const getFirstWeekDate = () => {
  const firstWeekDay = new Date(currentDate.setDate(currentDate.getDate() - orderWeekDays.indexOf(Array.from(daysInDate)[currentDate.getDay()]) - 7));

  firstWeekDay.setHours(0);
  firstWeekDay.setMinutes(0);
  firstWeekDay.setSeconds(0);
  firstWeekDay.setMilliseconds(0);

  return firstWeekDay;
};

export const getLastWeekDate = () => {
  const lastWeekDay = new Date(currentDate.setDate(currentDate.getDate() - orderWeekDays.indexOf(Array.from(daysInDate)[currentDate.getDay()]) + 6));

  lastWeekDay.setHours(23);
  lastWeekDay.setMinutes(59);
  lastWeekDay.setSeconds(59);
  lastWeekDay.setMilliseconds(0);

  return lastWeekDay;
};

export const taskFiltering = (filterName) => {
  let filteredTasks = null;

  switch (filterName) {
    case `all`:
      filteredTasks = globalState.tasks;
      break;

    case `favorites`:
      filteredTasks = globalState.tasks.filter((it) => it.isFavorite);
      break;

    case `overdue`:
      filteredTasks = globalState.tasks.filter((it) => it.dueDate < Date.now());
      break;

    case `today`:
      filteredTasks = globalState.tasks.filter((it) => getDateForSearchFromTimeStamp(it.dueDate) === getDateForSearchFromTimeStamp(Date.now()));
      break;

    case `repeating`:
      filteredTasks = globalState.tasks.filter((it) => it.repeatingDays.size > 0);
      break;

    case `tags`:
      filteredTasks = globalState.tasks.filter((it) => it.tags.size > 0);
      break;

    case `archive`:
      filteredTasks = globalState.tasks.filter((it) => it.isArchive);
      break;
  }

  return filteredTasks;
};
