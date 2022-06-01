import PointsListComponent from '../views/points-list';
import AbstractController from './abstract-controller';
import PointController from './point-controller';
import { addComponent } from './../utils/render';
import EmptyComponent from './../views/empty';


export default class TripController extends AbstractController {
  constructor(container, dataModel) {
    super(...arguments);
    this._container = container;
    this._dataModel = dataModel;
    this._pointControllers = new Map();
    this._pointsList = new PointsListComponent();
    this._emptyComponent = new EmptyComponent();
    this._isLoading = true;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    //если это повторный рендер и уже есть контроллеры то удаляем pointItems
    if (this._pointControllers.size>0) {
      this._pointControllers.forEach((controller) => {
        controller.destroyItem();
      });
    }
    if (!this._dataModel.isEmpty()) {
      //если есть маршруты - рендерим контейнер
      addComponent(this._container, this._pointsList.getElement());
      //итерируем маршруты
      for (const point of this._dataModel.getPoints()) {
        //создаем инстанс контроллера маршрута
        const pointController = new PointController(this._pointsList.getElement(), this._dataModel, point.id, this._onDataChange, this._onViewChange);
        //закидываем его в observer
        this._pointControllers.set(point.id, pointController);
        pointController.init();
      }
    } else {
      //если нет маршрутов - рендерим emptyComponent
      addComponent(this._container, this._emptyComponent.getElement());
    }
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
