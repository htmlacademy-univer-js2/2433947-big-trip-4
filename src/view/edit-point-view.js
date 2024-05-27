import {createElement} from '../render.js';
import {TYPES, DESTINATIONS} from '../const.js';

function editPointTemplate(point, destination, typesTemplate, offersTemplate, picturesTemplate, destinationsTemplate) {
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${point.id}">
              ${point.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${point.id}">
            <datalist id="destination-list-${point.id}">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
            <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${point.dateFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
            <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${point.dateTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${point.id}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${point.basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersTemplate}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${picturesTemplate}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}

export default class EditPointView {
  constructor({pointData, destinationData, offersByType}) {
    this.pointData = pointData;
    this.destinationData = destinationData;
    this.offersByType = offersByType;
  }

  getTypesTemplate() {
    let typesTemplate = '';
    for (let i = 0; i < TYPES.length; i++) {
      const isChecked = TYPES[i] === this.pointData.type ? 'checked' : '';
      typesTemplate += `
        <div class="event__type-item">
          <input id="event-type-${TYPES[i]}-${this.pointData.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${TYPES[i]}" ${isChecked}>
          <label class="event__type-label  event__type-label--${TYPES[i]}" for="event-type-${TYPES[i]}-${this.pointData.id}">${TYPES[i]}</label>
        </div>`;
    }
    return typesTemplate;
  }

  getDestinationsTemplate() {
    let destinationsTemplate = '';
    for (let i = 0; i < DESTINATIONS.length; i++) {
      destinationsTemplate += `
      <option value="${DESTINATIONS[i]}"></option>`;
    }
    return destinationsTemplate;
  }

  getOffersTemplate() {
    let offersTemplate = '';
    for (let i = 0; i < this.offersByType.length; i++) {
      const isChecked = this.offersByType[i].id in this.pointData.offers ? 'checked' : '';
      const offerShortName = this.offersByType[i].name.toLowerCase().split(' ').at(-1);
      offersTemplate += `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerShortName}-${this.pointData.id}" type="checkbox" name="event-offer-${offerShortName}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${offerShortName}-${this.pointData.id}">
            <span class="event__offer-title">${this.offersByType[i].name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${this.offersByType[i].price}</span>
          </label>
        </div>`;
    }
    return offersTemplate;
  }

  getPicturesTemplate() {
    let picturesTemplate = '';
    for (let i = 0; i < this.destinationData.pictures.length; i++) {
      const picture = this.destinationData.pictures[i];
      picturesTemplate += `
        <img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
    }
    return picturesTemplate;
  }

  getTemplate() {
    return editPointTemplate(this.pointData, this.destinationData, this.getTypesTemplate(),
      this.getOffersTemplate(), this.getPicturesTemplate(), this.getDestinationsTemplate());
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
