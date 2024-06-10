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

  get #typesTemplate() {
    let typesTemplate = '';
    for (let i = 0; i < TYPES.length; i++) {
      const isChecked = TYPES[i] === this.#point.type ? 'checked' : '';
      typesTemplate += `
        <div class="event__type-item">
          <input id="event-type-${TYPES[i]}-${this.#point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${TYPES[i]}" ${isChecked}>
          <label class="event__type-label  event__type-label--${TYPES[i]}" for="event-type-${TYPES[i]}-${this.#point.id}">${TYPES[i]}</label>
        </div>`;
    }
    return typesTemplate;
  }

  get #destinationsTemplate() {
    let destinationsTemplate = '';
    for (let i = 0; i < DESTINATIONS.length; i++) {
      destinationsTemplate += `
      <option value="${DESTINATIONS[i]}"></option>`;
    }
    return destinationsTemplate;
  }

  get #offersTemplate() {
    let offersTemplate = '';
    for (let i = 0; i < this.#offersByType.length; i++) {
      const isChecked = this.#offersByType[i].id in this.#point.offers ? 'checked' : '';
      const offerShortName = this.#offersByType[i].name.toLowerCase().split(' ').at(-1);
      offersTemplate += `
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerShortName}-${this.#point.id}" type="checkbox" name="event-offer-${offerShortName}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${offerShortName}-${this.#point.id}">
            <span class="event__offer-title">${this.#offersByType[i].name}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${this.#offersByType[i].price}</span>
          </label>
        </div>`;
    }
    return offersTemplate;
  }

  get #picturesTemplate() {
    let picturesTemplate = '';
    for (let i = 0; i < this.#destination.pictures.length; i++) {
      const picture = this.#destination.pictures[i];
      picturesTemplate += `
        <img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
    }
    return picturesTemplate;
  }

  get template() {
    return editPointTemplate(this.#point, this.#destination, this.#typesTemplate,
      this.#offersTemplate, this.#picturesTemplate, this.#destinationsTemplate);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
