import {
  getRandomInteger,
  humanizeDateDueDate,
  humanizeFromDueDate,
  humanizeToDueDate,
  getDiffTime
} from './utils.js';

// import {
//   arrayDestinations
// } from './destinations.js';

// import {
//   arrayPoints
// } from './points.js';

import {
  ARRAY_OFFERS
} from './offers.js';

const DATES_FROM = ['2019-07-10T22:55:56.845Z', '2019-07-11T23:55:56.845Z', '2019-07-12T20:55:56.845Z'];
const DATES_TO = ['2019-07-10T22:55:56.845Z', '2019-07-11T22:55:56.845Z', '2019-07-12T22:55:56.845Z'];
const TYPES = ['Taxi', 'Drive', 'Flight'];
const DESTINATIONS = ['London', 'Geneva', 'Rome'];
const PRICES = ['80', '100', '200'];
const FAVORITE_FALSE = '';
const FAVORITE_TRUE = 'event__favorite-btn--active';
const IS_FAVORITES = [FAVORITE_FALSE, FAVORITE_TRUE];

const getRandom = (array) => array[getRandomInteger(0, array.length - 1)];
const getRandomElse = (array) => array[getRandomInteger(0, 1)];

export const generatePoint = () => ({
  date: humanizeDateDueDate(getRandom(DATES_FROM)),
  dateFrom: humanizeFromDueDate(getRandom(DATES_FROM)),
  dateTo: humanizeToDueDate(getRandom(DATES_TO)),
  diffTime: getDiffTime(getRandom(DATES_TO), getRandom(DATES_FROM)),
  offers: getRandom(ARRAY_OFFERS).offers[getRandomInteger(0, 1)].title,
  price: getRandom(ARRAY_OFFERS).offers[getRandomInteger(0, 1)].price,
  type: getRandom(TYPES),
  destinations: getRandom(DESTINATIONS),
  basePrice: getRandom(PRICES),
  isFavorite: getRandomElse(IS_FAVORITES),
});
