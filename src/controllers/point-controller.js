import { getPointItemTemplate } from "./../components/point-item";
import PointComponent from "../components/point";
import PointEditorComponent from "../components/point-editor";
import { createElement } from "../utils/render";

export default class PointController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._pointData = null;
  }

  render(pointData) {
    this._pointData = pointData;
    const tripEventsList = this._container;
    const pointItem = createElement(getPointItemTemplate());
    const point = new PointComponent(pointData);
    const pointEditor = new PointEditorComponent(pointData);

    const onEscKeyDownHandler = (evt) => {
      if (evt.key === "Escape" || evt.key === "Esc") {
        pointItem.replaceChild(pointElement, editorElement);
        document.removeEventListener("keydown", onEscKeyDownHandler);
      }
    };

    const handleRollUpClick = () => {
      document.addEventListener("keydown", onEscKeyDownHandler);
      pointItem.replaceChild(pointEditor.getElement(), point.getElement());
    };

    const handleSaveClick = () => {
      pointItem.replaceChild(point.getElement(), pointEditor.getElement());
      document.removeEventListener("keydown", onEscKeyDownHandler);
    };

    const handleFavoriteClick = () => {
      this._onDataChange(pointData, {
        ...pointData,
        isFavorite: !pointData.isFavorite,
      });
      this._pointData.isFavorite = !this._pointData.isFavorite; //меняем данные внутри поинта для отрисовки favorite
      point.rerender();
    };

    // устанавливаем cb в обработчики
    point.setOnRollUpHandler(handleRollUpClick);
    point.setOnFavoriteHandler(handleFavoriteClick);
    pointEditor.setOnSaveHandler(handleSaveClick);

    pointItem.append(point.getElement());
    tripEventsList.append(pointItem);
  }
}
