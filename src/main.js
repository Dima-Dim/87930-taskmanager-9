import {getMarkupMenu} from "./components/menu";
import {getMarkupSearch} from "./components/search";
import {getMarkupFilter} from "./components/filter";
import {getMarkupBoardContainer} from "./components/board-container";
import {getMarkupBoardFilter} from "./components/board-filter";
import {getMarkupBoardTasks} from "./components/board-tasks";
import {getMarkupBoardTaskEdit} from "./components/board-task-edit";
import {getMarkupBoardTask} from "./components/board-task";
import {getMarkupMoreBtn} from "./components/more-btn";

const ContainerClass = {
  MAIN: `main`,
  CONTROL: `control`,
  BOARD: `board`,
  BOARD_TASKS: `board__tasks`
};

const elements = {
  menu: {
    container: `CONTROL`,
    markup: getMarkupMenu,
    amount: 1
  },
  search: {
    container: `MAIN`,
    markup: getMarkupSearch,
    amount: 1
  },
  filter: {
    container: `MAIN`,
    markup: getMarkupFilter,
    amount: 1
  },
  boardContainer: {
    container: `MAIN`,
    markup: getMarkupBoardContainer,
    amount: 1
  },
  boardFilter: {
    container: `BOARD`,
    markup: getMarkupBoardFilter,
    amount: 1
  },
  boardTasks: {
    container: `BOARD`,
    markup: getMarkupBoardTasks,
    amount: 1
  },
  cardTaskEdit: {
    container: `BOARD_TASKS`,
    markup: getMarkupBoardTaskEdit,
    amount: 1
  },
  cardTask: {
    container: `BOARD_TASKS`,
    markup: getMarkupBoardTask,
    amount: 3
  },
  moreBtn: {
    container: `BOARD`,
    markup: getMarkupMoreBtn,
    amount: 1
  }
};

/**
 * Функция для добавления HTML-кода элементов на страницу
 *
 * @param {string} containerClassName CSS-класс контейнера, в который необходимо добавить HTML-код элемента
 * @param {string} content HTML-код, который нужно добавить в разметку страницы
 */
const renderElement = (containerClassName, content) => {
  document.querySelector(`.${ContainerClass[containerClassName]}`).insertAdjacentHTML(`beforeend`, content);
};

/**
 * Функция для обработки объекта с информацией об элементах, которые необходимо добавить в разметку страницы
 *
 * @param {$ObjMap} obj объект с информацией об элементах которые нужно отрисовать
 */
const renderContent = (obj) => {
  for (const [, item] of Object.entries(obj)) {
    const markup = Array(item[`amount`]).fill(item[`markup`]()).join(``);
    renderElement(item[`container`], markup);
  }
};

renderContent(elements);
