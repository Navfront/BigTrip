export const POSITION_TYPES = {
  APPEND: 'append',
  PREPEND: 'prepend',
};

export const createElement = (template) => {
  const createdElement = document.createElement('div');
  createdElement.innerHTML = template;
  return createdElement.firstChild;
};

export const addComponent = (container, component, position = POSITION_TYPES.APPEND) => {
  switch (position) {
    case POSITION_TYPES.APPEND:
      container.append(component);
      break;
    case POSITION_TYPES.PREPEND:
      container.prepend(component);
      break;
    default:
      container.append(component);
      break;
  }
};
