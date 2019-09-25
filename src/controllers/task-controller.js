import Task from "../components/card-task";
import TaskEdit from "../components/card-task-edit";
import {ClassesElements, daysInDate, FLATPICKR_CONFIG, KeyCode} from "../components/config";
import AbstractComponent from "../components/abstract-component";
import {getDateFromTimeStamp, getDayFromTimeStamp, getMonthFromTimeStamp, getTimeFromTimeStamp} from "../components/utils";
import {getMarkupRepeatDays} from "../components/repeat-days";
import {getMarkupHashtagsEdit} from "../components/hashtag-edit";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default class TaskController {
  constructor(container, data, _onDataChange) {
    this._container = container;
    this._data = data;
    this._task = new Task(this._data);
    this._taskEdit = new TaskEdit(this._data);
    this._onDataChange = _onDataChange;
    this._state = {
      editMode: false,
      color: this._data.color,
      hashtags: this._data.tags,
    };
  }

  init() {
    const inputs = this._taskEdit.getElement().querySelectorAll(`input, textarea`);
    const cardEditBtn = this._task.getElement().querySelector(`.${ClassesElements.CARD_EDIT_BTN}`);
    const cardArchive = this._task.getElement().querySelector(`.${ClassesElements.CARD_EDIT_ARCHIVE}`);
    const cardEditArchive = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_ARCHIVE}`);
    const cardFavorites = this._task.getElement().querySelector(`.${ClassesElements.CARD_EDIT_FAVORITES}`);
    const cardEditFavorites = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_FAVORITES}`);
    const cardEditTextAreaBtn = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_TEXTAREA}`);
    const cardEditDeadLineToggle = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_DEAD_LINE_TOGGLE}`);
    const cardEditDeadLineStatus = cardEditDeadLineToggle.querySelector(`.${ClassesElements.CARD_EDIT_DEAD_LINE_STATUS}`);
    const cardEditDeadLineFileset = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_DEAD_LINE_FIELDSET}`);
    const cardEditDateInput = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_DATE_INPUT}`);
    const cardEditRepeatToggle = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_REPEAT_TOGGLE}`);
    const cardEditRepeatStatus = cardEditRepeatToggle.querySelector(`.${ClassesElements.CARD_EDIT_REPEAT_STATUS}`);
    const cardEditRepeatFileset = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_REPEAT_FIELDSET}`);
    const cardEditHashtagInput = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_HASHTAG_INPUT}`);
    const cardEditHashtagList = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_HASHTAG_LIST}`);
    const cardEditColorsWrap = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_COLORS_WRAP}`);
    const cardDeleteBtn = this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_DELETE_BTN}`);

    flatpickr(cardEditDateInput, FLATPICKR_CONFIG);

    const closingCardEditingHandler = () => {
      document.querySelector(this._container).replaceChild(this._task.getElement(), this._taskEdit.getElement());
      this._state.editMode = false;
      cardEditArchive.removeEventListener(`click`, onClickArchive);
      cardArchive.addEventListener(`click`, onClickArchive);
      cardEditFavorites.removeEventListener(`click`, onClickFavorite);
      cardFavorites.addEventListener(`click`, onClickFavorite);
      cardEditDeadLineToggle.removeEventListener(`click`, onClickDeadLineToggle);
      cardEditRepeatToggle.removeEventListener(`click`, onClickRepeatToggle);
      cardEditHashtagInput.removeEventListener(`keydown`, onEnterHashtagInput);
      cardEditColorsWrap.removeEventListener(`click`, onClickRepeatColorsWrap);
      this._taskEdit.getElement().removeEventListener(`submit`, onSubmitTaskEdit);
      document.removeEventListener(`keydown`, onEscDownTaskEdit);
      document.removeEventListener(`click`, onClickDifferentEditTask);
    };

    const openingCardEditingHandler = () => {
      this._state.editMode = true;
      document.querySelector(this._container).replaceChild(this._taskEdit.getElement(), this._task.getElement());
      for (const input of inputs) {
        input.addEventListener(`focus`, onFocusInput);
      }
      cardArchive.removeEventListener(`click`, onClickArchive);
      cardEditArchive.addEventListener(`click`, onClickArchive);
      cardFavorites.removeEventListener(`click`, onClickFavorite);
      cardEditFavorites.addEventListener(`click`, onClickFavorite);
      cardEditDeadLineToggle.addEventListener(`click`, onClickDeadLineToggle);
      cardEditRepeatToggle.addEventListener(`click`, onClickRepeatToggle);
      cardEditHashtagInput.addEventListener(`keydown`, onEnterHashtagInput);
      cardEditHashtagList.addEventListener(`click`, onClickHashtagInput);
      cardEditColorsWrap.addEventListener(`click`, onClickRepeatColorsWrap);
      this._taskEdit.getElement().addEventListener(`submit`, onSubmitTaskEdit);
      cardDeleteBtn.addEventListener(`click`, onClickDeleteBtn);
      document.addEventListener(`keydown`, onEscDownTaskEdit);
      document.addEventListener(`click`, onClickDifferentEditTask);
    };

    const onEscDownTaskEdit = (evt) => {
      const key = evt.keyCode;
      if (key === KeyCode.ESC) {
        closingCardEditingHandler();
      }
    };

    const onFocusInput = () => {
      cardEditTextAreaBtn.removeEventListener(`focus`, onFocusInput);
      document.removeEventListener(`keydown`, onEscDownTaskEdit);
      for (const input of inputs) {
        input.addEventListener(`blur`, onBlurInput);
      }
    };

    const onBlurInput = () => {
      cardEditTextAreaBtn.removeEventListener(`blur`, onBlurInput);
      document.addEventListener(`keydown`, onEscDownTaskEdit);
      cardEditTextAreaBtn.addEventListener(`focus`, onFocusInput);
    };

    const onClickDifferentEditTask = (evt) => {
      const target = evt.target;
      if (!target.closest(`.${ClassesElements.CARD_EDIT_BTN}`) || this._task.getElement().contains(target)) {
        return;
      }

      closingCardEditingHandler();
    };

    const onClickTask = () => {
      openingCardEditingHandler();
    };

    const onClickDeleteBtn = () => {
      closingCardEditingHandler();
      this._onDataChange(this._data, null);
      // this._task.removeElement();
    };

    const onClickArchive = () => {
      if (!this._state.editMode) {
        const entry = Object.assign({}, this._data);

        entry.isArchive = !this._data.isArchive;
        this._onDataChange(this._data, entry);
      } else {
        this._data.isArchive = !this._data.isArchive;
        cardEditArchive.classList.toggle(ClassesElements.CARD_EDIT_ARCHIVE_DISABLED);
      }
    };

    const onClickFavorite = () => {
      if (!this._state.editMode) {
        const entry = Object.assign({}, this._data);

        entry.isFavorite = !this._data.isFavorite;
        this._onDataChange(this._data, entry);
      } else {
        this._data.isFavorite = !this._data.isFavorite;
        cardEditFavorites.classList.toggle(ClassesElements.CARD_EDIT_FAVORITES_DISABLED);
      }
    };

    const onSubmitTaskEdit = (evt) => {
      evt.preventDefault();
      closingCardEditingHandler();
      const form = new FormData(this._taskEdit.getElement().querySelector(`form`));
      const entry = {
        description: form.get(`text`),
        dueDate: form.get(`date`) * 1000,
        repeatingDays: new Set([...form.getAll(`repeat`)]),
        tags: form.getAll(`hashtag`),
        color: form.get(`color`),
      };

      const newData = Object.assign({}, this._data, entry);
      this._onDataChange(this._data, newData);

    };

    const onClickDeadLineToggle = () => {
      if (this._data.dueDate) {
        cardEditDeadLineStatus.textContent = `no`;
        this._data.dueDate = null;
        cardEditDeadLineFileset.disabled = true;
        cardEditDeadLineFileset.querySelector(`input`).value = null;
      } else {
        cardEditDeadLineStatus.textContent = `yes`;
        this._data.dueDate = Date.now();
        cardEditDeadLineFileset.disabled = false;
        cardEditDeadLineFileset.querySelector(`input`).value = `${getDateFromTimeStamp(this._data.dueDate)} ${getMonthFromTimeStamp(this._data.dueDate)} ${getTimeFromTimeStamp(this._data.dueDate)}`;
      }
    };

    const onClickRepeatToggle = () => {
      if (cardEditRepeatFileset.querySelector(`input:checked`)) {
        const repeatingDaysInputs = cardEditRepeatFileset.querySelectorAll(`input`);
        for (const input of repeatingDaysInputs) {
          input.checked = false;
        }
        cardEditRepeatStatus.textContent = `no`;
        cardEditRepeatFileset.disabled = true;

        this._taskEdit.getElement().classList.remove(ClassesElements.CARD_REPEAT);
      } else {
        cardEditRepeatStatus.textContent = `yes`;
        this._taskEdit.getElement().classList.add(ClassesElements.CARD_REPEAT);
        this._data.repeatingDays = Date.now();
        cardEditRepeatFileset.disabled = false;
        this._taskEdit.getElement().querySelector(`.${ClassesElements.CARD_EDIT_REPEAT_DAYS_INNER}`).innerHTML = getMarkupRepeatDays(new Set([Array.from(daysInDate)[getDayFromTimeStamp(this._data.repeatingDays)]]));
      }
    };

    const onEnterHashtagInput = (evt) => {
      const target = evt.target;
      const key = evt.keyCode;
      if (key === KeyCode.ENTER) {
        evt.preventDefault();
        this._state.hashtags.add(target.value);
        target.value = ``;
        cardEditHashtagList.innerHTML = getMarkupHashtagsEdit(Array.from(this._state.hashtags));
      }
    };

    const onClickHashtagInput = (evt) => {
      const target = evt.target;
      if (target.closest(`.card__hashtag-delete`)) {
        this._state.hashtags.delete(target.parentElement.querySelector(`input`).value);
        cardEditHashtagList.innerHTML = getMarkupHashtagsEdit(Array.from(this._state.hashtags));
      }
    };

    const onClickRepeatColorsWrap = (evt) => {
      const target = evt.target;
      if (target.tagName === `INPUT`) {
        this._taskEdit.getElement().classList.remove(`card--${this._state.color}`);
        this._taskEdit.getElement().classList.add(`card--${target.value}`);
        this._state.color = target.value;
      }
    };

    cardEditBtn.addEventListener(`click`, onClickTask);
    cardArchive.addEventListener(`click`, onClickArchive);
    cardFavorites.addEventListener(`click`, onClickFavorite);

    AbstractComponent.renderElement(this._container, this._task.getElement());
    if (this._data.isDraft) {
      openingCardEditingHandler();
    }
  }
}
