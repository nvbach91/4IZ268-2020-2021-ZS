import Utilities from "./utilities";

export default class SavedFlights {

  constructor(hookId) {
    this.hookId = hookId;
    this.flightsElm = [];
    this.flights = []
    this.init()
  }

  init() {
    this.loadData();
    this.render();
  }

  loadData() {
    this.flights = JSON.parse(localStorage.getItem("saved-flights"));
    if (this.flights != null) {
      for (const flight of this.flights) {
        this.createFlight(flight);
      }
    }
  }

  deleteFromDb(id) {
    this.flights = this.flights.filter((flight, i) => {
      if (flight._id === id) {
        this.flightsElm.splice(i, 1);
        return false;
      }
      return true
    });
    this.renderFlights();
    this.saveData()
  }

  addFlight(flight) {
    if (this.checkFlights(flight)) {
      this.flights.push(flight);
      flight._id = Math.floor(Math.random() * Date.now());
      this.createFlight(flight)
      this.saveData();
      this.renderFlights();
      return true;
    }
    return false
  }

  checkFlights(newflight) {
    for (const flight of this.flights) {
      if (flight.originPlace === newflight.originPlace &&
        flight.destinationPlace == newflight.destinationPlace &&
        flight.price == newflight.price &&
        flight.arrivalDate == newflight.arrivalDate &&
        flight.departureDate == newflight.departureDate) {
        this.modal();
        return false;
      }
      return true;
    }
  }

  modal() {
    Utilities.getModal('flightsModal')
    $('#flightsModal').modal('show');
  }

  saveData() {
    localStorage.setItem("saved-flights", JSON.stringify(this.flights));
  }

  createFlight(flight) {
    console.log(flight)
    const flightElm = Utilities.createElement('div', ['saved-flight'], flight.id);
    const departure = Utilities.createElement('div', ['saved-flight__place'], null,
      `Odkud: ${flight.originPlace}`);
    const fromDate = new Date(flight.departureDate).toLocaleDateString()
    const toDate = new Date(flight.arrivalDate).toLocaleDateString();
    const departDate = Utilities.createElement('div', ['saved-flight__date'], null, fromDate);
    const arrivalDate = Utilities.createElement('div', ['saved-flight__date'], null, toDate);
    const transfer = flight.direct ? 'Přímý let' : 'Let s přestupem';
    const transferElm = Utilities.createElement('div', ['saved-flight__transfer'], null, transfer);
    const arrival = Utilities.createElement('div', ['saved-flight__place'], null, `Kam: ${flight.destinationPlace}`);
    const price = Utilities.createElement('div', ['saved-flight__price'], null, flight.price + flight.currency);
    const deleteBtn = Utilities.createElement('button', ['btn', 'btn-outline-danger'], null, 'Odebrat');
    deleteBtn.addEventListener('click', this.deleteFromDb.bind(this, flight._id));
    flightElm.append(departure, departDate, transferElm, arrival, arrivalDate, price, deleteBtn);
    this.flightsElm.push(flightElm);
  }

  renderFlights() {
    console.log(this.flightsElm)
    this.flightsWrapperElm.textContent = '';
    if (this.flightsElm.length == 0) {
      const infoText = Utilities.createElement('div', ['no-results'], null, 'Žádné uložené lety');
      this.flightsWrapperElm.append(infoText);
    } else {
      this.flightsWrapperElm.append(...this.flightsElm);
    }
  }

  render() {
    const header = Utilities.createElement('h2', '', null, 'Uložené lety');
    this.flightsWrapperElm = Utilities.createElement('div', ['saved-flights']);
    this.renderFlights();
    document.querySelector(`#${this.hookId}`).append(header, this.flightsWrapperElm);
  }

}
