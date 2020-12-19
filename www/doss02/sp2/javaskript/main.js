var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thedogapi.com/v1/breeds/search",
    "method": "GET",
    "headers": {
      "x-api-key": "96342e8b-c9e8-426b-8a2c-173fecd7041c"
    }
}


const inputName = document.querySelector('#input_name');
const breedSearchForm = document.querySelector('#breed-search-form')
const addButton = document.querySelector('#add-button')