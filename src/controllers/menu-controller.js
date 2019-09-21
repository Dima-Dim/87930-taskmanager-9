import Menu from "../components/menu";
import AbstractComponent from "../components/abstract-component";
import {ClassesElements} from "../components/config";

export default class MenuController {
  constructor(container, onChangeView) {
    this._container = container;
    this._menu = new Menu();
    this._onChange = onChangeView;
  }

  init() {
    AbstractComponent.renderElement(this._container, this._menu.getElement());

    const onChangeMenu = () => {
      const activeMenuItem = this._menu.getElement().querySelector(`input:checked`).id;
      this._onChange(activeMenuItem);
    };

    const onClickMenu = (evt) => {
      const target = evt.target;

      if (target.closest(`.${ClassesElements.ADD_NEW_TASK_TASK_LABEL}`)) {
        this._onChange(`control__task`, `add`);
      } else if (target.localName === `input`) {
        onChangeMenu(evt);
      }
    };

    this._menu.getElement().addEventListener(`click`, onClickMenu);
  }
}
