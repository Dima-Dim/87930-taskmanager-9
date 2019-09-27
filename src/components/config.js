import * as ConfirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";

export const HTTPMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export const HTTPHeaders = {
  JSON: {'Content-Type': `application/json`},
};

export const ApiData = {
  HOST: `https://htmlacademy-es-9.appspot.com/task-manager`,
  AUTHORIZATION: `Basic eo0w590ik29889a2`,
  TASKS: `tasks`,
  SYNC: `tasks/sync`
};

export const STORAGE_KEY = `TaskManage`;

export const FILTER_ID_PREFIX = `filter__`;

export const ClassesElements = {
  MAIN: `main`,
  CONTROL: `control`,
  FILTERS: `filter`,
  BOARD: `board`,
  BOARD_TASKS: `board__tasks`,
  ADD_NEW_TASK_TASK_LABEL: `control__label--new-task`,
  MAIN_SEARCH_CONTAINER: `main__search`,
  MAIN_SEARCH_RESULT_TITLE: `result__title`,
  MAIN_SEARCH_RESULT_CARDS: `result__cards`,
  MAIN_SEARCH_RESULT_BACK: `result__back`,
  MAIN_SEARCH_SEARCH_INPUT: `search__input`,
  CARD_REPEAT: `card--repeat`,
  CARD_EDIT_INNER: `card__inner`,
  CARD_EDIT_BTN: `card__btn--edit`,
  CARD_EDIT_ARCHIVE: `card__btn--archive`,
  CARD_EDIT_ARCHIVE_DISABLED: `card__btn--disabled`,
  CARD_EDIT_FAVORITES: `card__btn--favorites`,
  CARD_EDIT_FAVORITES_DISABLED: `card__btn--disabled`,
  CARD_EDIT_TEXTAREA: `card__text`,
  CARD_EDIT_DATE_INPUT: `card__date`,
  CARD_EDIT_DEAD_LINE_TOGGLE: `card__date-deadline-toggle`,
  CARD_EDIT_DEAD_LINE_STATUS: `card__date-status`,
  CARD_EDIT_DEAD_LINE_FIELDSET: `card__date-deadline`,
  CARD_EDIT_REPEAT_TOGGLE: `card__repeat-toggle`,
  CARD_EDIT_REPEAT_STATUS: `card__repeat-status`,
  CARD_EDIT_REPEAT_FIELDSET: `card__repeat-days`,
  CARD_EDIT_REPEAT_DAYS_INNER: `card__repeat-days-inner`,
  CARD_EDIT_HASHTAG_INPUT: `card__hashtag-input`,
  CARD_EDIT_HASHTAG_LIST: `card__hashtag-list`,
  CARD_EDIT_COLORS_WRAP: `card__colors-wrap`,
  CARD_SAVE_BTN: `card__save`,
  CARD_DELETE_BTN: `card__delete`,
  STATISTICS_PERIOD_INPUT: `statistic__period-input`,
  STATISTICS_TAGS: `statistic__tags`,
  STATISTICS_COLORS: `statistic__colors`,
};

export const locales = `en-US`;

export const timeFormat = {
  hour: `numeric`,
  minute: `numeric`,
  hour12: true
};

export const cardColors = new Set([
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`
]);

export const workDays = new Set([
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`
]);

export const daysInDate = new Set([
  `su`,
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
]);

export const orderWeekDays = [
  `mo`,
  `tu`,
  `we`,
  `th`,
  `fr`,
  `sa`,
  `su`,
];

export const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
]);

export const sortTypes = [
  {
    type: `default`,
    name: `SORT BY DEFAULT`,
  },
  {
    type: `up`,
    name: `SORT BY DATE up`,
  },
  {
    type: `down`,
    name: `SORT BY DATE down`,
  }
];

export const ALL_TASK_COUNT = 30;
export const AMOUNT_CARDS_TASK_FIRST_LOAD = 8;
export const LOAD_MORE_COUNT = 8;
export const KeyCode = {
  ESC: 27,
  ENTER: 13,
};

const FLATPICKR_TEMP_CONFIG = {};

export const FLATPICKR_CONF = new Map([
  [`locale`, `en`],
  [`enableTime`, true],
  [`time_24hr`, true],
  [`altInput`, true],
  [`altFormat`, `d/m/y H:i`],
  [`dateFormat`, `U`],
  [`plugins`, [new ConfirmDatePlugin({})]],
]);

FLATPICKR_CONF.forEach((value, key) => {
  FLATPICKR_TEMP_CONFIG[key] = value;
});

export const FLATPICKR_CONFIG = FLATPICKR_TEMP_CONFIG;
