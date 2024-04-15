import {POINT_COUNT} from '../consts.js';
import ListView from '../view/list-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import {render} from '../render.js';

export default class ListPresenter {
  listComponent = new ListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.listComponent, this.container);
    render(new EditPointView(), this.listComponent.getElement());

    for (let i = 0; i < POINT_COUNT; i++) {
      render(new ListPointView(), this.listComponent.getElement());
    }
  }
}
