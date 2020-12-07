/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
*/
let cities = ['Prague', 'Tokyo', 'Moscow', 'Denver', 'Berlin',
  'Nairobi', 'Rio', 'Helsinki', 'Oslo', 'Madrid'];
cities = cities.concat(cities);
cities.sort(() => { return 0.5 - Math.random(); });

const points = document.querySelector('#points');
const playground = document.querySelector('#game');


const cards = [];
let turnedCards = [];
let endPoints = 0;

const createCard = (t) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerText = t.toUpperCase();

  card.addEventListener('click', () => {

    if (turnedCards.length == 2) {
      return false;
    }
    if (card.classList.contains('turned')) {
      return false;
    }
    card.classList.add('turned')
    turnedCards.push(card);

    if (turnedCards.length > 1 && (turnedCards[0].innerText === turnedCards[1].innerText)) {
      points.innerText++;
      endPoints += 2;
      if (endPoints === 20) {
        setTimeout(() => {
          alert('Congratulations! You won!');
        }, 500)
      }
      turnedCards = [];

    } else if (turnedCards.length > 1) {
      if (points.innerText > 0) {
        points.innerText--;
      }
      setTimeout(() => {
        turnedCards[0].classList.remove('turned');
        turnedCards[1].classList.remove('turned');
        turnedCards = [];
      }, 1000)
    }
  })
  return card;
}
//začátek hry
cities.forEach(t => {
  const card = createCard(t);
  cards.push(card);
});

playground.append(...cards);