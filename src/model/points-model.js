import {mockPoints} from '../mock/point.js';

export default class PointsModel {
  #points = mockPoints;

  get points() {
    return this.#points;
  }
}
