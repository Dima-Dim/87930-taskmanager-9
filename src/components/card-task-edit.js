import {getDayFromTimeStamp, getMonthFromTimeStamp, getTimeFromTimeStamp} from "./utils";
import {getMarkupCardColors} from "./card-color";
import {getMarkupRepeatDays} from "./repeat-days";
import {getMarkupHashtagsEdit} from "./hashtag-edit";

/**
 * Функция, возвращающая разметку редактирования карточки задачи
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
export const getMarkupCardTaskEdit = ({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) => `<article
            class="card card--edit card--${color} ${repeatingDays.size > 0 ? `card--repeat` : ``}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
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
                  <svg width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${description}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${getDayFromTimeStamp(dueDate) || getMonthFromTimeStamp(dueDate) ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline" ${getDayFromTimeStamp(dueDate) || getMonthFromTimeStamp(dueDate) ? `` : `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${getDayFromTimeStamp(dueDate)} ${getMonthFromTimeStamp(dueDate)} ${getTimeFromTimeStamp(dueDate)}"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">${repeatingDays.size > 0 ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__repeat-days" ${repeatingDays.size > 0 ? `` : `disabled`}>
                        <div class="card__repeat-days-inner">

                          ${getMarkupRepeatDays(repeatingDays)}

                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">

                        ${getMarkupHashtagsEdit(Array.from(tags))}

                      </div>

                      <label>
                        <input
                          type="text"
                          class="card__hashtag-input"
                          name="hashtag-input"
                          placeholder="Type new hashtag here"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                    
                    ${getMarkupCardColors(color)}
                    
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>`;
