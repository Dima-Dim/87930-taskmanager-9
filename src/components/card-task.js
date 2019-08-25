import {getMarkupHashtags} from "./hashtag";
import {getDayFromTimeStamp, getMonthFromTimeStamp, getTimeFromTimeStamp} from "./utils";
import AbstractComponent from "./abstract-component";

export default class Task extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${this._repeatingDays.size > 0 ? `card--repeat` : ``}">
              <div class="card__form">
                <div class="card__inner">
                  <div class="card__control">
                    <button type="button" class="card__btn card__btn--edit">
                      edit
                    </button>
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
                    <svg class="card__color-bar-wave" width="100%" height="10">
                      <use xlink:href="#wave"></use>
                    </svg>
                  </div>
          
                  <div class="card__textarea-wrap">
                    <p class="card__text">${this._description}</p>
                  </div>
          
                  <div class="card__settings">
                    <div class="card__details">
                      <div class="card__dates">
                        <div class="card__date-deadline">
                          <p class="card__input-deadline-wrap">
                            <span class="card__date">${getDayFromTimeStamp(this._dueDate)} ${getMonthFromTimeStamp(this._dueDate)}</span>
                            <span class="card__time">${getTimeFromTimeStamp(this._dueDate)}</span>
                          </p>
                        </div>
                      </div>
          
                      <div class="card__hashtag">
                        <div class="card__hashtag-list">
                        
                        ${getMarkupHashtags(Array.from(this._tags))}
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>`;
  }
}
