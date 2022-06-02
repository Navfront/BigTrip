import { TEST_POINTS } from './mock/events';
import { POSITION_TYPES } from './utils/render';
import InfoComponent from './views/info';
import NavComponent from './views/nav';
import { addComponent } from './utils/render';
import TripPresenter from './controllers/trip-presenter';
import PointsModel from './models/points-model';


const pointsModel = new PointsModel;
pointsModel.setPoints(TEST_POINTS);

const tripMain = document.querySelector('.trip-main');
const tripControls = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

// компоненты:
const tripInfo = new InfoComponent();
addComponent(tripMain, tripInfo.getElement(), POSITION_TYPES.PREPEND);

const navigation = new NavComponent();
addComponent(tripControls, navigation.getElement());

const tripPresenter = new TripPresenter(tripEvents, pointsModel);
tripPresenter.render();

