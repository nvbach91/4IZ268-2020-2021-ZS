const button = document.querySelector(".container button");
const jokeDiv = document.querySelector(".container .joke p");

document.addEventListener("DOMContentLoaded", getJock);

button.addEventListener("click", getJock);

async function getJock() {
  const jokeData = await fetch("https://sv443.net/jokeapi/v2/joke/Any", {
    headers: {
      Accept: "application/json"
    }
  });
  const jokeObj = await jokeData.json();
  jokeDiv.innerHTML = jokeObj.joke;
  console.log(jokeData);
}