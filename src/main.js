const render = (container, element, position = "beforeend") => {
  const root = document.querySelector(container);
  root.insertAdjacentHtml(element, position);
};
