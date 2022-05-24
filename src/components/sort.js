import AbstractComponent from "./Abstract-component";

const getSortItem = (sortName, isDisabled = true, isChecked = false) => {
  return `
  <div class="trip-sort__item  ${
    sortName ? "trip-sort__item--" + sortName : ""
  } ">
    <input id="${
      sortName ? "sort-" + sortName : ""
    }" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${
    sortName ? "sort-" + sortName : ""
  }" ${isChecked ? "checked" : ""} ${isDisabled ? "disabled" : ""}>
    <label class="trip-sort__btn" for="${sortName ? "sort-" + sortName : ""}">${
    sortName ? sortName : "noName"
  }</label>
  </div>
  `;
};

const getSortTemplate = (sorts) => {
  return sorts
    ? `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sorts
    .map((it) => {
      return getSortItem(it.sortName, it.isDisabled, it.isChecked);
    })
    .join("")}

</form>`
    : "";
};

export default class SortComponent extends AbstractComponent {
  constructor(sorts) {
    super();
    this._sorts = sorts;
  }

  getTemplate() {
    return getSortTemplate(this._sorts);
  }
}
