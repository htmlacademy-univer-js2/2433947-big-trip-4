import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/point-view.js';
import NoPointsView from '../view/no-points-view.js';
import {render, replace} from '../framework/render.js';
import {getDestinationById, getOffersByType, getSelectedOffers} from '../mock/point.js';

export default class ListPresenter {
  #listComponent = new ListView();
  #container;
  #pointsModel;
  #points;

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderList();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const offersByType = getOffersByType(point.type);
    const destination = getDestinationById(point.destination);

    const pointComponent = new ListPointView({
      point,
      destination,
      selectedOffers: getSelectedOffers(point.offers, offersByType),
      handleClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      destination,
      offersByType,
      handleSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      handleClick: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }

  #renderList() {
    if (this.#points.length === 0) {
      render(new NoPointsView(), this.#container);
      return;
    }
    render(new SortView(), this.#container);
    render(this.#listComponent, this.#container);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }
}
