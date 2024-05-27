import {getOffersByType, getOfferById} from '../mock/point.js';

export default class OffersModel {
  selectedOffersList = [];
  typesOffersList = [];

  getSelectedOffers(points) {
    for (let i = 0; i < points.length; i++) {
      const pointOffers = [];
      const offersByType = getOffersByType(points[i].type);
      const offersIdList = points[i].offers;
      for (let j = 0; j < offersIdList.length; j++){
        pointOffers.push(getOfferById(offersByType, offersIdList[j]));
      }
      this.selectedOffersList.push(pointOffers);
    }
    return this.selectedOffersList;
  }

  getTypesOffers(points) {
    for (let i = 0; i < points.length; i++) {
      this.typesOffersList.push(getOffersByType(points[i].type));
    }
    return this.typesOffersList;
  }
}
