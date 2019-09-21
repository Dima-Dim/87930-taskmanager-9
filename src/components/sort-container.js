import AbstractComponent from "./abstract-component";

export default class SortContainer extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list"></div>`;
  }
}
