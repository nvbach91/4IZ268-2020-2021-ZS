let tales = [];
let rows = [];
let columns = [];
let clicked;
let turnedCards = [];
let lockTale = false;
let timeOut = 1000;
let scoreElement;
let scoreNumber = 0;

scoreElement = document.querySelector('#score');

let values = ['London', 'Paris', 'Prague', 'LA', 'Nairobi', 'Brussels', 'Dublin', 'Kyjiv', 'Bratislava', 'Jablonec'];
values = values.concat(values);
values.sort(() => { return 0.5 - Math.random(); });

let container = document.querySelector('#gameContainer');

const turnCard = (i, j) => {
    if (lockTale == false) {
        tales[5 * i + j].innerText = values[5 * i + j];
        tales[5 * i + j].classList.add('turned');
        if (turnedCards[0] != (5 * i + j)) {
            turnedCards.push(5 * i + j);
        }
        if (turnedCards.length >= 2) {
            lockTale = true;
            setTimeout(() => {

                if (tales[turnedCards[0]].innerText == tales[turnedCards[1]].innerText) {
                    //console.log('Jsme tu. ');
                    scoreNumber++;
                    scoreElement.innerText = 'Skóre: ' + scoreNumber;
                }
                else {
                    tales[turnedCards[0]].innerText = '?';
                    //tales[turnedCards[0]].className = tales[turnedCards[0]].className.replace(tales[turnedCards[0]].classList.value, "");
                    //tales[turnedCards[0]].classList.add('tale');

                    tales[turnedCards[0]].classList.remove('turned');

                    tales[turnedCards[1]].innerText = '?';
                    //tales[turnedCards[1]].className = tales[turnedCards[1]].className.replace(tales[turnedCards[1]].classList.value, "");
                    //tales[turnedCards[1]].classList.add('tale');

                    tales[turnedCards[1]].classList.remove('turned');
                }
                turnedCards = [];
                lockTale = false;
            },
                timeOut
            );
        }
        formatBorders(i, j);
    }

};


const formatBorders = (i, j) => {
    if (i == 0) //první řádek
    {
        tales[5 * i + j].classList.add('top');
    }

    if ((5 * i + j) % 5 === 0) //řada vlevo
    {
        tales[5 * i + j].classList.add('left');
    }

    if ((5 * i + j) % 5 == 4) //řada vpravo
    {
        tales[5 * i + j].classList.add('right');
    }

    if ((5 * i + j) > 14) //řada dole
    {
        tales[5 * i + j].classList.add('bottom');
    }
};

const buildGame = () => {
    for (let i = 0; i < 4; i++) {

        rows[i] = document.createElement('div');
        rows[i].classList.add('row');

        for (let j = 0; j < 5; j++) {
            columns[5 * i + j] = document.createElement('div');
            columns[5 * i + j].classList.add('column');

            tales[5 * i + j] = document.createElement('div');
            tales[5 * i + j].innerText = '?';
            tales[5 * i + j].classList.add('tale');
            tales[5 * i + j].addEventListener('click', () => {
                turnCard(i, j)
            });

            formatBorders(i, j);

            columns[5 * i + j].appendChild(tales[5 * i + j]);
            rows[i].appendChild(columns[5 * i + j]);
        }
    }
};

buildGame();


container.append(...rows);