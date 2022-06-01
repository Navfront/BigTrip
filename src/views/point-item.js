import AbstractComponent from './abstract-component';

export const getPointItemTemplate = () => '<li class="trip-events__item"></li>';

export default class PointItemComponent extends AbstractComponent{
  constructor() {
    super(...arguments);
  }

  dElement() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return getPointItemTemplate();
  }

  _recoveryListeners() {}
}
