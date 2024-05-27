import {createElement} from '../render.js';
import {humanizeDueDate, humanizeDueTime, humanizeDuration} from '../utils.js';

function createListPointTemplate(point, totalPrice, destination, selectedOffersTemplate, isFavorite) {
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
          &euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${selectedOffersTemplate}
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

export default class ListPointView {
  constructor({pointData, destinationData, selectedOffersData}) {
    this.pointData = pointData;
    this.destinationData = destinationData;
    this.selectedOffersData = selectedOffersData;
  }

  getSelectedOffersTemplate() {
    let selectedOffersTemplate = '';
    for (let i = 0; i < this.selectedOffersData.length; i++) {
      selectedOffersTemplate += `
        <li class="event__offer">
          <span class="event__offer-title">${this.selectedOffersData[i].name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${this.selectedOffersData[i].price}</span>
        </li>`;
    }
    return selectedOffersTemplate;
  }

  getTotalPrice() {
    let totalPrice = this.pointData.basePrice;
    for (let i = 0; i < this.selectedOffersData.length; i++) {
      totalPrice += this.selectedOffersData[i].price;
    }
    return totalPrice;
  }

  isFavorite() {
    return this.pointData.isFavorite ? 'event__favorite-btn--active' : '';
  }

  getTemplate() {
    return createListPointTemplate(this.pointData, this.getTotalPrice(), this.destinationData,
      this.getSelectedOffersTemplate(), this.isFavorite());
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
