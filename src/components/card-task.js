import {getMarkupHashtags} from "./hashtag";
import {getDayFromTimeStamp, getMonthFromTimeStamp, getTimeFromTimeStamp} from "./utils";

/**
 * Функция, возвращающая разметку карточки задачи
 *
 * @param {string} description
 * @param {number} dueDate
 * @param {Set} repeatingDays
 * @param {Set} tags
 * @param {Set} color
 * @param {boolean} isFavorite
 * @param {boolean} isArchive
 *
 * @return {string}
 */
const getMarkupCardTask = ({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) => `
  <article class="card card--${color} ${repeatingDays.size > 0 ? `card--repeat` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${isArchive ? `` : `card__btn--disabled`}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites ${isFavorite ? `` : `card__btn--disabled`}"
          >
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${getDayFromTimeStamp(dueDate)} ${getMonthFromTimeStamp(dueDate)}</span>
                  <span class="card__time">${getTimeFromTimeStamp(dueDate)}</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
              
              ${getMarkupHashtags(Array.from(tags))}
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`
;

/**
 * Функция, возвращающая блока карточек задач
 *
 * @param {Array} tasks Массив с информацией о задачах
 *
 * @return {string}
 */
export const getMarkupCardsTask = (tasks) => tasks.map(getMarkupCardTask).join(``);
