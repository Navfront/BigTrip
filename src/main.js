import { TEST_POINTS, EVENTS } from './mock/events';
import TripPresenter from './controllers/trip-presenter';
import DataModel from './models/data-model';
import Facade from './controllers/facade';
import { POINTS } from './mock/points';

const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const dataModel = new DataModel;
dataModel.setEvents(EVENTS); //данные о самих эвентах
dataModel.setPoints(POINTS);//маршруты


const presenter = new Facade(new TripPresenter(headerContainer, filterContainer, eventsContainer, dataModel));

presenter.init();
