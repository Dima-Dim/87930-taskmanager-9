import {getDayFromTimeStamp, getMonthFromTimeStamp, getTimeFromTimeStamp, createElement} from "./utils";
import {getMarkupCardColors} from "./card-color";
import {getMarkupRepeatDays} from "./repeat-days";
import {getMarkupHashtagsEdit} from "./hashtag-edit";

export class TaskEdit {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    this._element = null;
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
  }

  getTemplate() {
    return `<article class="card card--edit card--${this._color} ${this._repeatingDays.size > 0 ? `card--repeat` : ``}">
              <form class="card__form" method="get">
                <div class="card__inner">
                  <div class="card__control">
                    <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `` : `card__btn--disabled`}">
                      archive
                    </button>
                    <button
                      type="button"
                      class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}"
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
                      >${this._description}</textarea>
                    </label>
                  </div>
      
                  <div class="card__settings">
                    <div class="card__details">
                      <div class="card__dates">
                        <button class="card__date-deadline-toggle" type="button">
                          date: <span class="card__date-status">${getDayFromTimeStamp(this._dueDate) || getMonthFromTimeStamp(this._dueDate) ? `yes` : `no`}</span>
                        </button>
      
                        <fieldset class="card__date-deadline" ${getDayFromTimeStamp(this._dueDate) || getMonthFromTimeStamp(this._dueDate) ? `` : `disabled`}>
                          <label class="card__input-deadline-wrap">
                            <input
                              class="card__date"
                              type="text"
                              placeholder=""
                              name="date"
                              value="${getDayFromTimeStamp(this._dueDate)} ${getMonthFromTimeStamp(this._dueDate)} ${getTimeFromTimeStamp(this._dueDate)}"
                            />
                          </label>
                        </fieldset>
      
                        <button class="card__repeat-toggle" type="button">
                          repeat:<span class="card__repeat-status">${this._repeatingDays.size > 0 ? `yes` : `no`}</span>
                        </button>
      
                        <fieldset class="card__repeat-days" ${this._repeatingDays.size > 0 ? `` : `disabled`}>
                          <div class="card__repeat-days-inner">
      
                            ${getMarkupRepeatDays(this._repeatingDays)}
      
                          </div>
                        </fieldset>
                      </div>
      
                      <div class="card__hashtag">
                        <div class="card__hashtag-list">
      
                          ${getMarkupHashtagsEdit(Array.from(this._tags))}
      
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
                      
                      ${getMarkupCardColors(this._color)}
                      
                      </div>
                    </div>
                  </div>
      
                  <div class="card__status-btns">
                    <button class="card__save" type="submit">save</button>
                    <button class="card__delete" type="button">delete</button>
                  </div>
                </div>
              </form>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
