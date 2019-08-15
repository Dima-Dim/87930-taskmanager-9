import {workDays} from "./config";

/**
 * Функция, возвращающая разметку дня повторения при редактировании задачи
 *
 * @param {string} it День из списка рабочих дней
 * @param {Set} currentRepeatingDays Дни, в которые повторяется обрисовываемая задача
 *
 * @return {string}
 */
const getMarkupRepeatDay = (it, currentRepeatingDays) => `<input
    class="visually-hidden card__repeat-day-input"
    type="checkbox"
    id="repeat-${it}-1"
    name="repeat"
    value="${it}"
    ${currentRepeatingDays.has(it) ? `checked` : ``}
  />
  <label class="card__repeat-day" for="repeat-${it}-1"
    >${it}</label
  >`
;

/**
 * Функция, возвращающая разметку блока редактирования дней, в которые повторяется задача
 *
 * @param {Set} currentRepeatingDays Дни, в которые повторяется обрисовываемая задача
 *
 * @return {string}
 */
export const getMarkupRepeatDays = (currentRepeatingDays) => `${Array.from(workDays).map((it) => getMarkupRepeatDay(it, currentRepeatingDays)).join(``)}`;
