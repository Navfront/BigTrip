import { createElement } from '../utils/render';

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can\'t instantiate AbstractComponent, only cocrete one.');
    }
    this._element = null;
    this._data = undefined;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate(this.data));
    }
    return this._element;
  }

  _removeElement() {
    this._element = null;
  }

  _recoveryListeners() {
    throw new Error('Abstract method not implemented: recoveryListeners');
  }

  rerender(data) {
    console.log('rerendering ', this, data);
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    if (oldElement === parent || !parent) {
      return -1;
    }
    this._removeElement();
    this._data = data;
    const newElement = this.getElement();
    parent?.replaceChild(newElement, oldElement);
    this._recoveryListeners();
  }

  destroy() {
    if (this._element?.parentElement) {
      this._element.remove();
      this._removeElement();
    }
    return -1;
  }

  hide() {
    if (this._element) {
      this._element.classList.add('visually-hidden');
    }
  }

  show() {
    if (this._element) {
      this._element.classList.remove('visually-hidden');
    }
  }


}
