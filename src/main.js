import { TEST_POINTS } from './mock/events';
import { POSITION_TYPES } from './utils/render';
import InfoComponent from './views/info';
import NavComponent from './views/nav';
import { renderComponent } from './utils/render';
import TripController from './controllers/trip-controller';
import PointsModel from './models/points-model';
import FilterController from './controllers/filter-controller';

const pointsModel = new PointsModel;
pointsModel.setPointsData(TEST_POINTS);

const tripMain = document.querySelector('.trip-main');
const tripControls = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

// компоненты:
const tripInfo = new InfoComponent();
renderComponent(tripMain, tripInfo.getElement(), POSITION_TYPES.PREPEND);

const navigation = new NavComponent();
renderComponent(tripControls, navigation.getElement());

// контроллеры:
const filterController = new FilterController(tripControls, pointsModel);
filterController.render();
const tripController = new TripController(tripEvents, pointsModel);
tripController.render();

