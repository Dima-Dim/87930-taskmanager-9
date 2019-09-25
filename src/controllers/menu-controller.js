import Menu from "../components/menu";
import AbstractComponent from "../components/abstract-component";

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

      if (activeMenuItem === `control__new-task`) {
        this._onChange(`control__task`, `add`);
      } else {
        console.log(activeMenuItem);
        this._onChange(activeMenuItem);
      }
    };

    this._menu.getElement().addEventListener(`change`, onChangeMenu);
  }
}
