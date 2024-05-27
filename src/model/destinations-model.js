import {getDestinationById} from '../mock/point.js';

export default class DestinationsModel {
  destinations = [];

  getDestinations(points) {
    for (let i = 0; i < points.length; i++) {
      this.destinations.push(getDestinationById(points[i].destination));
    }

    return this.destinations;
  }
}
