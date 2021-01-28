var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.thedogapi.com/v1/breeds/search",
  "method": "GET",
  "headers": {
    "x-api-key": "96342e8b-c9e8-426b-8a2c-173fecd7041c"
  }
}

$.ajax(settings).done(function (response) {

  console.log(response);
});


const url = 'https://api.thedogapi.com/v1/breeds/search';
const inputName = document.querySelector('#input_name');
const breedSearchForm = document.querySelector('#breed-search-form')
const searchButton = document.querySelector('#search-button')
const breedSearchable = document.querySelector('#breeds-searchable');
const breedList = document.querySelector('#breed-list');



function breedElement(breeds) {

  return breeds.map((breed) => {

    const ono = `<div class="breeds-information">
      <img class="picture" src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg">
      <h4 id="h4">${breed.name}</h4>
      <p>Temperament: ${breed.temperament}</p>
      <p>Life span: ${breed.life_span}</p>
      <p>Weight: imperial ${breed.weight.imperial}, metric: ${breed.weight.metric}</p>
      <p>Height: imperial: ${breed.height.imperial} , metric ${breed.height.metric}</p>
      <p>Bred for: ${breed.bred_for}</p>
      <p>Breed group: ${breed.breed_group}</p>
      <button  onclick="myFunction(${breed.id})" class="saveButton" breed_id="${breed.id}">Save me</button>
    </div>`;



    return ono;

  })

}

var myBreed = [];
function myFunction(breed_id) {
  var id = breed_id;
  console.log(id);
  var bosta = breedSaved;
  console.log(bosta);


  $.ajax({
    url: "https://api.thedogapi.com/v1/images/search?breed_id=" + id, success: function (result) {

      console.log(result);

      console.log(myBreed);




      myBreed.push(result[0].breeds[0]);
      console.log(myBreed);
      localStorage.setItem('favourite-breeds', JSON.stringify(myBreed));

    }

  });
}

function createrBreedContainer(breeds) {
  const searchingResult = document.createElement('div');
  searchingResult.setAttribute('class', 'searching-result');

  const breedSchema = ` <div class="box-title">
    <h2>Search results:</h2>
    </div>
    <div class="breed">
      ${breedElement(breeds)}
    </div>`;
  searchingResult.innerHTML = breedSchema;

  return searchingResult;


}



function giveSearchBreeds(data) {
  breedSearchable.innerHTML = '';
  const breeds = data;
  const breedBox = createrBreedContainer(breeds);
  breedSearchable.appendChild(breedBox);
  console.log('Data:', data);

}

searchButton.onclick = function (event) {

  event.preventDefault();
  const breedInputValue = inputName.value;
  const searchUrl = url + "?name=" + breedInputValue;

  fetch(searchUrl)
    .then((resp) => resp.json())
    .then(giveSearchBreeds)
    .catch((error) => {
      console.log('Error:', error)
    }
    );
  inputName.value = '';
  console.log(breedInputValue);

}



function breedSaved() {

  return JSON.parse(window.localStorage.getItem("favourite-breeds") || []);



}


function getFavouriteBreed() {
  $("#breed-list").empty();
  var retrievedData = window.localStorage.getItem('favourite-breeds');

  console.log("jsme v getFauvouriteBreed");
  console.log(retrievedData);

  var breed2 = JSON.parse(retrievedData);
  console.log(breed2);



  var output = `<div class="box-title">
      <h2>Favourite:</h2>
      </div>
       `;

  breed2.map((breed) => {


    $(breed).each(function () {
      output += `<div class="favourite">
    <h3> ${breed.name} </h3>
      <img src="https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg"> 
     </div></div>`;

    }

    )
  })
  output += `</div>`;
  $('#breed-list').html(output);




}



