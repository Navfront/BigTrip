import PointsListComponent from '../views/points-list';
import SortComponent from '../views/sort';
import { sortPointsData } from '../utils/sort-utils';
import PointController from './point-controller';
import AbstractController from './abstract-controller';

export default class TripController extends AbstractController {
  constructor() {
    super(...arguments);
    this._sorts = this._dataModel.getSorts();
    this._isLoading = null;
    this._currentSortType = this._dataModel.getCurrentSort();
    this._pointsData = this._dataModel.getPoints();
    this._isDataLoading = false;
    this._isDataEmpty = this._pointsData.length === 0;
    this._sort = new SortComponent(this._dataModel);
    this._pointListComponent = new PointsListComponent(
      this._isDataEmpty,
      this._isDataLoading
    );
    this._pointControllers = new Map();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortClickHandler = this._onSortClickHandler.bind(this);
    this._onSortChange = this._onSortChange.bind(this);

    //подписываемся на изменение фильтра
    this._dataModel.setFilterChangeHandler(this._onFilterChange);
    this._dataModel.setSortsChangeHandler(this._onSortChange);


  }

  _onSortChange() {
    this._pointsData = sortPointsData(this._pointsData,this._dataModel.getCurrentSort());
    this.render();
  }

  _onDataChange(newDataPoint) {
    const pointId = this._dataModel.updatePoint(newDataPoint);
    //смотрим изменения по поинту, узнаем id
    this._pointsData = this._dataModel.getPoints();
    this._pointControllers.get(pointId.toString()).render(newDataPoint); //render on change
  }

  _onViewChange() {
    this._pointControllers.forEach((controller) => controller.resetMode());
  }

  _onFilterChange() {
    this._pointsData = this._dataModel.getPoints();
    this._dataModel.restoreSorts();
    this._sort.rerender();
    this.render();
  }

  _cleanBeforeRender() {
    this._pointControllers.forEach((it) => {
      it.destroy();
    });
  }

  _onSortClickHandler(evt) {
    this._dataModel.changeCurrentSort(evt.currentTarget.dataset.sortName);
  }

  render() {
    this._cleanBeforeRender();

    //рендерим сортировку
    this._renderComponent(this._container, this._sort.getElement());
    this._sort.setOnSortClickHandler(this._onSortClickHandler);

    //рендерим point-list с точками
    this._renderComponent(
      this._container,
      this._pointListComponent.getElement()
    );

    //рендерим все точки если pointsData не пустой
    this._pointControllers.clear();
    if (!this._isDataEmpty) {
      this._pointsData.forEach((it) => {
        const pointController = new PointController(
          this._pointListComponent.getElement(),
          this._dataModel,
          this._onDataChange,
          this._onViewChange
        );
        this._pointControllers.set(it.id, pointController);
        pointController.render(it);
      });
    }
  }
}
