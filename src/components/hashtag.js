/**
 * Функция, возвращающая разметку элемента хэштега задачи
 *
 * @param {string} it имя хэштега
 *
 * @return {string}
 */
const getMarkupHashtag = (it) => `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${it}
    </span>
  </span>`
;

/**
 * Функция, возвращающая разметку блока хэштегов задачи
 *
 * @param {Array} tags Массив хэштегов
 *
 * @return {string}
 */
export const getMarkupHashtags = (tags) => `${tags.map((it) => getMarkupHashtag(it)).join(``)}`;
