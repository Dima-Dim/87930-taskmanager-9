import AbstractComponent from "./abstract-component";

export default class BoardFilter extends AbstractComponent {
  getTemplate() {
    return `<div class="board__filter-list"></div>`;
  }
}
