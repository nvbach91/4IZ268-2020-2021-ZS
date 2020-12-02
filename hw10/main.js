const gameField = document.querySelector('#game-field');
const resultDisplay = document.querySelector('#points');


//cards - cities
let cities = ['Barcelona', 'Tokyo', 'Shanghai', 'London', 'Paris', 'Madrid',
    'Toronto', 'Berlin', 'Minsk', 'Prague'];
cities = cities.concat(cities); //naduplikuju seznam
cities.sort(function () {
    return 0.5 - Math.random();
}); //zamíchaní pořadí


//variables
let firstChosenCard, secondChosenCard;
let result = 0;
let openedCards = 0;
let hasFlippedCard = false;


var game = function (card) {
    card.addEventListener('click', function () {
        if (card.classList.contains('revealed')) {
            return false;
        }
        if (firstChosenCard && secondChosenCard)
            return false;

        card.classList.add('revealed');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstChosenCard = this;
        } else {
            hasFlippedCard = false;
            secondChosenCard = this;

            if (firstChosenCard.innerText == secondChosenCard.innerText) {
                result++;
                openedCards += 2;
                firstChosenCard = null;
                secondChosenCard = null;
                if (openedCards == cities.length) {
                    setTimeout(function () {
                        alert('Vyhrál jsi! Tvé dosažené skóre jsou: ' + result + 'body!')
                    }, 100);
                }
            } else {
                result--;
                if (result < 0) {
                    result = 0
                }

                setTimeout(() => {
                    firstChosenCard.classList.remove('revealed');
                    secondChosenCard.classList.remove('revealed');
                    firstChosenCard = null;
                    secondChosenCard = null;

                }, 1000);
            }
        }
        resultDisplay.innerText = result;
    });
};


var createCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    gameField.appendChild(card);
    game(card);
}

for (let i = 0; i < cities.length; i++) {
    createCard(cities[i]);
}



