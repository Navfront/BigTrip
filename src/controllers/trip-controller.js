import { FILTERS } from '../models/points-model';
import PointsListComponent from '../views/points-list';
import AbstractController from './abstract-controller';
import PointController from './point-controller';
import { addComponent } from './../utils/render';


export default class TripController extends AbstractController {
  constructor(container, dataModel) {
    super(...arguments);
    this._container = container;
    this._dataModel = dataModel;
    this._isLoading = true;
    this._pointControllers = new Map();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  init() {

    const pointsList = new PointsListComponent(this._dataModel.getListData());
    addComponent(this._container, pointsList.getElement());


    // for (const point of this._dataModel.getPoints()) {
    //   //создаем инстанс контроллера маршрута
    //   const pointController = new PointController(pointsList.getElement(), this._dataModel, point.id, this._onDataChange, this._onViewChange);
    //   //закидываем его в observer
    //   this._pointControllers.set(point.id, pointController);
    //   pointController.init();
    // }
  }

  _onSortChange() {

  }

  _onDataChange() {
  }

  _onViewChange() {
  }

  _onFilterChange() {
  }

  _onSortClickHandler() {
    // cant evt
    // this._dataModel.changeCurrentSort(evt.currentTarget.dataset.sortName);
  }


}
