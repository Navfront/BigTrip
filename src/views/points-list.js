import AbstractComponent from './abstract-component';

const getPointsListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class PointsListComponent extends AbstractComponent {

  _recoveryListeners(){}

  _getTemplate() {
    return getPointsListTemplate();
  }
}
