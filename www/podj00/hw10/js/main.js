let transformers = ['Bumblebee', 'Megatron', 'Optimus', 'Jazz', 'Crosshairs', 'Hound', 'Grimlock', 'Starscream', 'Ratchet', 'Warpath'];
transformers = transformers.concat(transformers);
transformers.sort(() => { return 0.5 - Math.random(); });

const playground = document.querySelector('#game');
const points = document.querySelector('#points');

let turnedCards = []; //karty, které jsou zrovna otečeny
let endPoints = 0; //když 20 (10x2), tak výhra

const playGame = (t) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = t.toUpperCase();
    playground.appendChild(card);

    card.addEventListener('click', () => {

        //už jsou otočeny 2 karty
        if (turnedCards.length == 2) {
            return false;
        }
        //už je otočena
        if (card.classList.contains('turned')) {
            return false;
        }
        card.classList.add('turned')
        turnedCards.push(card);

        if (turnedCards.length > 1 && (turnedCards[0].innerText === turnedCards[1].innerText)) {
            points.innerText++;
            endPoints += 2;
            if (endPoints === 20) {
                setTimeout(function () {
                    alert('You won the game but what about real life?');
                }, 500)
            }
            turnedCards = [];

        } else if (turnedCards.length > 1) {
            if (points.innerText > 0) {
                points.innerText--;
            }
            setTimeout(function () {
                turnedCards[0].classList.remove('turned');
                turnedCards[1].classList.remove('turned');
                turnedCards = [];
            }, 1000)
        }
    })


}

//začátek hry
transformers.forEach(t => playGame(t));