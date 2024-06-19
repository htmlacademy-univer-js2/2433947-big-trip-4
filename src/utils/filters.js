import {FilterType} from '../const.js';
import dayjs from 'dayjs';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => (dayjs().isAfter(point.dateFrom)) && dayjs().isBefore(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateTo)),
};

export {filter};
