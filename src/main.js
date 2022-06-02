import { TEST_POINTS } from './mock/events';
import { POSITION_TYPES } from './utils/render';
import InfoComponent from './views/info';
import NavComponent from './views/nav';
import { addComponent } from './utils/render';
import TripPresenter from './controllers/trip-presenter';
import DataModel from './models/data-model';


const dataModel = new DataModel;
dataModel.setPoints(TEST_POINTS);

const tripMain = document.querySelector('.trip-main');
const tripControls = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

// компоненты:
const tripInfo = new InfoComponent();
addComponent(tripMain, tripInfo.getElement(), POSITION_TYPES.PREPEND);

const navigation = new NavComponent();
addComponent(tripControls, navigation.getElement());

const tripPresenter = new TripPresenter(tripEvents, dataModel);
tripPresenter.renderFilter();
tripPresenter.renderSorts();
tripPresenter.renderPoints();

