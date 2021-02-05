import Utilities from "./utilities";

export default class ApiService {

  static async getPlaces(place) {
    return fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/CZ/CZK/${Utilities.getLanguage()}/?query=${place}`,
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "88374d4a63msh06c59200924a8bdp1d1073jsn0e53f4b526d5",
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.error(err);
      })
  }


  static async getFlights(outbound, inbound, outboundDate, inboundDate) {
    return fetch(
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/CZ/CZK/${Utilities.getLanguage()}/${outbound}/${inbound}/${outboundDate}/${inboundDate}`,
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "88374d4a63msh06c59200924a8bdp1d1073jsn0e53f4b526d5",
          "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
      })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.error(err);
      });
  }
}
