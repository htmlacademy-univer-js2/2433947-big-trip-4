import FilterView from './view/filter-view.js';
import ListPresenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './framework/render.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const pointsListContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const listPresenter = new ListPresenter({
  container: pointsListContainer,
  pointsModel
});

render(new FilterView(), filterContainer);
listPresenter.init();
