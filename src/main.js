import TripPresenter from './controllers/trip-presenter';
import DataModel from './models/data-model';
import Facade from './controllers/facade';
import Api from './api';

const ADRESS = {
  URL: 'http://localhost:3001/api',
  POINTS: '/points',
  POINT_BY_ID: '/point',
  EVENTS: '/events',
  DESTINATIONS: '/destinations',
  CREATE: '/create',
  UPDATE: '/update',
  DELETE: '/delete',
};

const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const api = new Api(ADRESS);

const dataModel = new DataModel(api);
dataModel.init();

const presenter = new Facade(new TripPresenter(headerContainer, filterContainer, eventsContainer, dataModel));
presenter.init();


