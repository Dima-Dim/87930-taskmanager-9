import {AMOUNT_CARDS_TASK_FIRST_LOAD, ContainerClass, KEY_CODE, LOAD_MORE_COUNT} from "../components/config";
import {renderElement} from "../components/utils";
import {state} from "../main";
import Menu from "../components/menu";
import Search from "../components/search";
import Filter from "../components/filters";
import BoardContainer from "../components/board-container";
import BoardFilter from "../components/board-filter";
import BoardTasks from "../components/board-tasks";
import Task from "../components/card-task";
import MoreBtn from "../components/load-more";
import TaskEdit from "../components/card-task-edit";

export class Index {
  constructor(tasks) {
    this._tasks = tasks;
    this._memu = new Menu();
    this._search = new Search();
    this._filter = new Filter(this._tasks);
    this._boardContainer = new BoardContainer();
    this._boardFilter = new BoardFilter();
    this._boardTasks = new BoardTasks();
    this._moreBtn = new MoreBtn();
  }

  init() {
    renderElement(`.${ContainerClass.CONTROL}`, this._memu.getElement());
    renderElement(`.${ContainerClass.MAIN}`, this._search.getElement());
    renderElement(`.${ContainerClass.MAIN}`, this._filter.getElement());
    renderElement(`.${ContainerClass.MAIN}`, this._boardContainer.getElement());
    renderElement(`.${ContainerClass.BOARD}`, this._boardFilter.getElement());
    renderElement(`.${ContainerClass.BOARD}`, this._boardTasks.getElement());
    this._renderTask(`.${ContainerClass.BOARD_TASKS}`, this._tasks.slice(0, AMOUNT_CARDS_TASK_FIRST_LOAD));
    state.changeRenderCardTask = AMOUNT_CARDS_TASK_FIRST_LOAD;
    this._renderLoadMore();
  }

  _renderTask(container, items) {
    items.forEach((it) => {
      const task = new Task(it);
      const taskEdit = new TaskEdit(it);
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
        cardEditTextAreaBtn.addEventListener(`focus`, onFocusTextArea);
        cardSaveBtn.addEventListener(`click`, onClickSaveBtn);
        cardDeleteBtn.addEventListener(`click`, onClickDeleteBtn);
        document.addEventListener(`keydown`, onEscDownTaskEdit);
        document.addEventListener(`click`, onClickDifferentEditTask);
      };

      const onEscDownTaskEdit = (evt) => {
        const key = evt.keyCode;
        if (key === KEY_CODE.ESC) {
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
  }

  _renderLoadMore() {
    let loadMoreBtnElement = this._moreBtn.getElement();

    renderElement(`.${ContainerClass.BOARD}`, loadMoreBtnElement);

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
