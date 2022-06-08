import AbstractComponent from './abstract-component.js';

const getNavTemplate = () => `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn trip-tabs__btn--active" data-ref="table" href="#">Table</a>
  <a class="trip-tabs__btn" data-ref="stats" href="#">Stats</a>
  </nav>`;

export default class NavComponent extends AbstractComponent {
  constructor() {
    super(...arguments);
    this._onTabsClickHadler = null;
    this._activeBtnClass = 'trip-tabs__btn--active';
    this._buttons = this.getElement().querySelectorAll('.trip-tabs__btn');
  }

  _getTemplate() {
    return getNavTemplate();
  }

  _recoveryListeners() {
    this.setOnTabsClick(this._onTabsClickHadler);
  }

  setOnTabsClick(callback) {
    this._onTabsClickHadler = callback;
    const elements = this._buttons;
    for (const element of elements) {
      element.addEventListener('click', () => {
        for (const tab of elements) {
          tab.classList.remove(this._activeBtnClass);
          if (tab === element) {
            tab.classList.add(this._activeBtnClass);
          }
        }
        this._onTabsClickHadler.call(null, element);
      });
    }
  }

}
