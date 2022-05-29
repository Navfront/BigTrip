
import FilterComponent from '../views/filter';
import AbstractController from './abstract-controller';

const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export default class FilterController extends AbstractController{
  constructor() {
    super(...arguments);
    this._filterMode = Filters.EVERYTHING;
    this._filterComponent = null;
  }

  render() {
    this._filterComponent = new FilterComponent(Object.values(Filters));
    this._renderComponent(this._container, this._filterComponent.getElement());
  }
}
