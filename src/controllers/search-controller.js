import AbstractComponent from "../components/abstract-component";
import Search from "../components/search";

export default class SearchController {
  constructor(container, onChangeView) {
    this._container = container;
    this._onChangeView = onChangeView;
    this._search = new Search();

    this.init();
  }

  init() {
    AbstractComponent.renderElement(this._container, this._search.getElement());

    const onKeyupSearchInput = (evt) => {
      const {value} = evt.target;

      if (value.length >= 3) {
        this._onChangeView(`search`, null, value);
      }
    };

    this._search.getElement().addEventListener(`keyup`, onKeyupSearchInput);
  }

  searchInputClean() {
    this._search.getElement().querySelector(`input`).value = ``;
  }

  hide() {
    this._search.hide();
  }

  show() {
    this._search.show();
  }
}
