import AbstractView from '../framework/view/abstract-view.js';
import {FILTERS, DEFAULT_FILTER} from '../const.js';

function createFilterTemplate(filterName, count) {
  const filter = filterName.toLowerCase();
  const isChecked = filterName === DEFAULT_FILTER ? 'checked' : '';
  const isDisabled = count === 0 ? 'disabled' : '';
  return `
    <div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${isChecked} ${isDisabled}>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filterName}</label>
    </div>
  `;
}

export default class FilterView extends AbstractView {
  get template() {
    const filtersTemplate = Object.entries(FILTERS).map(([filter, count]) => createFilterTemplate(filter, count)).join('');

    return `
      <form class="trip-filters" action="#" method="get">
        ${filtersTemplate}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }
}
