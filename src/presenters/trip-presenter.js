import AbstractPresenter from './abstract-presenter';
import AddButtonComponent from '../views/add-button';
import FilterComponent from './../views/filter';
import EmptyComponent from '../views/empty';
import InfoComponent from '../views/info';
import NavComponent from '../views/nav';
import PointsListComponent from '../views/points-list';
import PointPresenter, { Mode } from './point-presenter';
import SortComponent from './../views/sort';
import StatsComponent from './../views/stats';
import uniqid from 'uniqid';
import { addComponent } from '../utils/render';
import { generateInfoData } from './../utils/utils';
import { POSITION_TYPES } from './../utils/render';


export default class TripPresenter extends AbstractPresenter {
  constructor(headerContainer, filterContainer, eventsContainer, dataModel, provider) {
    super(...arguments);
    this._headerContainer = headerContainer;
    this._eventsContainer = eventsContainer;
    this._filterContainer = filterContainer;
    this._dataModel = dataModel;
    this._provider = provider;
    this._pointPresenters = new Map();
    this._infoComponent = new InfoComponent(generateInfoData(this._dataModel.getOriginalPoints()));
    this._navComponent = new NavComponent();
    this._pointsList = new PointsListComponent();
    this._emptyComponent = new EmptyComponent();
    this._addButtonComponent = new AddButtonComponent();
    this._filterComponent = new FilterComponent();
    this._sortsComponent = new SortComponent();
    this._statsComponent = new StatsComponent(this._dataModel.getOriginalPoints());

    this._onViewChange = this._onViewChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
    this._onAddEvent = this._onAddEvent.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);
    this._onNavTabClickHandler = this._onNavTabClickHandler.bind(this);
    this.renderPoints = this.renderPoints.bind(this);

    this._dataModel.setLoadingWatchHandler(this.renderPoints);
  }


  renderInfo() {
    addComponent(this._headerContainer, this._infoComponent.getElement(), POSITION_TYPES.PREPEND);
  }

  renderNavigation() {
    addComponent(this._filterContainer, this._navComponent.getElement());
    this._navComponent.setOnTabsClick(this._onNavTabClickHandler);
  }

  renderStat() {
    addComponent(this._eventsContainer, this._statsComponent.getElement());
    this._statsComponent.getStatistics(this._dataModel.getOriginalPoints());
    this._statsComponent.hide();
  }

  renderAddButton() {
    addComponent(this._headerContainer, this._addButtonComponent.getElement());
    this._addButtonComponent.setClickHandler(this._onAddEvent);
  }

  renderFilter() {
    //ставим обработчик клика на фильтр
    this._filterComponent.setOnFiltersClickHandler((element) => {
      this._dataModel.setActiveFilter(element.value);
    });
    //подписываемся на изменение модели
    this._dataModel.setFilterChangeHandler(this._onFilterChange);
    //рисуем компонент
    addComponent(this._filterContainer, this._filterComponent.getElement());
  }

  renderSorts() {
    //ставим обработчик
    this._sortsComponent.setOnSortClickHandler((element) => {
      this._dataModel.changeCurrentSort(element.dataset.sortName);
    });
    //подписываемся на изменение модели
    this._dataModel.setSortsChangeHandler(this._onSortChange);
    //рисуем компонент
    addComponent(this._eventsContainer, this._sortsComponent.getElement());
  }

  renderPointList() {
    //контейнер для маршрутов
    addComponent(this._eventsContainer, this._pointsList.getElement());
  }

  renderPoints() {
    //если это повторный рендер и уже есть контроллеры то удаляем pointItems
    if (this._pointPresenters.size > 0) {
      this._pointPresenters.forEach((presenter) => {
        presenter.destroyItem();
      });
    }
    if (this._dataModel.getPoints().length > 0) {
      this._sortsComponent.show();
      this._emptyComponent.destroy();
      //итерируем маршруты
      for (const point of this._dataModel.getPoints()) {
        //создаем инстанс контроллера маршрута
        const pointPresenter = new PointPresenter(this._pointsList.getElement(), this._dataModel, point.id, this._onDataChange, this._onViewChange, this._onEscKeyDownHandler);
        //закидываем его в observer
        this._pointPresenters.set(point.id, pointPresenter);
        pointPresenter.init();
      }
    } else {
      //если нет маршрутов - рендерим emptyComponent
      addComponent(  this._eventsContainer, this._emptyComponent.getElement());
      this._emptyComponent.rerender(this._dataModel.getListData());
      this._sortsComponent.hide();
    }
    this._infoComponent.rerender(generateInfoData(this._dataModel.getOriginalPoints()));
  }

  _disableAddButton() {
    this._addButtonComponent.getElement().disabled = true;
  }

  _enableAddButton() {
    this._addButtonComponent.getElement().disabled = false;
  }

  _onAddEvent() {
    this._dataModel.restoreSorts();
    this._dataModel.setActiveFilterDefault();
    this._filterComponent.rerender();
    this.renderPoints();
    this._onViewChange();
    this._disableAddButton();
    this._pointPresenters.set('add', new PointPresenter(this._pointsList.getElement(), this._dataModel, null, this._onDataChange, this._onViewChange, this._onEscKeyDownHandler, Mode.ADD));
    this._pointPresenters.get('add').init();
    document.addEventListener('keydown', this._onEscKeyDownHandler);
  }

  _onSortChange() {
    //ререндер всех поинтов
    this.renderPoints();
    this._enableAddButton();
  }


  _onDataChange(newData) {
    if (newData.id === null) {
      const newId = uniqid();
      this._dataModel.createPoint({ ...newData, id: newId });
      this._provider.createPoint({ ...newData, id: newId });
    }
    else if (newData.id.includes('--delete')) {
      const normalizedId = newData.id.split('--')[0];
      this._dataModel.deletePoint(normalizedId);
      this._provider.deletePoint(normalizedId);
    } else {
      this._dataModel.updatePoint(newData);
      this._provider.updatePoint(newData);
    }


    this._enableAddButton();
    this.renderPoints();
    this._infoComponent.rerender(generateInfoData(this._dataModel.getOriginalPoints()));
  }

  _onViewChange() {
    this._pointPresenters.forEach((presenter) => {
      if (presenter.id === null) {
        presenter.destroyItem();
      } else{ presenter.closeEditor();}

    });
    this._pointPresenters.delete('add');
    this._enableAddButton();
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  }

  _onFilterChange() {
    //сбрасываем сортировку в модели
    this._dataModel.restoreSorts();
    //ререндерим компонент сортировки
    this._sortsComponent.rerender(this._dataModel.getSorts());
    //ререндер всех поинтов
    this.renderPoints();
    this._enableAddButton();
  }

  _onEscKeyDownHandler(evt){
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._onViewChange();
    }
  }

  _onNavTabClickHandler(element) {
    const containers = document.querySelectorAll('.page-body__container');
    const currentTab = element.dataset.ref;
    switch (currentTab) {
      case 'stats':
        this._pointsList.hide();
        this._sortsComponent.hide();
        this._filterComponent.hide();
        this._statsComponent.show().rerender(this._dataModel.getOriginalPoints());
        this._addButtonComponent.hide();
        for (const container of containers) {
          container.classList.add('page-body__container--noline');
        }
        break;

      default:
        for (const container of containers) {
          container.classList.remove('page-body__container--noline');
        }
        this._statsComponent.hide();
        this._filterComponent.show();
        this._pointsList.show();
        this._sortsComponent.show();
        this._addButtonComponent.show();
        break;
    }
  }
}
