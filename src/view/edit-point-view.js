import {TYPES, DESTINATIONS, DEFAULT_POINT_DATA} from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getOffersByType, getDestinationById} from '../mock/point.js';

function editPointTemplate(state) {
  const {point} = state;
  const offersByType = getOffersByType(point.type);
  const destination = getDestinationById(point.destination);
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
                ${createTypesTemplate(point)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${point.id}">
              ${point.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${point.id}">
            <datalist id="destination-list-${point.id}">
              ${createDestinationsTemplate()}
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
              ${createOffersTemplate(point, offersByType)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${createPicturesTemplate(destination)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `;
}

function createTypeItemTemplate(point, type) {
  const isChecked = type === point.type ? 'checked' : '';
  return `
    <div class="event__type-item">
      <input id="event-type-${type}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${isChecked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${point.id}">${type}</label>
    </div>`;
}

function createTypesTemplate(point) {
  return TYPES.map((type) => createTypeItemTemplate(point, type)).join('');
}

function createDestinationsTemplate() {
  return DESTINATIONS.map((destination) => `<option value="${destination}"></option>`).join('');
}

function createOfferItemTemplate(point, offer) {
  const isChecked = offer.id in point.offers ? 'checked' : '';
  const offerShortName = offer.name.toLowerCase().split(' ').at(-1);
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerShortName}-${point.id}" type="checkbox" name="event-offer-${offerShortName}" ${isChecked} data-offer-id="${offer.id}">
      <label class="event__offer-label" for="event-offer-${offerShortName}-${point.id}">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
}

function createOffersTemplate(point, offersByType) {
  return offersByType.map((offer) => createOfferItemTemplate(point, offer)).join('');
}

function createPictureItemTemplate(picture) {
  return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
}

function createPicturesTemplate(destination) {
  return destination.pictures.map((picture) => createPictureItemTemplate(picture)).join('');
}

export default class EditPointView extends AbstractStatefulView {
  #destinations;
  #handleSubmit;
  #handleCloseEditClick;

  constructor({point = DEFAULT_POINT_DATA, destinations, handleSubmit, handleCloseEditClick}) {
    super();
    this.#destinations = destinations;
    this.#handleSubmit = handleSubmit;
    this.#handleCloseEditClick = handleCloseEditClick;
    this._setState(EditPointView.parsePointToState({point}));
    this._restoreHandlers();
  }

  reset(point) {
    return this.updateElement({point});
  }

  get template() {
    return editPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  }

  static parsePointToState = ({point}) => ({point});

  static parseStateToPoint = (state) => state.point;

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #closeEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseEditClick();
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations
      .find((destination) => destination.name === evt.target.value);
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationId
      }
    });
  };

  #offersChangeHandler = () => {
    const checked = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: checked.map((offer) => offer.dataset.offerId)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: Number(evt.target.value)
      }
    });
  };
}
