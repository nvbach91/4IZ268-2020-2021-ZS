$(document).ready(() => {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.thedogapi.com/v1/breeds/search",
    "method": "GET",
    "headers": {
      "x-api-key": "96342e8b-c9e8-426b-8a2c-173fecd7041c"
    }
  }

  const url = 'https://api.thedogapi.com/v1/';
  const inputName = document.querySelector('#input_name');
  const breedSearchable = document.querySelector('#breeds-searchable');

  const createBreedElement = (data) => {
    return data.map((breed) => {
      const text = `         
        <div class="breed-information" data-breed-id="${breed.id}" >
          <img class="picture" src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg" alt="breed ${breed.name}">
          <h4 id="h4">${breed.name}</h4>
          <p>Temperament: ${breed.temperament}</p>
          <p>Life span: ${breed.life_span}</p>
          <p>Weight: imperial ${breed.weight.imperial}, metric: ${breed.weight.metric}</p>
          <p>Height: imperial: ${breed.height.imperial} , metric ${breed.height.metric}</p>
          <p>Bred for: ${breed.bred_for}</p>
          <p>Breed group: ${breed.breed_group}</p>
          <button  class="saveButton" data-breed-id="${breed.id}">Save me</button>
        </div>`;
      return text;
    })
  }
  var myBreed = [];

  function createrBreedContainer(data) {
    const searchingResult = document.createElement('div');
    searchingResult.setAttribute('id', 'searching-result');
    const breedSchema = `
      <div class="box-title">
        <h2>Search results:</h2>
      </div>
      <div class="breed">
        ${createBreedElement(data)}
      </div> `;
    searchingResult.innerHTML = breedSchema;
    return searchingResult;
  }

  function giveSearchBreeds(data) {
    $("#breeds-searchable").empty();
    const breedBox = createrBreedContainer(data);
    breedSearchable.appendChild(breedBox);
    console.log('Data:', data);

  }

  $('#breed-search-form').on('submit', function (event) {
    event.preventDefault();
    $("#breeds-searchable").html(`
  <div class="spinner-border"></div>`);
    const breedInputValue = inputName.value;
    console.log(breedInputValue);
    const searchUrl = `${url}breeds/search?name=${breedInputValue}`;
    $.ajax({
      url: searchUrl,
      success: function (result) {
        console.log(result);
        giveSearchBreeds(result);
        $(".saveButton").click(function () {
          var saved = $(this).attr("data-breed-id");
          console.log(saved);
          $.ajax({
            url: `${url}images/search?breed_id=${saved}`,
            success: function (result) {
              console.log(result);
              console.log(myBreed);
              var found = false;
              for (var i = 0; i < myBreed.length; i++) {
                if (myBreed[i].id == result[0].breeds[0].id) {
                  found = true;
                  break;
                }
              }
              if (found == false) {
                myBreed.push(result[0].breeds[0]);
                console.log(myBreed);
                localStorage.setItem('favoriteBreeds', JSON.stringify(myBreed));
                getFavouriteBreed();
              }
            }
          })
        })
      }
    })
    inputName.value = '';
    console.log(breedInputValue);
  })

  function getFavouriteBreed() {
    $("#breed-list").empty();
    var retrievedData = window.localStorage.getItem('favoriteBreeds');
    console.log("jsme v getFauvouriteBreed");
    console.log(retrievedData);
    var breed2 = JSON.parse(retrievedData);
    console.log(breed2);
    var output = `
      <div class="box-title">
        <h2>Favourite:</h2>
      </div>`;
    const dogs = [];
    breed2.map((breed) => {
      $(breed).each(function () {
        const dog = $(`
          <div class="favourite">
            <h3> ${breed.name} </h3>
            <img src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg" alt="breed ${breed.name}"> 
            <button data-id="${breed.id}">Remove</button>
          </div>`);
        const removeButton = dog.find("button").click(() => {
          
          const id = removeButton.data("id");
          const favoriteBreeds = JSON.parse(localStorage.getItem("favoriteBreeds"));

          for (let i = 0; i < favoriteBreeds.length; i++) {
            const favoriteBreed =favoriteBreeds[i];
            if (favoriteBreed.id == id) {
              favoriteBreeds.splice(i, 1);
              break;
            }
          }
          localStorage.setItem("favoriteBreeds", JSON.stringify(favoriteBreeds));
          
          dog.remove();
        });
        dogs.push(dog);
      })
    });
    $('#breed-list').append(output).append(dogs);
  }
}) 