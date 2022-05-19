// import { createElement } from "./../utils/utils";
// import PointComponent from "./point";
// import PointEditorComponent from "./point-editor";
// import {
//   getDestinationByTypes,
//   getDescriptionOfDestination,
// } from "./../mock/events";

export const getPointItemTemplate = () => `<li class="trip-events__item"></li>`;

// onDocumentKeyDownHandler(evt) {
//   if (evt.key === "Escape" || evt.key === "Esc") {
//     console.log("esc");
//     document.removeEventListener("keydown", this.onDocumentKeyDownHandler);
//   }
// }

// export default const pointItem () {
//   constructor(point) {
//     this._itemElement = null;
//     this._pointElement = null;
//     this._pointEditorElement = null;
//     this._pointData = point;
//     this._pointInstance = new PointComponent(this._pointData);
//     this._pointEditorInstance = new PointEditorComponent(
//       this._pointData.type,
//       this._pointData.destination,
//       this._pointData.date_from,
//       this._pointData.date_to,
//       getDestinationByTypes(this._pointData.type),
//       point.offers,
//       getDescriptionOfDestination(this._pointData.destination)
//     );
//   }

//   getTemplate() {
//     return getPointItemTemplate();
//   }

//   getElement() {
//     if (!this._itemElement) {
//       this._itemElement = createElement(this.getTemplate());
//       this._pointElement = this._pointInstance.getElement();
//       this._pointElement
//         .querySelector(".event__rollup-btn")
//         .addEventListener("click", () => {
//           // открываем редактор по клику
//           this._itemElement.replaceChild(
//             this._pointEditorElement,
//             this._pointElement
//           );
//           document.addEventListener("keydown", onDocumentKeyDownHandler);
//         });
//       this._pointEditorElement = this._pointEditorInstance.getElement();
//       this._pointEditorElement
//         .querySelector(".event__save-btn")
//         .addEventListener("click", () => {
//           // закрываем редактор по клику
//           this._itemElement.replaceChild(
//             this._pointElement,
//             this._pointEditorElement
//           );
//           document.removeEventListener("keydown", onDocumentKeyDownHandler);
//         });
//       this._itemElement.append(this._pointElement);
//     }
//     return this._itemElement;
//   }

// }
