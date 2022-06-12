const POSITION_TYPES = {
  APPEND: 'append',
  PREPEND: 'prepend',
};

export default class AbstractPresenter {

  /**
   *
   * @param {ElementNode} container
   * @param {Instance} dataModel
   */
  constructor(container, dataModel) {
    if (new.target === AbstractPresenter) {
      throw new Error('Can\'t instantiate AbstractPresenter, only cocrete one.');
    }
    this._container = container;
    this._dataModel = dataModel;
  }

  _renderComponent(container, component, position) {
    switch (position) {
      case POSITION_TYPES.APPEND:
        container.append(component);
        break;
      case POSITION_TYPES.PREPEND:
        container.prepend(component);
        break;

      default:
        container.append(component);
        break;
    }
  }
}
