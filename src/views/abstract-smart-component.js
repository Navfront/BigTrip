import AbstractComponent from './abstract-component';

export default class AbstractSmartComponent extends AbstractComponent {
  _recoveryListeners() {
    throw new Error('Abstract method not implemented: recoveryListeners');
  }

  rerender(data) {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this._pointData = data;
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    this._recoveryListeners();
  }
}
