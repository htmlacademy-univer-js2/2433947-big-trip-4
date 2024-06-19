import {humanizeDueDate, humanizeDueTime, humanizeDuration, calculateTotalPrice} from '../utils/point.js';
import {getSelectedOffers} from '../mock/point.js';
import AbstractView from '../framework/view/abstract-view.js';

function createListPointTemplate(point, destination) {
  const selectedOffers = getSelectedOffers(point.offers, point.type);
  const isFavorite = point.isFavorite ? 'event__favorite-btn--active' : '';
  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${point.dateFrom}>${humanizeDueDate(point.dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=${point.dateFrom}>${humanizeDueTime(point.dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime=${point.dateTo}>${humanizeDueTime(point.dateTo)}</time>
          </p>
          <p class="event__duration">${humanizeDuration(point.dateFrom, point.dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${calculateTotalPrice(point, selectedOffers)}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createSelectedOffersTemplate(selectedOffers)}
        </ul>
        <button class="event__favorite-btn ${isFavorite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
}

function createSelectedOfferTemplate(offer) {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`;
}

function createSelectedOffersTemplate(selectedOffers) {
  return selectedOffers.map((offer) => createSelectedOfferTemplate(offer)).join('');
}

export default class PointView extends AbstractView {
  #point;
  #destination;
  #handleOpenEditClick;
  #handleFavoriteButtonClick;

  constructor({point, destination, handleOpenEditClick, handleFavoriteButtonClick}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#handleOpenEditClick = handleOpenEditClick;
    this.#handleFavoriteButtonClick = handleFavoriteButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openEditClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteButtonClickHandler);
  }

  get template() {
    return createListPointTemplate(this.#point, this.#destination);
  }

  #openEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenEditClick();
  };

  #favoriteButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteButtonClick();
  };
}
