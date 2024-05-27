const POINT_COUNT = 4;

const DESTINATIONS = ['Paris', 'London', 'New York', 'Shanghai', 'Moscow'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const DATE_FORMAT = 'MMM D';

const TIME_FORMAT = 'HH:mm';

const HOUR_IN_DAY = 24;

const MINUTES_IN_HOUR = 60;

const DEFAULT_POINT_DATA = {
  id: null,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'Flight'
};

export {POINT_COUNT, DESTINATIONS, DESCRIPTIONS, DATE_FORMAT, TIME_FORMAT, HOUR_IN_DAY, MINUTES_IN_HOUR, TYPES, DEFAULT_POINT_DATA};
