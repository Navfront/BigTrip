import AbstractSmartComponent from "./abstract-smart-component.js";

const getNavTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
};

export default class NavComponent extends AbstractSmartComponent {
  getTemplate() {
    return getNavTemplate(this._element);
  }
}
