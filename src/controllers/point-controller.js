import { getPointItemTemplate } from './../components/point-item';
import PointComponent from '../components/point';
import PointEditorComponent from '../components/point-editor';
import { createElement } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._pointItem = createElement(getPointItemTemplate());
    this._pointData = null;
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

    const handleSaveClick = () => {
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

    // устанавливаем cb в обработчики
    this._point.setOnRollUpHandler(handleRollUpClick);
    this._point.setOnFavoriteHandler(handleFavoriteClick);
    this._pointEdit.setOnSaveHandler(handleSaveClick);
    this._pointEdit.setOnCancelHandler(handleCancelClick);


    //добавляем к родителю элементы
    if (prevPoint && prevEdit) {
      this._pointItem.replaceChild( this._point.getElement(),prevPoint.getElement());
    } else {
      this._pointItem.append(this._point.getElement());
      this._container.append(this._pointItem);
    }
  }
}
