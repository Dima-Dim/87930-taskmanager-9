/**
 * Функция для калькуляции количества задач, соответствующих условию
 *
 * @param {Object} tasks Задачи, которые нужно проверить на соотвествие условию.
 * @param {function} fn Функция-условие
 *
 * @return {number} Количество задач, соответствующих условию
 */
const filterAmountCounter = (tasks, fn) => Number(tasks.reduce((acc, it) => acc + fn(it), 0));

/**
 * Функция-условие для проверки задачи на истечение срока выполнения
 *
 * @param {Object} it Задача, которую нужно проверить на соотвествие условию.
 *
 * @return {number} any 1, если задача просроченна, иначе 0
 */
const helperAmountOverdue = (it) => Number(it[`dueDate`] < Date.now());

/**
 * Функция-условие для проверки задачи на срок выполнения сегодня
 *
 * @param {Object} it Задача, которую нужно проверить на соотвествие условию.
 *
 * @return {number} any 1, если срок выполнения задачи сегодня, иначе 0
 */
const helperAmountToday = (it) => {
  const taskDate = new Date(it[`dueDate`]);
  const currentDate = new Date(Date.now());
  return Number(taskDate.toDateString() === currentDate.toDateString());
};

/**
 * Функция-условие для проверки задачи на избранность
 *
 * @param {Object} it Задача, которую нужно проверить на соотвествие условию.
 *
 * @return {number} any 1, если задача избранная, иначе 0
 */
const helperAmountFavorite = (it) => Number(it[`isFavorite`]);

/**
 * Функция-условие для проверки задачи на повторяемость
 *
 * @param {Object} it Задача, которую нужно проверить на соотвествие условию.
 * @return {number} any 1, если задача повторяемая, иначе 0
 */
const helperAmountRepeating = (it) => Number(it[`repeatingDays`].size > 0 ? 1 : 0);

/**
 * Функция-условие для проверки наличия тегов у задачи
 *
 * @param {Object} it Задача, которую нужно проверить на соотвествие условию.
 *
 * @return {number} any 1, если у задачи есть теги, иначе 0
 */
const helperAmountTags = (it) => Number(it[`tags`].size > 0);

/**
 * Функция-условие для проверки задачи на нахождение в архиве
 *
 * @param {Object} it Задача, которую нужно проверить на соотвествие условию.
 *
 * @return {number} any 1, если у задача в архиве, иначе 0
 */
const helperAmountArchive = (it) => Number(it[`isArchive`]);

/**
 * Функция, возвращающая информацию о фильтрах, которые можно применить к задачам
 *
 * @param {Array} tasks Задачи
 *
 * @return {Array} filters Массив с названиями фильтров и количество зачач, которые под них подходят
 */
export const filterData = (tasks) => ([
  {
    title: `all`,
    amount: tasks.length
  },
  {
    title: `overdue`,
    amount: Number(filterAmountCounter(tasks, helperAmountOverdue))
  },
  {
    title: `today`,
    amount: Number(filterAmountCounter(tasks, helperAmountToday))
  },
  {
    title: `favorites`,
    amount: Number(filterAmountCounter(tasks, helperAmountFavorite))
  },
  {
    title: `repeating`,
    amount: Number(filterAmountCounter(tasks, helperAmountRepeating))
  },
  {
    title: `tags`,
    amount: Number(filterAmountCounter(tasks, helperAmountTags))
  },
  {
    title: `archive`,
    amount: Number(filterAmountCounter(tasks, helperAmountArchive))
  }
]);

/**
 * Функция, возвращающая разметку фильтра
 *
 * @param {Object} it Информация о фильтре
 *
 * @return {string}
 */
const getMarkupFilter = (it) => `<input
  type="radio"
  id="filter__${it[`title`]}"
  class="filter__input visually-hidden"
  name="filter"
  checked
  />
  <label for="filter__${it[`title`]}" class="filter__label">
    ${it[`title`]} <span class="filter__${it[`title`]}-count">${it[`amount`]}</span></label
  >`
;

/**
 * Функция, возвращающая разметку блока фильтров
 *
 * @param {Array} tasks Объект с информацией о задачах
 *
 * @return {string}
 */
export const getMarkupFilters = (tasks) => `${filterData(tasks).map((it) => getMarkupFilter(it)).join(``)
}`;
