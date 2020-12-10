var capitals = ['Vienna', 'Baku', 'Sofia', 'Cairo', 'Budapest', 'Monaco', 'Hamburg', 'Paris', 'Madrid', 'Oslo'];
console.log(capitals.length);
capitals = capitals.concat(capitals);

capitals.sort(function() {
    return 0.5 - Math.random();
});


var oneCard = null;
var twoCard = null;
var gPoints = 0;
var nclicks = 0;
var nCardsSelected = 0;

var gameField = document.querySelector('#game-field');
var gPointsContainer = document.querySelector('#points');
var nclicksContainer = document.querySelector('#nclicks');
var remFindContainer = document.querySelector('#remfind');

var gameCore = function(cards) {

    cards.addEventListener('click', function() {

        
        if (cards.classList.contains('selected')) return false;
        
        if (oneCard && twoCard) return false; 

        
        nclicks++;
        
        nclicksContainer.innerText = nclicks;

        
        cards.classList.add('selected');

        
        if (!oneCard) {
            oneCard = cards;
            return false;
        }

        twoCard = cards;

        
        if (oneCard.innerHTML == twoCard.innerHTML) {
            gPoints++; 
            nCardsSelected = nCardsSelected + 2; 
            oneCard = null;
            twoCard = null;

            if (nCardsSelected == capitals.length) {
                confirm("Success! You have finished the game with so many " + gPoints + " game points, while you had: " + nclicks + " clicks.")
            }

            
            rcSel = (capitals.length - nCardsSelected);
            remFindContainer.innerText = rcSel;
            console.log(rcSel); 
            
            if (rcSel <= 20 && rcSel > 14) remFindContainer.classList.add('red');
            if (rcSel <= 14 && rcSel > 6) remFindContainer.classList.add('orange');
            if (rcSel <= 6 && rcSel > 0) remFindContainer.classList.add('green');
        } else {
            
            gPoints = gPoints - 1;

            
            gPoints < 0 ? gPoints = 0 : null;
            
            setTimeout(function() {
                oneCard.classList.remove('selected');
                twoCard.classList.remove('selected');
                oneCard = null;
                twoCard = null;
            }, 1100);
        }

        
        gPointsContainer.innerText = gPoints;

    });
};


let addGameCard = (capital_name) => {
    let cards = document.createElement('div');
    cards.classList.add('card');
    cards.innerHTML = `<img src="img/${capital_name}.png">`;
    gameField.appendChild(cards);
    gameCore(cards); 
};

let newCards = [];
capitals.forEach((capital) => {
    const newCard = addGameCard(capital);
    newCards.push(newCard);
    capitals.concat(capitals);
});