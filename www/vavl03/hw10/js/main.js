/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */

let cities = ['Prague', 'Tokyo', 'Moscow', 'Denver', 'Berlin',
  'Nairobi', 'Rio', 'Helsinki', 'Oslo', 'Madrid'];
cities = cities.concat(cities);
cities.sort(() => {
  return 0.5 - Math.random();
});

const board = document.querySelector('#game-field');
const points = document.querySelector('#points');

let turnedCards = 0;
let pairsGuessed = 0;
const delay = 900;
let currentPoints = 0;
let cardsTurned = [];

let play = (text) => {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerText = text;
  board.appendChild(card);
  card.addEventListener('click', function () {
    if (turnedCards == 2) {
      return false;
    }
    if (card.classList.contains('revealed')) {
      return false;
    }
    if (cardsTurned[0] && cardsTurned[1]) {
      return false;
    }
    card.classList.add('revealed');
    cardsTurned[turnedCards] = this;
    turnedCards++;
    if (turnedCards == 2 && cardsTurned[0].innerText == cardsTurned[1].innerText) {
      points.innerText++;
      turnedCards = 0;
      pairsGuessed += 2;
      cardsTurned[0] = null;
      cardsTurned[1] = null;
      if (pairsGuessed == cities.length) {
        setTimeout(function () {
          alert('Congratulations !!! Your result is: ' + points.innerText + ' points');
        }, delay);
      }
    }
    if ((turnedCards == 2) && (cardsTurned[0].innerText != cardsTurned[1].innerText)) {
      if (points.innerText != 0) {
        points.innerText--;
      }
      turnedCards = 0;
      setTimeout(function () {
        cardsTurned[0].classList.remove('revealed');
        cardsTurned[1].classList.remove('revealed');
        cardsTurned[0] = null;
        cardsTurned[1] = null;
      }, delay)
    }
  });
};

for (let i = 0; i < cities.length; i++) {
  play(cities[i]);
}