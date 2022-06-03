import { TEST_POINTS } from './mock/events';
import TripPresenter from './controllers/trip-presenter';
import DataModel from './models/data-model';

const headerContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const dataModel = new DataModel;
dataModel.setPoints(TEST_POINTS);

const tripPresenter = new TripPresenter(headerContainer, filterContainer, eventsContainer, dataModel);

tripPresenter.renderInfo();
tripPresenter.renderNavigation();
tripPresenter.renderAddButton();
tripPresenter.renderFilter();
tripPresenter.renderSorts();
tripPresenter.renderPoints();

