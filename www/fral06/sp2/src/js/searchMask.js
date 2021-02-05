import Autocomplete from "./autocomplete";
import Utilities from "./utilities";


export default class SearchMask {

  constructor(hookId) {
    this.hookId = hookId;
    this.init();
  }

  init() {
    this.outbound = new Autocomplete('outbound', 'Odkud', 'Odlet');
    this.inbound = new Autocomplete('inbound', 'Kam', 'Přílet');

    this.dateFrom = Utilities.createFormGroup('date', ['form__control', 'form__control__input'], 'dateFrom', ['form__control'], 'Odlet');
    this.dateFromElm = this.dateFrom.querySelector('#dateFrom');
    this.dateFromElm.placeholder = 'rrrr-mm-dd';

    this.dateTo = Utilities.createFormGroup('date', ['form__control', 'form__control__input'], 'dateTo', ['form__control'], 'Přílet');
    this.dateToElm = this.dateTo.querySelector('#dateTo');
    this.dateToElm.placeholder = 'rrrr-mm-dd';

    this.button = Utilities.createElement('button', ['form__button', 'btn'], 'searchBtn', 'Vyhledat lety');
    this.button.addEventListener('click', this.handleClick.bind(this));

    this.render();
  }

  setResultsHandler(handler) {
    this.resultsHandler = handler;
  }

  departureLocationHandler(location) {
    this.outbound.setValue(location);
  }

  arrivalLocationHandler(location) {
    this.inbound.setValue(location);
  }


  handleClick(e) {
    console.log(this.dateFromElm.value, this.dateToElm.value);
    e.preventDefault();
    const outboundValue = this.outbound.getValue();
    const inboundValue = this.inbound.getValue();
    const dateFromValue = new Date(this.dateFromElm.value);
    const dateToValue = new Date(this.dateToElm.value);
    if (outboundValue && inboundValue && this.validateDates(dateFromValue, dateToValue)) {
      this.resultsHandler(
        outboundValue,
        inboundValue,
        this.getFormamatedDate(dateFromValue),
        this.getFormamatedDate(dateToValue)
      );
    }
  }

  getFormamatedDate(date) {
    return `${date.getFullYear()}-${this.appendLeadingZeroes(date.getMonth() + 1)}-${this.appendLeadingZeroes(date.getDate())}`;
  }

  appendLeadingZeroes(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
  }

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  validateDates(dateFrom, dateTo) {
    if (!this.isValidDate(dateFrom) || !this.isValidDate(dateTo)) {
      return false;
    }

    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(0, 0, 0, 0);
    const today = new Date()
    today.setHours(0, 0, 0, 0);

    if (dateFrom < today) {
      this.dateFromElm.classList.add('form__control__input--invalid');
      return false;
    } else {
      this.dateFromElm.classList.remove('form__control__input--invalid');
    }

    if (dateTo < dateFrom) {
      this.dateToElm.classList.add('form__control__input--invalid');
      return false;
    } else {
      this.dateToElm.classList.remove('form__control__input--invalid');
    }
    return true;
  }

  render() {
    const searchMaskElm = Utilities.createElement('div', ['search-mask']);
    const formElm = Utilities.createElement('form', ['form']);
    searchMaskElm.append(formElm);
    formElm.append(this.outbound.render(), this.inbound.render(), this.dateFrom, this.dateTo, this.button);
    document.querySelector(`#${this.hookId}`).append(searchMaskElm);
  }

}
