import dayjs from 'dayjs';
import {DATE_FORMAT, TIME_FORMAT, HOUR_IN_DAY, MINUTES_IN_HOUR} from '../const';

function humanizeDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : '';
}

function humanizeDueTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';
}

function humanizeDuration(start, end) {
  const duration = start && end ? dayjs(end).diff(start, 'minute') : '';
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

export {humanizeDueDate, humanizeDueTime, humanizeDuration};
