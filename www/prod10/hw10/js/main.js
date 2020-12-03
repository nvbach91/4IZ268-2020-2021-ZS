/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

var cities = ['prague', 'madrid', 'helsinki', 'hanoi', 'peking', 'havana', 'moscow', 'hamburg', 'paris', 'ottawa'];
cities = cities.concat(cities);
cities.sort(() => {
    return 0.5 - Math.random();
});

var points = 0;
var first = null;
var second = null;
var cardsRevealed = 0;


var field = document.querySelector('#game-field');


var pointsText = document.querySelector('#points');

var turnCard = function(card) {
    card.addEventListener('click', function() {

        if (card.classList.contains('revealed')) {
            return false;
        }

        if (first && second) {
            return false;
        }

        card.classList.add('revealed');

        if (!first) {
            first = card;
            return false;
        }

        second = card;

        if (first.classList[0] == second.classList[0]) {
            points++;
            first = null;
            second = null;
            cardsRevealed += 2;
            if (cardsRevealed == cities.length) {
                setTimeout(function() {
                    alert('Congratulations! You have earned ' + points + ' points');
                }, 2000);
            }

        } else {
            points--;
            if (points < 0) {
                points = 0;
            }

            setTimeout(function() {
                first.classList.remove('revealed');
                second.classList.remove('revealed');
                first = null;
                second = null;
            }, 1000);
        }

        pointsText.innerText = points;
    });
};

var createCard = function(name) {
    var newCard = document.createElement('div');
    newCard.classList.add(name);
    newCard.classList.add('card');
    turnCard(newCard);
    field.appendChild(newCard);
};

cities.forEach(function(city) {
    createCard(city);
});