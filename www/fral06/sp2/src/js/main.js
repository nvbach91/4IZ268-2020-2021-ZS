require("babel-core/register");
require("babel-polyfill");

import SearchMask from "./searchMask";
import SearchResults from './searchResults';
import SavedFlights from "./savedFlights";

class App {
  constructor() {
    this.init();
  }

  init() {
    this.searchMask = new SearchMask('app')
    this.searchResults = new SearchResults('app');
    this.savedFlights = new SavedFlights('app');
    this.searchMask.setResultsHandler(this.searchResults.getResults.bind(this.searchResults));
    this.searchResults.setAddFlightHanlder(this.savedFlights.addFlight.bind(this.savedFlights));
  }
}

new App();
