import ApiService from "./api-service";
import Utilities from "./utilities";

export default class SearchResults {

  constructor(hookId) {
    this.resultsWrapper = Utilities.createElement('div', null, 'searchResults');
    document.getElementById(hookId).append(this.resultsWrapper);
  }

  getResults(outbound, inbound, outDate, inDate) {
    document.getElementById('searchResults').textContent = '';
    this.results = [];
    ApiService.getFlights(outbound, inbound, outDate, inDate).then(r => this.buildResults(r));
  }

  buildResults(results) {
    console.log(results);
    if (results.Routes.length !== 0) {
      this.carriers = new Map();
      this.quotes = new Map();
      this.places = new Map();
      this.buildedResults = new Map();
      this.currency = results.Currencies[0];
      this.minPrice = results.Routes[0].Price;
      this.originPlace = results.Routes[0].OriginId;
      this.destinationPlace = results.Routes[0].DestinationId;
      this.route = results.Routes[0];
      for (const carrier of results.Carriers) {
        this.carriers.set(carrier.CarrierId, carrier.Name);
      }
      for (const quote of results.Quotes) {
        quote.added = false;
        this.quotes.set(quote.QuoteId, quote);
      }
      for (const place of results.Places) {
        this.places.set(place.PlaceId, place);
      }
      this.originPlace = this.places.get(results.Routes[0].OriginId).CityName;
      this.destinationPlace = this.places.get(results.Routes[0].DestinationId).CityName;
      this.results = this.createQuotes(this.route)
    }
    this.render();
  }

  setAddFlightHanlder(handler) {
    this.addFlightHanlder = handler;
  }

  createQuotes(route) {
    const slivers = [];
    for (const quote of route.QuoteIds) {
      const sliverElm = document.createElement('div');
      sliverElm.classList.add('sliver');
      sliverElm.append(this.createFlight(quote), this.createPrice(quote));
      slivers.push(sliverElm);
    }
    return slivers;
  }

  createCarriers(outboundFlight) {
    const carrierElm = Utilities.createElement('div', ['flight__carrier']);
    const carriers = [];
    for (const carrier of outboundFlight.CarrierIds) {
      carriers.push(this.carriers.get(carrier));
    }
    carrierElm.textContent = carriers.join(", ");
    return carrierElm;
  }

  createLegPlace(placeId) {
    const departureElm = Utilities.createElement('div', ['flight__departure']);
    const departureTimeElm = Utilities.createElement('span', ['flight__time'], null, '11:50');
    const departurePlaceElm = Utilities.createElement('span', ['flight__place']);
    departurePlaceElm.textContent = this.places.get(placeId).IataCode;
    departureElm.append(departureTimeElm, departurePlaceElm);
    return departureElm;
  }

  createInfo(direct) {
    const infoElm = Utilities.createElement('div', ['flight__info']);
    const connectionElm = Utilities.createElement('div', ['flight__connection']);
    connectionElm.textContent = direct ? 'Přímý let' : 'Let s přestupem';
    infoElm.append(connectionElm);
    return infoElm
  }

  createLeg(leg, direct) {
    const outboundElm = Utilities.createElement('div', ['flight']);
    //carriers
    const carrierElm = this.createCarriers(leg);
    // flight__departure
    const departureElm = this.createLegPlace(leg.OriginId);
    // flight__info
    const infoElm = this.createInfo(direct);
    // flight__arrival
    const arivalElm = this.createLegPlace(leg.DestinationId);

    outboundElm.append(carrierElm, departureElm, infoElm, arivalElm);

    return outboundElm;
  }

  createFlight(quoteId) {
    const quote = this.quotes.get(quoteId);
    const flight = {
      direct: quote.Direct,
      originPlace: this.originPlace,
      destinationPlace: this.destinationPlace,
      price: quote.MinPrice,
      currency: this.currency.Symbol,
      departureDate: quote.OutboundLeg.DepartureDate,
      arrivalDate: quote.InboundLeg.DepartureDate,
      id: quoteId,
      created: quote.QuoteDateTime
    }
    this.buildedResults.set(flight.id, flight);
    const flightLegsElm = Utilities.createElement('div', ['legs']);
    //Outbound Leg
    const outboundElm = this.createLeg(quote.OutboundLeg, quote.Direct);
    flightLegsElm.append(outboundElm);
    //Inbound Flight
    const inboundFlight = quote.InboundLeg;
    if (inboundFlight) {
      const inboundElm = this.createLeg(inboundFlight, quote.Direct);
      flightLegsElm.append(inboundElm);
    }
    return flightLegsElm;
  }

  createPrice(quoteId) {
    const quote = this.quotes.get(quoteId)
    const priceElm = document.createElement('div');
    priceElm.classList.add('price');
    const priceValueElm = document.createElement('div');
    priceValueElm.classList.add('price__value');
    priceValueElm.textContent = `${quote.MinPrice} ${this.currency.Symbol}`;

    const buttonElm = document.createElement('button');
    buttonElm.addEventListener('click', this.handleAddFlight.bind(this, quoteId));
    buttonElm.textContent = 'Vybrat';
    buttonElm.classList.add('btn-success', 'btn');

    priceElm.append(priceValueElm, buttonElm);
    return priceElm;
  }

  handleAddFlight(quoteId, event) {
    if (!event.target.classList.contains('btn-info')) {
      if (this.addFlightHanlder(this.buildedResults.get(quoteId))) {
        event.target.classList.add('btn-info');
        event.target.textContent = 'Přidáno';
      } else {
        event.target.classList.add('btn-warning');
        event.target.textContent = 'Již přidáno';
      }
    }
  }

  createHeader() {
    const headerElm = document.createElement('h2');
    headerElm.textContent =
      `Výsledky pro let z ${this.originPlace} do ${this.destinationPlace}. Cena od ${this.minPrice} ${this.currency.Symbol}`;
    return headerElm;
  }

  render() {
    if (this.results.length == 0) {
      const infoText = Utilities.createElement('div', ['no-results'], null, 'Žádné výsledky pro dané datum');
      this.resultsWrapper.append(infoText)
      return;
    }
    this.resultsWrapper.append(this.createHeader(), ...this.results);
  }
}
