import AbstractComponent from './abstract-component';
const getButtonTemplate = () => '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>';


export default class AddButton extends AbstractComponent {
  constructor() {
    super(...arguments);
    this._clickHandler = null;
  }

  _getTemplate() {
    return getButtonTemplate();
  }

  _recoveryListeners() {
    this.setClickHandler(this._clickHandler);
  }

  setClickHandler(callback) {
    this._clickHandler = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
