const game = document.querySelector('#game');
const result = document.querySelector('#points');

let dogs = ['Rotvajler', 'Ovčák', 'Kolie', 'Čivava', 'Jezevčík', 'Labrador',
    'Kavkaz', 'Malamut', 'Pitbul', 'Terier'];
dogs = dogs.concat(dogs);
dogs.sort(function () { return 0.5 - Math.random(); });

let firstCard, secondCard;
let nResult = 0;
let nOpenedCards = 0;
let isTurned= false;

const bindCard = function (card) {
    card.addEventListener('click', function () {
        if (card.classList.contains('turned')) {
            return false;
        }
        if (firstCard && secondCard)
            return false;

        card.classList.add('turned');

        if (!isTurned) {
            isTurned = true;
            firstCard = this;
        } else {
            isTurned = false;
            secondCard = this;

            if (firstCard.innerText == secondCard.innerText) {
                resultNo++;
                nOpenedCards += 2;
                firstCard = null;
                secondCard = null;
                if (nOpenedCards === dogs.length) {
                    setTimeout(() => {
                        alert('Vítězství! Dosažené skóre: ' + nResult)
                    }, 100);
                }
            } else {
                nResult--;
                if (nResult < 0) {
                    nResult = 0
                }

                setTimeout(function () {
                    firstCard.classList.remove('turned');
                    secondCard.classList.remove('turned');
                    firstCard = null;
                    secondCard = null;

                }, 1000);
            }
        }
        result.innerText = nResult;
    });
};

const createCard = function (name) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = name;
    game.appendChild(card);

    bindCard(card);
}

for (let i = 0; i < dogs.length; i++) {
    createCard(dog[i]);
}


