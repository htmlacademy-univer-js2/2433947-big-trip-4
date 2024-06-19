import {getRandomArrayElement, getRandomArbitrary} from '../utils/common.js';
import {DESTINATIONS, DESCRIPTIONS} from '../const.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2019-07-10T22:10',
    dateTo: '2019-07-11T23:00',
    destination: 0,
    isFavorite: false,
    offers: [1, 2],
    type: 'Train'
  },
  {
    id: 2,
    basePrice: 120,
    dateFrom: '2019-07-13T12:00',
    dateTo: '2019-07-13T12:45',
    destination: 1,
    isFavorite: false,
    offers: [],
    type: 'Taxi'
  },
  {
    id: 3,
    basePrice: 75,
    dateFrom: '2019-07-12T7:55',
    dateTo: '2019-07-15T14:20',
    destination: 2,
    isFavorite: true,
    offers: [0],
    type: 'Sightseeing'
  },
  {
    id: 4,
    basePrice: 75,
    dateFrom: '2025-07-15T7:55',
    dateTo: '2025-07-15T14:20',
    destination: 2,
    isFavorite: true,
    offers: [0],
    type: 'Sightseeing'
  },
  {
    id: 5,
    basePrice: 5,
    dateFrom: '2019-07-14T7:55',
    dateTo: '2025-07-15T14:20',
    destination: 2,
    isFavorite: true,
    offers: [0],
    type: 'Sightseeing'
  }
];

const destinations = [
  {
    id: 0,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 15)}`,
        description: 'Beautiful place'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 15)}`,
        description: 'Picture description'
      }
    ]
  },
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 15)}`,
        description: 'Some text'
      },
    ]
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(DESTINATIONS),
    pictures: []
  },
];

const offers = [
  {
    type: 'Taxi',
    offers: [
      {
        id: 0,
        name: 'Switch to comfort',
        price: 35
      }
    ]
  },
  {
    type: 'Train',
    offers: [
      {
        id: 0,
        name: 'Switch to comfort',
        price: 500
      },
      {
        id: 1,
        name: 'Add luggage',
        price: 20
      },
      {
        id: 2,
        name: 'Add breakfast',
        price: 28
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 0,
        name: 'Rent a car',
        price: 280
      },
      {
        id: 1,
        name: 'Order Uber',
        price: 100
      },
    ]
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

function getDestinationById(id) {
  return destinations.find((destination) => destination.id === id);
}

function getOffersByType(type) {
  return offers.find((offersByType) => offersByType.type === type).offers;
}

function getSelectedOffers(offerIds, type) {
  const offersByType = getOffersByType(type);
  const selectedOffers = [];
  for (let i = 0; i < offerIds.length; i++ ) {
    selectedOffers.push(offersByType.find((offer) => offer.id === offerIds[i]));
  }

  return selectedOffers;
}

export {getRandomPoint, getDestinationById, getOffersByType, getSelectedOffers, mockPoints};
