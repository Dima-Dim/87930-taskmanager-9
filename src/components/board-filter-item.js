import AbstractComponent from "./abstract-component";

export default class BoardFilterItem extends AbstractComponent {
  constructor({type, name}) {
    super();
    this._type = type;
    this._name = name;
  }

  getTemplate() {
    return `<a href="#" data-type="${this._type}" class="board__filter">${this._name}</a>`;
  }
}
