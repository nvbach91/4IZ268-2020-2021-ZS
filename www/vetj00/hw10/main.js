let firstOpenedCard = null;
let secondOpenedCard = null;
let points = 0;
let cardsRevealed = 0;

const body = document.querySelector('body');
const pointsArea = document.querySelector('#points-container');

const pexesoCardsArea = document.createElement('div');
pexesoCardsArea.classList.add('pexeso-cards');

const pointsContainer = document.createElement('p');
pointsContainer.classList.add('points');

pointsArea.appendChild(pointsContainer);
body.appendChild(pexesoCardsArea);

const pexesoCard = document.createElement('div');
pexesoCard.classList.add('pexeso-card');

const createCard = (cityNameValue) => {

    const pexesoCard = document.createElement('div');
    pexesoCard.classList.add('pexeso-card');
    pexesoCard.setAttribute('type', 'submit');

    /*const cityName = document.createElement('p');
    cityName.classList.add('city-name');
    cityName.innerText = cityNameValue;
    pexesoCard.appendChild(cityName);*/

    return pexesoCard;
};


let cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', 'Prague', 'Copenhagen', 'Moscau', 'Athens', 'Rome', 'London'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

const newCards = [];
for (let i = 0; i < cities.length; i++) {
    let cityNameValue = cities[i];
    const newCard = createCard(cityNameValue);
    newCard.innerText = cityNameValue;
    newCard.addEventListener("click", bindClick(i));
    newCards.push(newCard);
};

pexesoCardsArea.append(...newCards);


function bindClick(i) {
    return function turnCard() {
        if (firstOpenedCard && secondOpenedCard) {
            return false;
        }

        turnedCard = newCards[i];
        turnedCard.classList.add('turned-card');

        if (!firstOpenedCard) {
            firstOpenedCard = turnedCard;
            return console.log(firstOpenedCard);
        }
        secondOpenedCard = turnedCard;

        if (firstOpenedCard.innerText === secondOpenedCard.innerText) {
            points++;
            firstOpenedCard = null;
            secondOpenedCard = null;
            cardsRevealed += 2;
            if (cardsRevealed === cities.length) {
                alert('Celkový počet bodů: ' + points);
            }
        } else {
            if (!points <= 0) {
                points--;
            }
            setTimeout(function() {
                firstOpenedCard.classList.remove('turned-card');
                secondOpenedCard.classList.remove('turned-card');
                firstOpenedCard = null;
                secondOpenedCard = null;
            }, 1000);
        }
        pointsContainer.innerText = points;
    };
};