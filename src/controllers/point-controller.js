import { getPointItemTemplate } from '../views/point-item';
import PointComponent from '../views/point';
import PointEditorComponent from '../views/point-editor';
import { createElement } from '../utils/render';
import { EVENTS } from '../mock/events';
import dayjs from 'dayjs';
import AbstractController from './abstract-controller';

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
  ADD: 'ADD',
};

export default class PointController extends AbstractController{
  constructor(container, dataModel, onDataChange, onViewChange) {
    super(...arguments);
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._pointItem = createElement(getPointItemTemplate());
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
    this._point = new PointComponent(pointData);
    this._pointEdit = new PointEditorComponent(pointData);

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
      const formData = new FormData(evt.target);
      for (const pair of formData.entries()) {
        console.log(`${pair[0] }, ${  pair[1]}`);
      }
      //  event-destination, amsterdam
      //  event-start-time, 22/06/22 01:55
      //  event-end-time, 22/06/22 14:22
      //  event-price, 1100
      //  event-offer-Choose-meal, on
      //  event-offer-Upgrade-to-comfort-class, on


      this._pointItem.replaceChild(
        this._point.getElement(),
        this._pointEdit.getElement()
      );
      document.removeEventListener('keydown', onEscKeyDownHandler);
      this._mode = Mode.DEFAULT;
    };

    const handleCancelClick = (evt) => {
      console.log(evt.target);
    };

    const handleRollDownClick = () => {
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
    this._pointEdit.setOnRollDownHandler(handleRollDownClick);


    //добавляем к родителю элементы
    if (prevPoint && prevEdit) {
      //ререндер
      this._pointItem.replaceChild( this._point.getElement(),prevPoint.getElement());
    } else {
      this._pointItem.append(this._point.getElement());
      this._container.append(this._pointItem);
    }


  }
}
