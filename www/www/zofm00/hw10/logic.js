const game = document.querySelector('#game');
const result = document.querySelector('#points');

let dog = ['Rotvajler', 'Ovčák', 'Kolie', 'Čivava', 'Jezevčík', 'Labrador',
    'Kavkaz', 'Malamut', 'Pitbul', 'Terier'];
dog = dog.concat(dog);
dog.sort(function () { return 0.5 - Math.random(); });

let firstCard, secondCard;
let resultNo = 0;
let openedCards = 0;
let hasFlippedCard = false;

var gamePlay = function (card) {
    card.addEventListener('click', function () {
        if (card.classList.contains('turned')) {
            return false;
        }
        if (firstCard && secondCard)
            return false;

        card.classList.add('turned');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;

            if (firstCard.innerText == secondCard.innerText) {
                resultNo++;
                openedCards += 2;
                firstCard = null;
                secondCard = null;
                if (openedCards == dog.length) {
                    setTimeout(function () {
                        alert('Vítězství! Dosažené skóre: ' + resultNo)
                    }, 100);
                }
            } else {
                resultNo--;
                if (resultNo < 0) {
                    resultNo = 0
                }

                setTimeout(function () {
                    firstCard.classList.remove('turned');
                    secondCard.classList.remove('turned');
                    firstCard = null;
                    secondCard = null;

                }, 1000);
            }
        }
        result.innerText = resultNo;
    });
};

var createCard = function (name) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    game.appendChild(card);

    gamePlay(card);
}

for (let i = 0; i < dog.length; i++) {
    createCard(dog[i]);
}


