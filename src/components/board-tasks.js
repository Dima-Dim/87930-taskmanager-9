import {AbstractComponent} from "./abstract-component";

export class BoardTasks extends AbstractComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
