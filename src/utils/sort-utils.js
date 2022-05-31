/**
 * Принимает массив данных поинтов и возвращает отсортированный массив согласно типу сортировки
 * @param {[*]} pointsData
 * @param {{string}} sortType
 * @returns
 */
export const sortPointsData = (pointsData, sortType) => {
  let sortedPointsData;

  switch (sortType) {
    case 'event':
      sortedPointsData = pointsData.slice().sort((a, b) => (`${  a.type}`).localeCompare(b.type));
      break;
    case 'time':
      sortedPointsData = pointsData.slice()
        .sort(
          (a, b) =>
            new Date(a.dateFrom).valueOf() -
            new Date(a.dateTo).valueOf() -
            (new Date(b.dateFrom).valueOf() - new Date(b.dateTo).valueOf())
        );
      break;
    case 'price':
      sortedPointsData = pointsData.slice()
        .sort((a, b) => b.basePrice - a.basePrice);

      break;
    case 'offer':
      sortedPointsData = pointsData.slice().sort(
        (a, b) =>
          b.offers.reduce((acc, it) => (acc += it.price), 0) -
          a.offers.reduce((acc, it) => (acc += it.price), 0)
      );
      break;

    default:
      //day
      sortedPointsData = pointsData.slice()
        .sort(
          (a, b) =>
            new Date(a.dateFrom).valueOf() - new Date(b.dateFrom).valueOf()
        );
      break;
  }
  return sortedPointsData;
};
