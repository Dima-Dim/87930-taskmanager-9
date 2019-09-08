import AbstractComponent from "./abstract-component";
import {getSearchResultTitle} from "./search-result-title";
import {ClassesElements} from "./config";

export default class SearchResult extends AbstractComponent {
  constructor(container, onChangeView) {
    super();
    this._container = container;
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    AbstractComponent.renderElement(this._container, this.getElement());

    const backBtn = this.getElement().querySelector(`.${ClassesElements.MAIN_SEARCH_RESULT_BACK}`);

    const onClickBackBtn = () => {
      this._onChangeView(`control__task`);
    };

    backBtn.addEventListener(`click`, onClickBackBtn);
  }

  getTemplate() {
    return `<section class="result container visually-hidden">
              <button class="result__back">back</button>
                <section class="result__group">
                  <h2 class="result__title">
                    ${getSearchResultTitle()}
                  </h2>
                <div class="result__cards">
                  
                </div>
              </section>`;
  }
}
