import PointsListPresenter from './points-list-presenter.js';

export default class Presenter {
  #container;
  #pointsModel;
  #points;

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = this.#pointsModel.points;
    new PointsListPresenter({container: this.#container}).init(this.#points);
  }
}
