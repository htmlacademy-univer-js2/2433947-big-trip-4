import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import {render} from '../framework/render.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';
import {sortByDay, sortByPrice, sortByTime} from '../utils/point.js';

export default class PointsListPresenter {
  #listComponent = new ListView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #sortComponent;
  #container;
  #points;
  #sourcedPoints;

  constructor({container}) {
    this.#container = container;
  }

  init(points) {
    this.#points = [...points].sort(sortByDay);
    this.#sourcedPoints = [...this.#points];
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

  #clearPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPoints() {
    render(new NoPointsView(), this.#container);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      handleSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container);
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
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  };
}
