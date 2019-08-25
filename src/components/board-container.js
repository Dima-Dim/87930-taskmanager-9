import {AbstractComponent} from "./abstract-component";

export class BoardContainer extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
