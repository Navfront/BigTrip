import AbstractPresenter from './abstract-presenter';
import PointItemComponent from '../views/point-item';
import PointComponent from '../views/point';
import PointEditorComponent from '../views/point-editor';
import { addComponent, POSITION_TYPES } from '../utils/render';
import { dateToIso } from '../utils/utils';


export const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
  ADD: 'ADD',
};

export default class PointPresenter extends AbstractPresenter{
  constructor(container, dataModel, id, onDataChange, onViewChange, onEscHandler, mode = Mode.DEFAULT) {
    super(...arguments);
    this._container = container;
    this._dataModel = dataModel;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onEscHandler = onEscHandler;
    this._pointItem = new PointItemComponent().getElement();
    this._point = null;
    this._pointEdit = null;
    this._mode = mode;
    this.id = id;
    this._data = this._dataModel.getPointById(id);
    this._buffer = this._dataModel.getPointById(id);

    this._handleRollUpClick = this._handleRollUpClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleSaveClick = this._handleSaveClick.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._handleTypeToggle = this._handleTypeToggle.bind(this);
    this._handleDestinationChange = this._handleDestinationChange.bind(this);
    this._handleTimeClick = this._handleTimeClick.bind(this);
    this._handleRollDownClick = this._handleRollDownClick.bind(this);
    this._handlePriceChange = this._handlePriceChange.bind(this);
  }


  init() {

    //создаем инстансы компонентов точки и редактора
    this._point = new PointComponent(this._data);
    this._pointEdit = new PointEditorComponent(Object.assign({},this._buffer, { availableOffers: this._dataModel.getOffersByType(this._data.type) }) );

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
    this._pointEdit.setOnBasePriceChange(this._handlePriceChange);
    if (this._mode !== Mode.ADD) {
      this._pointEdit.setOnRollDownHandler(this._handleRollDownClick);
    }
  }

  destroyItem() {
    //Удаляем Item с поинтом и редактором из DOM
    this._pointItem.remove();
  }

  openEditor() {
    this._onViewChange();
    if (this._mode !== Mode.EDIT) {
      this._pointItem.replaceChild(
        this._pointEdit.getElement(),
        this._point.getElement()
      );
      this._buffer = { ...this._data };
      this._pointEdit.rerender(Object.assign(this._buffer,
        {
          destinationsByType: this._dataModel.getDestinationsByType(this._data.type),
          availableOffers: this._dataModel.getOffersByType(this._data.type)
        }
      ));
      this._mode = Mode.EDIT;
    }
  }

  closeEditor() {
    this._buffer = { ...this._data };
    if (this._mode === Mode.ADD) {
      this._onViewChange();
    }
    if (this._mode !== Mode.DEFAULT) {
      this._pointEdit.rerender(this._data);
      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      this._mode = Mode.DEFAULT;
    }


  }

  _handleRollUpClick(){
    this.openEditor();
    document.addEventListener('keydown', this._onEscHandler);
  }

  _handleSaveClick = (evt, form) => {
    evt.preventDefault();
    const datas = new FormData(form).keys();
    const newOffers = [];
    for (const key of datas) {
      if (key.includes('offer')) {
        const normKey = key.split('-').slice(2).join(' ');
        const finded = this._buffer.availableOffers.find((it) => it.title.split('-').join(' ') === normKey);
        if(finded){newOffers.push(finded);}
      }
    }
    delete this._buffer.destinationsByType;
    delete this._buffer.availableOffers;
    this._onDataChange(Object.assign({}, this._buffer, {offers: newOffers}));
    this.closeEditor();
    if (this._buffer.id) {
      // this._point.rerender(this._dataModel.getPointById(this._buffer.id));
    }
  };

  _handleCancelClick = () => {
    this.closeEditor();

  };

  _handleRollDownClick = () => {
    this.closeEditor();
  };

  _handleFavoriteClick = () => {
    const data = this._dataModel.getPointById(this.id);
    this._onDataChange({ ...data, isFavorite: !data.isFavorite });
    this._point.rerender(this._dataModel.getPointById(this.id));
  };

  _handleTypeToggle = (element) => {
    this._buffer.type = element.value;
    this._pointEdit.rerender(Object.assign(this._buffer,
      {
        destinationsByType: this._dataModel.getDestinationsByType(element.value),
        availableOffers: this._dataModel.getOffersByType(element.value)
      }
    ));
  };

  _handleDestinationChange = (element) => {
    this._buffer.destination = this._dataModel.getEventDestinationData(element.value);
    this._pointEdit.rerender(this._buffer);
  };

  _handleTimeClick = (isDateFrom,  dateStr) => {
    if (isDateFrom) {
      this._buffer.dateFrom = dateToIso(dateStr);
    } else { this._buffer.dateTo = dateToIso(dateStr); }
    this._pointEdit.rerender(this._buffer);
  };

  _handlePriceChange = (element) => {
    this._buffer.basePrice = element.value;
    // this._pointEdit.rerender(this._buffer);
  };


}
