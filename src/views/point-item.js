import AbstractComponent from './abstract-component';

export const getPointItemTemplate = () => '<li class="trip-events__item"></li>';

export default class PointItemComponent extends AbstractComponent{
  constructor() {
    super(...arguments);
  }

  _getTemplate() {
    return getPointItemTemplate();
  }

  _recoveryListeners() {}
}
