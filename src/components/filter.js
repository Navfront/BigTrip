const getFilter = (filterName, isChecked = false) => {
  return `
  <div class="trip-filters__filter">
  <input id="${
    filterName ? "filter-" + filterName : null
  }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${
    filterName ? filterName : null
  }" ${isChecked ? "checked" : ""}>
  <label class="trip-filters__filter-label" for="${
    filterName ? "filter-" + filterName : null
  }">${filterName ? filterName : "noName"}</label>
  </div>
`;
};

const filterComponent = (filters) => {
  return `<form class="trip-filters" action="#" method="get">

  ${
    filters && filters.length > 0
      ? filters
          .map((it, index) => {
            return getFilter(it, index === 0);
          })
          .join("\n")
      : ""
  }

  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};

export default filterComponent;
