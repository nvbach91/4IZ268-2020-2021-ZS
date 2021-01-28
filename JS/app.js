$(document).ready(function(){

  const button = document.querySelector(".container button");

  
  const jokeDiv = document.querySelector(".container .joke p");

  document.addEventListener("DOMContentLoaded", getJoke);

  button.addEventListener("click", getJoke);


  async function getJoke() {
    const jokeData = await fetch("https://v2.jokeapi.dev/joke/Any?type=single", {
      headers: {
        Accept: "application/json"
      }
    });
    const jokeObj = await jokeData.json();
    jokeDiv.innerHTML = jokeObj.joke;
    localStorage.setItem("id", jokeObj.joke);
    console.log(jokeObj); 
    console.log(jokeData); 

      $("#load").click(function(){
        $('.jokeL p').text(localStorage.getItem("id")).value;
      });
    }
});