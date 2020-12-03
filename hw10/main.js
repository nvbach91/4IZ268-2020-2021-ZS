var score = 0;
document.getElementById("points").innerHTML  = score;

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//hlavní funkce
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkMatch();
}

//Kontrolování karet
function checkMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disable();
  } else {
    unflip();
  }

};
//správný match
function disable() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  score += 1;
  document.getElementById("points").innerHTML  = score;
}
// špatný match
function unflip() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockBoard = false;
  }, 1000);
  score -= score ? 1 : 0;
  document.getElementById("points").innerHTML  = score;
}

(function sort() {
  cards.forEach(card =>{
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  });
})();
cards.forEach(card => card.addEventListener('click', flipCard));