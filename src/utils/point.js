import dayjs from 'dayjs';
import {DATE_FORMAT, TIME_FORMAT, HOUR_IN_DAY, MINUTES_IN_HOUR} from '../const';
import {getSelectedOffers} from '../mock/point';

function humanizeDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeDueTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function calculateDuration(start, end) {
  return start && end ? dayjs(end).diff(start, 'minute') : '';
}

function humanizeDuration(start, end) {
  const duration = calculateDuration(start, end);
  if (duration === '') {
    return '';
  }
  const minutes = duration % MINUTES_IN_HOUR;
  let hours = Math.floor(duration / MINUTES_IN_HOUR);
  let days = 0;
  if (hours >= HOUR_IN_DAY) {
    days = Math.floor(hours / HOUR_IN_DAY);
    hours = hours % HOUR_IN_DAY;
  }
  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  } else if (hours > 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${minutes}M`;
  }
}

function calculateTotalPrice(point, selectedOffers) {
  let totalPrice = point.basePrice;
  for (const offer of selectedOffers) {
    totalPrice += offer.price;
  }
  return totalPrice;
}

function sortByTime(pointA, pointB) {
  const durationA = calculateDuration(pointA.dateFrom, pointA.dateTo);
  const durationB = calculateDuration(pointB.dateFrom, pointB.dateTo);

  if (durationA === durationB) {
    return 0;
  }

  if (durationA > durationB) {
    return 1;
  }

  if (durationB > durationA) {
    return -1;
  }
}

function sortByPrice(pointA, pointB) {
  const priceA = calculateTotalPrice(pointA, getSelectedOffers(pointA.offers, pointA.type));
  const priceB = calculateTotalPrice(pointB, getSelectedOffers(pointB.offers, pointB.type));
  if (priceA === priceB) {
    return 0;
  }

  if (priceA > priceB) {
    return 1;
  }

  if (priceB > priceA) {
    return -1;
  }
}

function sortByDay(pointA, pointB) {
  const startA = pointA.dateFrom;
  const startB = pointB.dateFrom;
  if (dayjs(startA).isSame(dayjs(startB))) {
    return 0;
  }

  if (dayjs(startB).isBefore(dayjs(startA))) {
    return 1;
  }

  if (dayjs(startA).isBefore(dayjs(startB))) {
    return -1;
  }
}

export {humanizeDueDate, humanizeDueTime, humanizeDuration, sortByDay, sortByTime, sortByPrice, calculateTotalPrice};
