import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';

export default class PointsListPresenter {
  #listComponent = new ListView();
  #container;
  #points;
  #pointPresenters = new Map();

  constructor({container}) {
    this.#container = container;
  }

  init(points) {
    this.#points = points;
    this.#renderPointsList();
  }

  #renderPoints() {
    for (const point of this.#points) {
      const pointPresenter = new PointPresenter({
        container: this.#listComponent.element,
        handlePointChange: this.#handlePointChange,
        handleModeChange: this.#handleModeChange
      });
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    }
  }

  #renderNoPoints() {
    render(new NoPointsView(), this.#container);
  }

  #renderSort() {
    render(new SortView(), this.#container);
  }

  #renderPointsList() {
    if (this.#points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#listComponent, this.#container);
    this.#renderPoints();
  }

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
