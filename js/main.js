// propojení přes id
let gameField = document.querySelector('#game-field');
let score = document.querySelector('#points');

// definování jednotlivých kartiček - zvířata
let animals = ['Lion', 'Panda', 'Fish', 'Snake', 'Turtle', 'Penquin', 'Bear', 'Tiger', 'Kangaroo', 'Monkey', 'Elephant', 'Hippo'];

// duplikování jednotlivých kartiček  
animals = animals.concat(animals);

//zamíchání kartiček
animals.sort(() => {
  return 0.5 - Math.random();
});

// nastavení hracího pole
let firstChosenCard = null;
let secondChosenCard = null;
let playersPoints = 0;
let turnedCards = 0;

// začátek hry - postupné otočení 2 karet
let playingCard = function (card) {
  card.addEventListener('click', function () {
    if (card.classList.contains('turned')) {
      return false;
    }
    if (firstChosenCard && secondChosenCard) {
      return false;
    }
    card.classList.add('turned');
    if (!firstChosenCard) {
      firstChosenCard = card;
      return false;
    }
    secondChosenCard = card;

    // karty jsou otočené - jsou stejné nebo ne?; pokud ano - přičti bod, pokud ne - otoč zpět; vyhodnoť konec hry
    if (firstChosenCard.innerText == secondChosenCard.innerText) {
      playersPoints++;
      turnedCards += 2;
      firstChosenCard = null;
      secondChosenCard = null;
      if (turnedCards == animals.length) {
        if (playersPoints == animals.length / 2) {
          setTimeout(function () {
            alert('Gratuluji! Vaše skóre je ' + playersPoints + ' bodů! A jste master tohoto pexesa!');
          }, 500);
        } else {
          setTimeout(function () {
            alert('Vaše skóre je ' + playersPoints + ' bodů! Pokus se později znovu o lepší výsledek!');
          }, 500);
        }
      }
      // karty nejsou stejné, odečítám bod; nelze jít do mínusu bodově
    } else {
      playersPoints--;
      if (playersPoints < 0) {
        playersPoints = 0;
      }
      // omezení otočení karet - 1500 milisekund (tj. 1,5 sekundy)
      setTimeout(function () {
        firstChosenCard.classList.remove('turned');
        secondChosenCard.classList.remove('turned');
        firstChosenCard = null;
        secondChosenCard = null;
      }, 1500);
    }
    // nastavení počtu bodů v textu
    playersPoints = score.innerText;
  });
};

// přidání karet pomocí DOM - přidává pouze po jedné, nejsem si jistá, jak to použít pro rovnou zdvojnení - nefunguje mi to znovu pro concat, ani jinými způsoby - stejně tak mi nefungovalo bez zásahu do HTML samotný restart hry bez načtení celé strany znovu
let addCard = function (name) {
  let card = document.createElement('div');
  card.classList.add('card');
  card.innerText = name;
  gameField.appendChild(card);
  playingCard(card);
};

animals.forEach(function (animal) {
  addCard(animal);
  animals.concat(animals);
});
