const key = "rf9b87o4eRApDPDRfx1LUDg4fFq5kGCr";

//get weather information
const getWeather = async (id) => {

    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};

//get 5 day weather information
const getFiveWeather = async (id) => {

    const base = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};

// get city information
const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};