import TripPresenter from './controllers/trip-presenter';
import DataModel from './models/data-model';
import Facade from './controllers/facade';
import Api from './api';
import { EVENTS_DATA, EVENT_DESTINATIONS, POINTS, MOD_POINTS } from './mock/points';
import Storage from './storage';
import Provider from './provider';


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
const storage = new Storage;
const provider = new Provider(api, storage);

const dataModel = new DataModel();

Promise.all([provider.getDestinations(), provider.getEvents(), provider.getAllPoints()]).then((all) => {
  dataModel.setDestinations(all[0].message);
  dataModel.setEvents(all[1].message);
  dataModel.setPoints(all[2].message);
});

const presenter = new Facade(new TripPresenter(headerContainer, filterContainer, eventsContainer, dataModel));
presenter.init();


