$(document).ready(function () {
  const nbaNameForm = document.querySelector('#nba-name-form');
  const formInput = document.querySelector('#nba-name-form [name="nba-name-input"]');
  const nameResult = document.querySelector('#name-result');
  const key = "5947a85077b14e01acc01571f99a7120";
  const urlAPI = "https://api.sportsdata.io/v3/nba/scores/json/Players?key=";

  let nameInput = new URLSearchParams(window.location.search).get("nba-name-input")
  if (nameInput) {
    $.getJSON(urlAPI + key, function (data) {
      console.log(data);
      let playersResultList = [];
      for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        let buttonWithPlayerInfo;
        if (obj.LastName.toLowerCase().trim() === nameInput.toLowerCase().trim()) {
          buttonWithPlayerInfo = document.createElement("BUTTON");
          buttonWithPlayerInfo.innerHTML = "Full name: " + obj.FirstName + " " + obj.LastName + " - " + obj.Team + " (" + obj.Position + ")";
          nameResult.appendChild(buttonWithPlayerInfo);
          playersResultList.push(buttonWithPlayerInfo);
        }
        let active = false;
        $(buttonWithPlayerInfo).click(function () {
          if (active) {
            return;
          } else {
            active = true;
            for (e = 0; e < playersResultList.length; e++) {
              console.log(playersResultList[e]);
              if (playersResultList[e] != buttonWithPlayerInfo) {
                $(playersResultList[e]).hide();
              }
            }
            $(nameResult).append("<br>");
            $(nameResult).append("<img src=" + obj.PhotoUrl + ">");
            $(nameResult).append("<p>" + obj.FirstName + " " + obj.LastName + " (" + obj.Position + ")" + "</p>");
            $(nameResult).append("<p>" + obj.Team + " - " + obj.Jersey + "</p>");
            $(nameResult).append("<p>" + obj.BirthCountry + "</p>");
            $(nameResult).append("<p>" + "Weight: " + obj.Weight + "</p>");
            $(nameResult).append("<p>" + "Height: " + obj.Height + "</p>");
          }
        });
      }
    }).fail(function () {
      console.log("Something's wrong");
    });
  }
});