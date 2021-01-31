import ApiService from "./api-service";

export default class SearchResults {

  constructor(hookId) {
    this.hookId = hookId;
    this.results = [];
  }

  getResults(outbound, inbound, outDate, inDate) {
    document.getElementById(this.hookId).textContent = '';
    this.results = [];
    ApiService.getFlights(outbound, inbound, outDate, inDate).then(r => this.buildResults(r));
  }

  buildResults(results) {
    console.log(results);
    if(results.Routes.length !== 0)  {
      this.carriers = new Map();
      this.quotes = new Map();
      this.places = new Map();
      this.currency = results.Currencies[0];
      this.minPrice = results.Routes[0].Price;
      this.originPlace = results.Routes[0].OriginId;
      this.destinationPlace = results.Routes[0].DestinationId;
      this.route = results.Routes[0];
      for (const carrier of results.Carriers) {
        this.carriers.set(carrier.CarrierId, carrier.Name);
      }
      for (const quote of results.Quotes) {
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

  createFlight(quoteId) {
    const quote = this.quotes.get(quoteId);

    const flightLegsElm = document.createElement('div');
    flightLegsElm.classList.add('legs');

    //Outbound Flight
    const outboundFlight = quote.OutboundLeg;
    const outboundElm = document.createElement('div');
    outboundElm.classList.add('flight');

    //carriers
    const carrierElm = document.createElement('div');
    carrierElm.classList.add('flight__carrier');
    const carriers = [];
    for (const carrier of outboundFlight.CarrierIds) {
      carriers.push(this.carriers.get(carrier));
    }
    carrierElm.textContent = carriers.join(", ");

    // flight__departure
    const departureElm = document.createElement('div');
    departureElm.classList.add('flight__departure');
    const departureTimeElm = document.createElement('span');
    departureTimeElm.classList.add('flight__time');
    departureTimeElm.textContent = '11:50' // fake values, API doesn't provide this data
    const departurePlaceElm = document.createElement('span');
    departurePlaceElm.classList.add('flight__place');
    departurePlaceElm.textContent = this.places.get(outboundFlight.OriginId).IataCode;
    departureElm.append(departureTimeElm, departurePlaceElm);

    // flight__info
    const infoElm = document.createElement('div');
    infoElm.classList.add('flight__info');
    const connectionElm = document.createElement('div');
    connectionElm.classList.add('flight__connection');
    connectionElm.textContent = quote.Direct ? 'Přímý let' : 'Let s přestupem';
    infoElm.append(connectionElm);

    // flight__arival
    const arivalElm = document.createElement('div');
    arivalElm.classList.add('flight__departure');
    const arivalTimeElm = document.createElement('span');
    arivalTimeElm.classList.add('flight__time');
    arivalTimeElm.textContent = '11:50' // fake values, API doesn't provide this data
    const arivalPlaceElm = document.createElement('span');
    arivalPlaceElm.classList.add('flight__place');
    arivalPlaceElm.textContent = this.places.get(outboundFlight.OriginId).IataCode;
    arivalElm.append(arivalTimeElm, arivalPlaceElm);

    outboundElm.append(carrierElm, departureElm, infoElm, arivalElm);
    flightLegsElm.append(outboundElm);

    //Inbound Flight
    const inboundFlight = quote.InboundLeg;
    if (inboundFlight) {
      const inboundElm = document.createElement('div');
      inboundElm.classList.add('flight');

      //carriers
      const carrierElm = document.createElement('div');
      carrierElm.classList.add('flight__carrier');
      const carriers = [];
      for (const carrier of inboundFlight.CarrierIds) {
        carriers.push(this.carriers.get(carrier));
      }
      carrierElm.textContent = carriers.join(", ");

      // flight__departure
      const departureElm = document.createElement('div');
      departureElm.classList.add('flight__departure');
      const timeElm = document.createElement('span');
      timeElm.classList.add('flight__time');
      timeElm.textContent = '11:50' // fake values, API doesn't provide this data
      const placeElm = document.createElement('span');
      placeElm.classList.add('flight__place');
      placeElm.textContent = this.places.get(inboundFlight.OriginId).IataCode;
      departureElm.append(timeElm, placeElm);

      // flight__info
      const infoElm = document.createElement('div');
      infoElm.classList.add('flight__info');
      const connectionElm = document.createElement('div');
      connectionElm.classList.add('flight__connection');
      connectionElm.textContent = quote.Direct ? 'Přímý let' : 'Let s přestupem';
      infoElm.append(connectionElm);

      // flight__arival
      const arivalElm = document.createElement('div');
      arivalElm.classList.add('flight__departure');
      const arivalTimeElm = document.createElement('span');
      arivalTimeElm.classList.add('flight__time');
      arivalTimeElm.textContent = '11:50' // fake values, API doesn't provide this data
      const arivalPlaceElm = document.createElement('span');
      arivalPlaceElm.classList.add('flight__place');
      arivalPlaceElm.textContent = this.places.get(inboundFlight.OriginId).IataCode;
      arivalElm.append(arivalTimeElm, arivalPlaceElm);

      inboundElm.append(carrierElm, departureElm, infoElm, arivalElm);
      flightLegsElm.append(inboundElm);
    }
    return flightLegsElm;
  }

  createPrice(quoteId) {
    const priceElm = document.createElement('div');
    priceElm.classList.add('price');
    const priceValueElm = document.createElement('div');
    priceValueElm.classList.add('price__value');
    priceValueElm.textContent = `${this.quotes.get(quoteId).MinPrice} ${this.currency.Symbol}`;

    const buttonElm = document.createElement('button');
    buttonElm.addEventListener('click', this.handleAddFlight.bind(this));
    buttonElm.textContent = 'Vybrat';
    buttonElm.classList.add('price__btn', 'btn');

    priceElm.append(priceValueElm, buttonElm);
    return priceElm;
  }

  handleAddFlight() {
    let storedFlights = JSON.parse(localStorage.getItem("flights"));
    if(storedFlights == null) {
      storedFlights = [];
    }
    storedFlights.push(
      {"originPlace": this.originPlace, "destinationPlace": this.destinationPlace, "price": this.minPrice})
    localStorage.setItem("flights", JSON.stringify(storedFlights));
  }

  createHeader() {
    const headerElm = document.createElement('h2');
    headerElm.textContent =
      `Výsledky pro let z ${this.originPlace} do ${this.destinationPlace}. Cena od ${this.minPrice} ${this.currency.Symbol}`;
    return headerElm;
  }

  render() {
    if(this.results.length == 0) {
      document.getElementById(this.hookId).textContent = 'Zadne vysledky pro dane datum';
      return ;
    }
    document.getElementById(this.hookId).append(this.createHeader(), ...this.results);
  }
}
