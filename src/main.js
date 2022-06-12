import Api from './api';
import DataModel from './models/data-model';
import Facade from './presenters/facade';
import Provider from './provider';
import Storage from './storage';
import TripPresenter from './presenters/trip-presenter';

const ADRESS = {
  URL: 'https://big-trip-server.herokuapp.com/api',
  POINTS: '/points',
  POINT_BY_ID: '/point',
  EVENTS: '/events',
  DESTINATIONS: '/destinations',
  CREATE: '/create',
  UPDATE: '/update',
  DELETE: '/delete',
  SYNC: '/sync'
};

const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');


const api = new Api(ADRESS);
const storage = new Storage;
const provider = new Provider(api, storage);

const dataModel = new DataModel();

Promise.all([provider.getDestinations(), provider.getEvents(), provider.getAllPoints()]).then((all) => {
  dataModel.setDestinations(all[0]);
  dataModel.setEvents(all[1]);
  dataModel.setPoints(all[2]);
});

const presenter = new Facade(new TripPresenter(headerContainer, filterContainer, eventsContainer, dataModel, provider));
presenter.init();

let currentTitle = '';
window.addEventListener('online', () => {
  document.title = currentTitle;
  provider.sync();
});

window.addEventListener('offline', () => {
  currentTitle = document.title;
  document.title = `${currentTitle} [offline]`;
});


window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js');
});


