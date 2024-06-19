import {TYPES, DESTINATIONS, DEFAULT_POINT_DATA} from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

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
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
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

export default class EditPointView extends AbstractView {
  #point;
  #destination;
  #offersByType;
  #handleSubmit;
  #handleClick;

  constructor({point = DEFAULT_POINT_DATA, destination, offersByType, handleSubmit, handleClick}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#handleSubmit = handleSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.#handleClick = handleClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  #createTypeTemplate(type) {
    const isChecked = type === this.#point.type ? 'checked' : '';
    return `
      <div class="event__type-item">
        <input id="event-type-${type}-${this.#point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${this.#point.id}">${type}</label>
      </div>`;
  }

  get #typesTemplate() {
    return TYPES.map((type) => this.#createTypeTemplate(type)).join('');
  }

  get #destinationsTemplate() {
    return DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join('');
  }

  #createOfferTemplate(offer) {
    const isChecked = offer.id in this.#point.offers ? 'checked' : '';
    const offerShortName = offer.name.toLowerCase().split(' ').at(-1);
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerShortName}-${this.#point.id}" type="checkbox" name="event-offer-${offerShortName}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${offerShortName}-${this.#point.id}">
          <span class="event__offer-title">${offer.name}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
  }

  get #offersTemplate() {
    return this.#offersByType.map((offer) => this.#createOfferTemplate(offer)).join('');
  }

  #createPictureTemplate(picture) {
    return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
  }

  get #picturesTemplate() {
    return this.#destination.pictures.map((picture) => this.#createPictureTemplate(picture)).join('');
  }

  get template() {
    return editPointTemplate(this.#point, this.#destination, this.#typesTemplate,
      this.#offersTemplate, this.#picturesTemplate, this.#destinationsTemplate);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(this.#point);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
