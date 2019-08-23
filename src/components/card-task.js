import {ContainerClass, KEY_CODER} from "./config";
import {getMarkupHashtags} from "./hashtag";
import {createElement, getDayFromTimeStamp, getMonthFromTimeStamp, getTimeFromTimeStamp, renderElement, unRenderElement} from "./utils";
import {TaskEdit} from "./card-task-edit";

class Task {
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

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    unRenderElement(this._element);
    this._element = null;
  }
}

export const renderTask = (container, content) => {
  content.forEach((it) => {
    const task = new Task(it);
    const taskEdit = new TaskEdit(it);
    const cardEditBtn = task.getElement().querySelector(`.${ContainerClass.CARD_EDIT_BTN}`)
    const cardEditTextAreaBtn = taskEdit.getElement().querySelector(`.${ContainerClass.CARD_EDIT_TEXTAREA}`);
    const cardSaveBtn = taskEdit.getElement().querySelector(`.${ContainerClass.CARD_SAVE_BTN}`);
    const cardDeleteBtn = taskEdit.getElement().querySelector(`.${ContainerClass.CARD_DELETE_BTN}`);

    const closingCardEditingHandler = () => {
      document.querySelector(`.${ContainerClass[container]}`).replaceChild(task.getElement(), taskEdit.getElement());
      cardSaveBtn.removeEventListener(`click`, onClickSaveBtn);
      cardSaveBtn.removeEventListener(`click`, onClickDeleteBtn);
      document.removeEventListener(`keydown`, onEscDownTaskEdit);
      document.removeEventListener(`click`, onClickDifferentEditTask);
    };

    const openingCardEditingHandler = () => {
      document.querySelector(`.${ContainerClass[container]}`).replaceChild(taskEdit.getElement(), task.getElement());
      cardEditTextAreaBtn.addEventListener(`focus`, onFocusTextArea);
      cardSaveBtn.addEventListener(`click`, onClickSaveBtn);
      cardDeleteBtn.addEventListener(`click`, onClickDeleteBtn);
      document.addEventListener(`keydown`, onEscDownTaskEdit);
      document.addEventListener(`click`, onClickDifferentEditTask);
    };

    const onEscDownTaskEdit = (evt) => {
      const key = evt.keyCode;
      if (key === KEY_CODER.ESC) {
        closingCardEditingHandler();
      }
    };

    const onFocusTextArea = () => {
      cardEditTextAreaBtn.removeEventListener(`focus`, onFocusTextArea);
      document.removeEventListener(`keydown`, onEscDownTaskEdit);
      cardEditTextAreaBtn.addEventListener(`blur`, onBlurTextArea);
    };

    const onBlurTextArea = () => {
      cardEditTextAreaBtn.removeEventListener(`blur`, onBlurTextArea);
      document.addEventListener(`keydown`, onEscDownTaskEdit);
      cardEditTextAreaBtn.addEventListener(`focus`, onFocusTextArea);
    };

    const onClickDifferentEditTask = (evt) => {
      const target = evt.target;
      if (!target.closest(`.${ContainerClass.CARD_EDIT_BTN}`) || task.getElement().contains(target)) {
        return;
      }

      closingCardEditingHandler();
    };

    const onClickTask = () => {
      openingCardEditingHandler();
    };

    const onClickSaveBtn = () => {
      closingCardEditingHandler();
    };

    const onClickDeleteBtn = () => {
      closingCardEditingHandler();
      task.removeElement();
    };

    cardEditBtn.addEventListener(`click`, onClickTask);

    renderElement(container, task.getElement());
  });
};
