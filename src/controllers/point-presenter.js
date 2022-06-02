import AbstractPresenter from './abstract-presenter';
import PointItemComponent from '../views/point-item';
import PointComponent from '../views/point';
import PointEditorComponent from '../views/point-editor';
import { addComponent } from '../utils/render';


export const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
  ADD: 'ADD',
};

export default class PointPresenter extends AbstractPresenter{
  constructor(container, dataModel, id, onDataChange, onViewChange, mode = Mode.DEFAULT) {
    super(...arguments);
    this._container = container;
    this._dataModel = dataModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._pointItem = new PointItemComponent().getElement();
    this._point = null;
    this._pointEdit = null;
    this._mode = mode;
    this.id = id;


    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleTypeToggle = this._handleTypeToggle.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleTimeClick = this._handleTimeClick.bind(this);
    this._handleRollDownClick = this._handleRollDownClick.bind(this);
  }


  init() {
    //создаем инстансы компонентов точки и редактора
    this._point = new PointComponent(this._dataModel.getPointById(this.id));
    this._pointEdit = new PointEditorComponent(this._dataModel.getPointById(this.id));
    //добавляем их к list-item
    addComponent(this._pointItem, this._point.getElement());
    //item рендерим в контейнер
    addComponent(this._container, this._pointItem);


    this._point.setOnRollUpHandler(this._handleRollUpClick);
    this._point.setOnFavoriteHandler(this._handleFavoriteClick);
    this._pointEdit.setOnSaveHandler(this._handleSaveClick);
    this._pointEdit.setOnCancelHandler(this._handleCancelClick);
    this._pointEdit.setOnToggleEventTypeHandler(this._handleTypeToggle);
    this._pointEdit.setOnChangeDestinationHandler(this._handleDestinationChange);
    this._pointEdit.setOnTimeInputHandler(this._handleTimeClick);
    this._pointEdit.setOnRollDownHandler(this._handleRollDownClick);
  }

  destroyItem() {
    this._pointItem.remove();
  }

  _onEscKeyDownHandler(evt){
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      document.removeEventListener('keydown', this._onEscKeyDownHandler);
      this._mode = Mode.DEFAULT;
    }
  }


  _handleRollUpClick(){
    document.addEventListener('keydown', this._onEscKeyDownHandler);
    this._pointItem.replaceChild(
      this._pointEdit.getElement(),
      this._point.getElement()
    );
    this._onViewChange();
    this._mode = Mode.EDIT;
  }

  _handleSaveClick = (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
    this._mode = Mode.DEFAULT;
  };

  _handleCancelClick = () => {
  };

  _handleRollDownClick = () => {
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
    this._mode = Mode.DEFAULT;
  };

  _handleFavoriteClick = () => {
  };

  _handleTypeToggle = () => {
  };

  _handleDestinationChange = () => {
  };

  _handleTimeClick = () => {
  };


}
