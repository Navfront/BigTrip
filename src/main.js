import TripPresenter from './controllers/trip-presenter';
import DataModel from './models/data-model';
import Facade from './controllers/facade';
import Api from './api';
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
  SYNC: '/sync'
};

const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

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
  // .then((reg) => { console.log('регистрация сработала', reg); }).catch((e) => {
  //   console.log('ошибка', e);
  // });
});


