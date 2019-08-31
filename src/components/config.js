export const ClassesElements = {
  MAIN: `main`,
  CONTROL: `control`,
  FILTERS: `filter`,
  BOARD: `board`,
  BOARD_TASKS: `board__tasks`,
  CARD_REPEAT: `card--repeat`,
  CARD_EDIT_BTN: `card__btn--edit`,
  CARD_EDIT_ARCHIVE: `card__btn--archive`,
  CARD_EDIT_ARCHIVE_DISABLED: `card__btn--disabled`,
  CARD_EDIT_FAVORITES: `card__btn--favorites`,
  CARD_EDIT_FAVORITES_DISABLED: `card__btn--disabled`,
  CARD_EDIT_TEXTAREA: `card__text`,
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
