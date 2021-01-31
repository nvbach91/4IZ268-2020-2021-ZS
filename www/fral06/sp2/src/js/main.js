require("babel-core/register");
require("babel-polyfill");
import Autocomplete from './autocomplete';
import SearchResults from './searchResults';

class App {
  constructor() {
    this.init();
    this.search = new SearchResults('searchResults');
  }

  init() {
    this.outbound = new Autocomplete(document.querySelector('#outbound'));
    this.inbound = new Autocomplete(document.querySelector('#inbound'));

    this.dateFromElm = document.querySelector('#dateFrom');
    this.dateToElm = document.querySelector('#dateTo');
    this.searchBtnElm = document.querySelector('#searchBtn');
    this.searchBtnElm.addEventListener('click', this.handleSearchBtn.bind(this));
  }

  handleSearchBtn() {
    const dateFrom = new Date(this.dateFromElm.value);
    dateFrom.setHours(0, 0, 0, 0);
    const dateTo = new Date(this.dateToElm.value);
    dateTo.setHours(0, 0, 0, 0);
    const today = new Date()
    today.setHours(0, 0, 0, 0);

    if (this.outbound.getValue() != null && this.inbound.getValue() != null) {
      if (dateFrom < today) {
        this.dateFromElm.classList.add('form__control__input--invalid');
        return;
      } else {
        this.dateFromElm.classList.remove('form__control__input--invalid');
      }

      if (dateTo < dateFrom) {
        this.dateToElm.classList.add('form__control__input--invalid');
        return;
      } else {
        this.dateToElm.classList.remove('form__control__input--invalid');
      }
      const dateFromFormmated = `${dateFrom.getFullYear()}-${this.appendLeadingZeroes(dateFrom.getMonth() + 1)}-${this.appendLeadingZeroes(dateFrom.getDate())}`;
      const dateToFormmated = `${dateTo.getFullYear()}-${this.appendLeadingZeroes(dateTo.getMonth() + 1)}-${this.appendLeadingZeroes(dateTo.getDate())}`;
      console.log(this.outbound.getValue(), this.inbound.getValue(), dateFromFormmated, dateToFormmated);

      // this.search.getResults('JFK-sky', 'LAX-sky', '2021-03-02', '2021-03-05');
      this.search.getResults(this.outbound.getValue(), this.inbound.getValue(), dateFromFormmated, dateToFormmated);
    }
  }

  appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

}

new App();
