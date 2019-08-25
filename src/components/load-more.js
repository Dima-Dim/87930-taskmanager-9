import {AbstractComponent} from "./abstract-component";

export class MoreBtn extends AbstractComponent {
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
