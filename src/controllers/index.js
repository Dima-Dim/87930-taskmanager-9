import {AMOUNT_CARDS_TASK_FIRST_LOAD, ContainerClass, KeyCode, LOAD_MORE_COUNT} from "../components/config";
import {state} from "../main";
import AbstractComponent from "../components/abstract-component";
import Menu from "../components/menu";
import Search from "../components/search";
import Filter from "../components/filters";
import BoardContainer from "../components/board-container";
import BoardFilter from "../components/board-filter";
import BoardTasks from "../components/board-tasks";
import Task from "../components/card-task";
import MoreBtn from "../components/load-more";
import TaskEdit from "../components/card-task-edit";
import NoTasks from "../components/no-tasks";

export class Index {
  constructor(tasks) {
    this._tasks = tasks;
    this._memu = new Menu();
    this._search = new Search();
    this._filter = new Filter(this._tasks);
    this._boardContainer = new BoardContainer();
    this._boardFilter = new BoardFilter();
    this._boardTasks = new BoardTasks();
    this._noTasks = new NoTasks();
    this._moreBtn = new MoreBtn();
  }

  init() {
    AbstractComponent.renderElement(`.${ContainerClass.CONTROL}`, this._memu.getElement());
    AbstractComponent.renderElement(`.${ContainerClass.MAIN}`, this._search.getElement());
    AbstractComponent.renderElement(`.${ContainerClass.MAIN}`, this._filter.getElement());
    AbstractComponent.renderElement(`.${ContainerClass.MAIN}`, this._boardContainer.getElement());
    AbstractComponent.renderElement(`.${ContainerClass.BOARD}`, this._boardFilter.getElement());
    AbstractComponent.renderElement(`.${ContainerClass.BOARD}`, this._boardTasks.getElement());
    this._renderTask(`.${ContainerClass.BOARD_TASKS}`, this._tasks.filter((it) => !it.isArchive).slice(0, AMOUNT_CARDS_TASK_FIRST_LOAD));
  }

  _renderTask(container, items) {
    if (items.length) {
      items.forEach((it) => {
        const task = new Task(it);
        const taskEdit = new TaskEdit(it);
        const inputs = taskEdit.getElement().querySelectorAll(`input, textarea`);
        const cardEditBtn = task.getElement().querySelector(`.${ContainerClass.CARD_EDIT_BTN}`);
        const cardEditTextAreaBtn = taskEdit.getElement().querySelector(`.${ContainerClass.CARD_EDIT_TEXTAREA}`);
        const cardSaveBtn = taskEdit.getElement().querySelector(`.${ContainerClass.CARD_SAVE_BTN}`);
        const cardDeleteBtn = taskEdit.getElement().querySelector(`.${ContainerClass.CARD_DELETE_BTN}`);

        const closingCardEditingHandler = () => {
          document.querySelector(container).replaceChild(task.getElement(), taskEdit.getElement());
          cardSaveBtn.removeEventListener(`click`, onClickSaveBtn);
          cardSaveBtn.removeEventListener(`click`, onClickDeleteBtn);
          document.removeEventListener(`keydown`, onEscDownTaskEdit);
          document.removeEventListener(`click`, onClickDifferentEditTask);
        };

        const openingCardEditingHandler = () => {
          document.querySelector(container).replaceChild(taskEdit.getElement(), task.getElement());
          for (const input of inputs) {
            input.addEventListener(`focus`, onFocusInput);
          }
          cardSaveBtn.addEventListener(`click`, onClickSaveBtn);
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

        AbstractComponent.renderElement(container, task.getElement());
        state.changeRenderCardTask = AMOUNT_CARDS_TASK_FIRST_LOAD;
        this._renderLoadMore();
      });
    } else {
      AbstractComponent.renderElement(`.${ContainerClass.BOARD_TASKS}`, this._noTasks.getElement());
    }
  }

  _renderLoadMore() {
    let loadMoreBtnElement = this._moreBtn.getElement();

    AbstractComponent.renderElement(`.${ContainerClass.BOARD}`, loadMoreBtnElement);

    /**
     * Функция для отрисовки дополнительных задач по нажатию на кнопку Load more
     *
     * @param {number} amountCardsTasks Количество задач, которое необходимо отрисовать
     */
    const moreTasks = (amountCardsTasks) => {
      const startRenderCardNumber = state.amountRenderCardTask;
      let endRenderCardNumber = startRenderCardNumber + amountCardsTasks;

      if (endRenderCardNumber > state.amountAllTasks) {
        amountCardsTasks = state.amountAllTasks - state.amountRenderCardTask;
        endRenderCardNumber = startRenderCardNumber + amountCardsTasks;
      }

      state.changeRenderCardTask = amountCardsTasks;

      this._renderTask(`.${ContainerClass.BOARD_TASKS}`, this._tasks.slice(startRenderCardNumber, endRenderCardNumber));

      if (state.checkNoRenderCardsTasks <= 0) {
        removeLoadMoreBtn();
      }
    };

    /**
     * Функция для обработки события клика на кнопке Load more
     *
     * @param {Event} evt
     */
    const onLoadMoreClick = (evt) => {
      let target = evt.target;
      if (!target.closest(`.load-more`)) {
        return;
      }

      moreTasks(LOAD_MORE_COUNT);
    };

    loadMoreBtnElement.addEventListener(`click`, onLoadMoreClick);

    /**
     * Функция, удаляющая кнопку Load more
     */
    const removeLoadMoreBtn = () => {
      loadMoreBtnElement.removeEventListener(`click`, onLoadMoreClick);
      loadMoreBtnElement.parentElement.removeChild(loadMoreBtnElement);
    };
  }
}
