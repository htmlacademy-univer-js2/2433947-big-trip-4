import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './framework/render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const pointsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({
  container: pointsContainer,
  pointsModel
});

render(new FilterView(), filterContainer);
render(new SortView(), pointsContainer);
listPresenter.init();
