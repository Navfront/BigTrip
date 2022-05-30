import { getPointItemTemplate } from '../views/point-item';
import PointComponent from '../views/point';
import PointEditorComponent from '../views/point-editor';
import { createElement } from '../utils/render';
import { EVENTS } from '../mock/events';
import dayjs from 'dayjs';
import AbstractController from './abstract-controller';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

export default class PointController extends AbstractController{
  constructor(container, dataModel, onDataChange, onViewChange) {
    super(...arguments);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._pointItem = createElement(getPointItemTemplate());
    this._pointData = null;
    this._editData = null;
    this._point = null;
    this._pointEdit = null;
    this._mode = Mode.DEFAULT;
  }

  destroy() {
    this._pointItem.remove();
    this._point.removeElement();
    this._pointEdit.removeElement();
    this._point = null;
    this._pointEdit = null;
    this._mode = Mode.DEFAULT;
  }

  resetMode() {
    if (this._mode !== Mode.DEFAULT) {
      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      this._mode = Mode.DEFAULT;
    }
  }

  render(pointData) {
    //для ререндера
    const prevPoint = this._point;
    const prevEdit = this._pointEdit;
    this._pointData = pointData;
    this._editData = Object.assign({}, this._pointData);
    this._point = new PointComponent(this._pointData);
    this._pointEdit = new PointEditorComponent( this._editData);

    const onEscKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        this._pointItem.replaceChild(
          this._point.getElement(),
          this._pointEdit.getElement()
        );
        document.removeEventListener('keydown', onEscKeyDownHandler);
        this._mode = Mode.DEFAULT;
      }
    };

    const handleRollUpClick = () => {
      document.addEventListener('keydown', onEscKeyDownHandler);
      this._pointItem.replaceChild(
        this._pointEdit.getElement(),
        this._point.getElement()
      );
      this._onViewChange();
      this._mode = Mode.EDIT;
    };

    const handleSaveClick = (evt) => {
      evt.preventDefault();
      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      document.removeEventListener('keydown', onEscKeyDownHandler);
      this._mode = Mode.DEFAULT;
    };

    const handleCancelClick = () => {
      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      document.removeEventListener('keydown', onEscKeyDownHandler);
      this._mode = Mode.DEFAULT;

    };

    const handleFavoriteClick = () => {

      this._onDataChange({
        ...pointData,
        isFavorite: !pointData.isFavorite,
      });
      this._point.rerender();
    };

    const handleTypeToggle = (evt) => {
      this._editData.type = evt.target.value; //меняем тип
      this._editData.offers = EVENTS[this._editData.type].offers; //меняем оферы по типу

      this._pointEdit.rerender();
    };

    const handleDestinationChange = (evt) => {
      //проверяем на пустое поле ина неверные данные
      if (evt.target.value && EVENTS[this._editData.type].destinations.includes(evt.target.value)) {
        this._editData.destination = evt.target.value;
      } else {
        this._editData.destination = '';
      }

      this._pointEdit.rerender();
    };

    const handleTimeClick = (pickr, isFrom) => {
      pickr.config.onChange.push((selectedDates, dateStr) => {
        if (isFrom) { this._editData.dateFrom = dayjs(dateStr).toISOString(); } else { this._editData.dateTo = dayjs(dateStr).toISOString(); }
        this._pointEdit.rerender();
      });
      pickr.config.onClose.push((selectedDates, dateStr, instance) => {
        instance.destroy();
      });

    };


    // устанавливаем cb в обработчики
    this._point.setOnRollUpHandler(handleRollUpClick);
    this._point.setOnFavoriteHandler(handleFavoriteClick);
    this._pointEdit.setOnSaveHandler(handleSaveClick);
    this._pointEdit.setOnCancelHandler(handleCancelClick);
    this._pointEdit.setOnToggleEventTypeHandler(handleTypeToggle);
    this._pointEdit.setOnChangeDestinationHandler(handleDestinationChange);
    this._pointEdit.setOnTimeInputHandler(handleTimeClick);


    //добавляем к родителю элементы
    if (prevPoint && prevEdit) {
      this._pointItem.replaceChild( this._point.getElement(),prevPoint.getElement());
    } else {
      this._pointItem.append(this._point.getElement());
      this._container.append(this._pointItem);
    }


  }
}
