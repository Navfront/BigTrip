import AbstractSmartComponent from './abstract-smart-component';

const getSortItem = (sortName, isDisabled = true, isChecked = false) => `
  <div class="trip-sort__item  ${
  sortName ? `trip-sort__item--${  sortName}` : ''
} ">
    <input id="${
  sortName ? `sort-${  sortName}` : ''
}" class="trip-sort__input  visually-hidden" data-sort-name='${
  sortName ? sortName : ''
}' type="radio" name="trip-sort" value="${
  sortName ? `sort-${  sortName}` : ''
}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="${sortName ? `sort-${  sortName}` : ''}">${
  sortName ? sortName : 'noName'
}</label>
  </div>
  `;

const getSortTemplate = (sorts) => sorts
  ? `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sorts
    .map((it) => getSortItem(it.sortName, it.isDisabled, it.isChecked))
    .join('')}

</form>`
  : '';

export default class SortComponent extends AbstractSmartComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return getSortTemplate(this._sorts);
  }

  setOnSortClickHandler(callback) {
    this._sorts.forEach((it) => {
      this.getElement()
        .querySelector(`#sort-${it.sortName}`)
        .addEventListener('click', callback);
    });
  }
}
