export const ContainerClass = {
  MAIN: `main`,
  CONTROL: `control`,
  FILTERS: `filter`,
  BOARD: `board`,
  BOARD_TASKS: `board__tasks`
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

export const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
]);

export const ALL_TASK_COUNT = 30;
export const AMOUNT_CARDS_TASK_FIRST_LOAD = 8;
export const LOAD_MORE_COUNT = 8;
