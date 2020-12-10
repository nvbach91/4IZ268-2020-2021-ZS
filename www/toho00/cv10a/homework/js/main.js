const gameField = document.querySelector('#game-field');
const resultDisplay = document.querySelector('#points');

const createCard = (cityNameValue) => {

    let card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    gameField.appendChild(card);
    game(card);
    return card;
};


//cards - cities
let cities = ['Barcelona', 'Dubai', 'Tokyo', 'Prague', 'Shanghai', 'London', 'Paris', 'Madrid',
    'Berlin', 'Bratislava'
];
cities = cities.concat(cities); //naduplikuju seznam
cities.sort(function() {
    return 0.5 - Math.random();
}); //zamíchaní pořadí

//variables
let firstCard;
let secondCard;
let result = 0;
let openedCards = 0;
let flippedCard = false;



const game = function(card) {
    card.addEventListener('click', function() {
        if (card.classList.contains('revealed')) {
            return false;
        }
        if (firstCard && secondCard)
            return false;

        card.classList.add('revealed');

        if (!flippedCard) {
            flippedCard = true;
            firstCard = this;
        } else {
            flippedCard = false;
            secondCard = this;

            if (firstCard.innerText == secondCard.innerText) {

                firstCard = null;
                secondCard = null;
                result++;
                openedCards += 2;
                if (openedCards === cities.length) {
                    setTimeout(function() {
                        alert('Vítězství dosáhli jste: ' + result + 'bodů!')
                    }, 500);
                }
            } else {
                result--;
                if (result < 0) {
                    result = 0
                }

                setTimeout(function() {

                    firstCard.classList.remove('revealed');
                    secondCard.classList.remove('revealed');
                    firstCard = null;
                    secondCard = null;

                }, 1000);
            }
        }
        resultDisplay.innerText = result;
    });
};
const newCards = [];
for (let i = 0; i < cities.length; i++) {
    let cityNameValue = cities[i];
    const newCard = createCard(cityNameValue);
    newCard.innerText = cityNameValue;
    newCards.push(newCard);
};
gameField.append(...newCards)