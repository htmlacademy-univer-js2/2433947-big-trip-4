import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListPresenter from './presenter/list-presenter.js';
import {render} from './render.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortAndListContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel({pointsModel});
const offersModel = new OffersModel({pointsModel});
const listPresenter = new ListPresenter({
  container: sortAndListContainer,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});

render(new FilterView(), filterContainer);
render(new SortView(), sortAndListContainer);
listPresenter.init();
