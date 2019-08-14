/**
 * Функция, возвращающая разметку элемента хэштега при редактировании задачи
 *
 * @param {string} it имя хэштега
 *
 * @return {string}
 */
const getMarkupHashtagEdit = (it) => `<span class="card__hashtag-inner">
    <input
      type="hidden"
      name="hashtag"
      value="${it}"
      class="card__hashtag-hidden-input"
    />
    <p class="card__hashtag-name">
      #${it}
    </p>
    <button type="button" class="card__hashtag-delete">
      delete
    </button>
  </span>`
;

/**
 * Функция, возвращающая разметку блока хэштегов при редактировании задачи
 *
 * @param {Array} tags Массив хэштегов
 *
 * @return {string}
 */
export const getMarkupHashtagsEdit = (tags) => `${tags.map((it) => getMarkupHashtagEdit(it)).join(``)}`;
