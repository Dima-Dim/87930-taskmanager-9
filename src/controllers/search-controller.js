import AbstractComponent from "../components/abstract-component";
import Search from "../components/search";
import Filter from "../components/filters";
import {globalState} from "../main";
import {FILTER_ID_PREFIX} from "../components/config";

export default class SearchController {
  constructor(container, onChangeView) {
    this._container = container;
    this._onChangeView = onChangeView;
    this._search = new Search();
    this._filter = new Filter(globalState.tasks);
    this._state = {
      filter: `all`,
      text: null,
    };
  }

  init() {
    AbstractComponent.renderElement(this._container, this._search.getElement());
    AbstractComponent.renderElement(this._search.getElement(), this._filter.getElement(), `insertAfter`);

    const onKeyupSearchInput = (evt) => {
      this._state.text = evt.target.value;

      this._onChangeView(`search`, null, this._state);
    };

    const onFilterClick = () => {
      this._state.filter = this._filter.getElement().querySelector(`input:checked`).id.slice(FILTER_ID_PREFIX.length);
      this._onChangeView(`search`, null, this._state);
    };

    this._search.getElement().addEventListener(`keyup`, onKeyupSearchInput);
    this._filter.getElement().addEventListener(`change`, onFilterClick);
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
