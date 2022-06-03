import AbstractPresenter from './abstract-presenter';
import PointItemComponent from '../views/point-item';
import PointComponent from '../views/point';
import PointEditorComponent from '../views/point-editor';
import { addComponent, POSITION_TYPES } from '../utils/render';


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
    this._buffer = dataModel.getPointById(this.id);


    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleTypeToggle = this._handleTypeToggle.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleTimeClick = this._handleTimeClick.bind(this);
    this._handleRollDownClick = this._handleRollDownClick.bind(this);
    this._onEscKeyDownHandler = this._onEscKeyDownHandler.bind(this);

  }


  init() {

    //создаем инстансы компонентов точки и редактора
    this._point = new PointComponent(this._dataModel.getPointById(this.id));
    this._pointEdit = new PointEditorComponent(this._dataModel.getPointById(this.id));

    if (this._mode === Mode.ADD) {
      //добавляем Edit к list-item
      addComponent(this._pointItem, this._pointEdit.getElement());
      //item рендерим в контейнер
      addComponent(this._container, this._pointItem, POSITION_TYPES.PREPEND);
    } else {
      //добавляем point к list-item
      addComponent(this._pointItem, this._point.getElement());
      //item рендерим в контейнер
      addComponent(this._container, this._pointItem);
    }


    //устанавливаем обработчики
    this._point.setOnRollUpHandler(this._handleRollUpClick);
    this._point.setOnFavoriteHandler(this._handleFavoriteClick);
    this._pointEdit.setOnSaveHandler(this._handleSaveClick);
    this._pointEdit.setOnCancelHandler(this._handleCancelClick);
    this._pointEdit.setOnToggleEventTypeHandler(this._handleTypeToggle);
    this._pointEdit.setOnChangeDestinationHandler(this._handleDestinationChange);
    this._pointEdit.setOnTimeInputHandler(this._handleTimeClick);
    if (this._mode !== Mode.ADD) {
      this._pointEdit.setOnRollDownHandler(this._handleRollDownClick);
    }
  }

  destroyItem() {
    //Удаляем только из dom
    this._pointItem.remove();
  }

  openEditor() {
    this._onViewChange();
    if (this._mode !== Mode.EDIT) {
      this._pointItem.replaceChild(
        this._pointEdit.getElement(),
        this._point.getElement()
      );
      this._mode = Mode.EDIT;
    }
  }

  closeEditor() {
    if (this._mode === Mode.ADD) {
      this._onViewChange();
    }
    if (this._mode !== Mode.DEFAULT) {
      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      document.removeEventListener('keydown', this._onEscKeyDownHandler);
      this._mode = Mode.DEFAULT;
    }

  }

  _onEscKeyDownHandler(evt){
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.closeEditor();
    }
  }


  _handleRollUpClick(){
    document.addEventListener('keydown', this._onEscKeyDownHandler);
    this.openEditor();

  }

  _handleSaveClick = (evt) => {
    evt.preventDefault();
    this.closeEditor();
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  };

  _handleCancelClick = () => {
    this.closeEditor();
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
  };

  _handleRollDownClick = () => {
    document.removeEventListener('keydown', this._onEscKeyDownHandler);
    this.closeEditor();
  };

  _handleFavoriteClick = () => {
    const data = this._dataModel.getPointById(this.id);
    this._onDataChange({ ...data, isFavorite: !data.isFavorite });
    this._point.rerender(this._dataModel.getPointById(this.id));
  };

  _handleTypeToggle = () => {
  };

  _handleDestinationChange = () => {
  };

  _handleTimeClick = () => {
  };


}
