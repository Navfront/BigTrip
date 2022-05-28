import AbstractComponent from './../components/abstract-component';

export const POSITION_TYPES = {
  APPEND: 'append',
  PREPEND: 'prepend',
};

export const createElement = (template) => {
  const createdElement = document.createElement('div');
  createdElement.innerHTML = template;
  return createdElement.firstChild;
};

export const renderComponent = (container, component, position) => {

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

export const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractComponent)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
