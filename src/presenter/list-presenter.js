import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = [...this.destinationsModel.getDestinations(this.points)];
    this.selectedOffers = [...this.offersModel.getSelectedOffers(this.points)];
    this.typesOffers = [...this.offersModel.getTypesOffers(this.points)];
    render(this.listComponent, this.container);
    render(new EditPointView({pointData: this.points[0], destinationData: this.destinations[0], offersByType: this.typesOffers[0]}),
      this.listComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      render(new ListPointView({pointData: this.points[i], destinationData: this.destinations[i],
        selectedOffersData: this.selectedOffers[i]}), this.listComponent.getElement());
    }
  }
}
