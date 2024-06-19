import FilterView from './view/filter-view.js';
import Presenter from './presenter/presenter.js';
import PointsModel from './model/points-model.js';
import {render} from './framework/render.js';
import {generateFilter} from './mock/filter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const pointsListContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const presenter = new Presenter({
  container: pointsListContainer,
  pointsModel
});

const filters = generateFilter(pointsModel.points);
render(new FilterView({filters}), filterContainer);
presenter.init();
