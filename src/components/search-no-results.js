import AbstractComponent from "./abstract-component";

export default class SearchNoResults extends AbstractComponent {
  getTemplate() {
    return `<p class="result__empty">no matches found...</p>`;
  }
}
