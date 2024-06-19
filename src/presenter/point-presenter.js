import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import {render, replace, remove} from '../framework/render.js';
import {getDestinationById, getOffersByType, getSelectedOffers} from '../mock/point.js';
import {Mode} from '../const.js';

export default class PointPresenter {
  #container;
  #point;
  #handlePointChange;
  #handleModeChange;

  #pointComponent = null;
  #pointEditComponent = null;
  #mode = Mode.DEFAULT;

  constructor({container, handlePointChange, handleModeChange}) {
    this.#container = container;
    this.#handlePointChange = handlePointChange;
    this.#handleModeChange = handleModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    const offersByType = getOffersByType(this.#point.type);
    const destination = getDestinationById(this.#point.destination);

    this.#pointComponent = new PointView({
      point: this.#point,
      destination,
      selectedOffers: getSelectedOffers(this.#point.offers, this.#point.type),
      handleOpenEditClick: this.#handleOpenEditClick,
      handleFavoriteButtonClick: this.#handleFavoriteButtonClick
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      destination,
      offersByType,
      handleSubmit: this.#handleSubmit,
      handleClick: this.#handleCloseEditClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  #replacePointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleOpenEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handleSubmit = (point) => {
    this.#handlePointChange(point);
    this.#replaceEditFormToPoint();
  };

  #handleCloseEditClick = () => {
    this.#replaceEditFormToPoint();
  };

  #handleFavoriteButtonClick = () => {
    this.#point.isFavorite = !this.#point.isFavorite;
    this.#handlePointChange(this.#point);
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
