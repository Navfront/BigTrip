export default class Facade{
  constructor(tripPresenter) {
    this._tripPresenter = tripPresenter;
  }

  init() {
    this._tripPresenter.renderInfo();
    this._tripPresenter.renderNavigation();
    this._tripPresenter.renderAddButton();
    this._tripPresenter.renderPointList();
    this._tripPresenter.renderFilter();
    this._tripPresenter.renderSorts();
    this._tripPresenter.renderPoints();
  }
}
