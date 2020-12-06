/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */
const gameField = document.querySelector('#game-field');
const scoreText = document.querySelector('#points');
let numberOfRevealedCards = 0;
let revealedCards = [];
let score = 0;
let progress = 0;

//vytvoří pole s městy a zamíchá ho
let cities = ['Prague', 'Bratislava', 'Berlin', 'Vienna', 'Warsaw', 'Budapest', 'Madrid', 'Rome', 'Paris', 'London'];
cities = cities.concat(cities);
const totalCards = cities.length;

cities.sort(() => {
    return 0.5 - Math.random();
});

//funkce na vytvoření karty
const createCard = (text) => {

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const card = document.createElement('div');
    card.classList.add('card');
    card.addEventListener('click', () => {
        onCardClicked(card);
    });

    const cardText = document.createElement('div');
    cardText.classList.add('card-text');
    cardText.textContent = text;

    cardContainer.appendChild(card);
    card.appendChild(cardText);

    return cardContainer;
};

//funkce, která vytvoří všechny karty
const createAllCards = () => {
    const cardContainers = [];
    for(let i = 0; i < cities.length; i++)
    {
        const newCard = createCard(cities[i]);
        cardContainers.push(newCard);
    }
    gameField.append(...cardContainers);
}

//funkce, která se vyvolá po kliknutí na kartu
const onCardClicked = (card) => {
    if(!card.classList.contains('revealed'))
    {
        if(numberOfRevealedCards < 2)
        {
            card.classList.add('revealed');
            const child = card.querySelector('.card-text');
            child.classList.add('revealed');
            revealedCards.push(card);
            numberOfRevealedCards++;
            if(numberOfRevealedCards == 2)
            {
                if(revealedCards[0].textContent == revealedCards[1].textContent) //obě otočené karty se rovnají
                {
                    revealedCards = [];
                    numberOfRevealedCards = 0;
                    giveScore(1);
                    progress += 2;
                    if(progress == totalCards)
                    {
                        setTimeout(showGameOverMessage, 1);
                    }
                }
                else
                {
                    giveScore(-1);
                    setTimeout(hideRevealedCards, 1500);
                }
            }
        }
    }
};

//funkce, která skryje odkryté karty (ne všechny, jen pro neúspěšný tah)
const hideRevealedCards = () => {
    for(let i = 0; i < revealedCards.length; i++)
    {
        revealedCards[i].classList.remove('revealed');
        const child = revealedCards[i].querySelector('.card-text');
        child.classList.remove('revealed');
    }
    revealedCards = [];
    numberOfRevealedCards = 0;
};

//funkce, která přičte/odečte score
const giveScore = (scoreChange) => {
    score += scoreChange;
    if(score < 0)
    {
        score = 0;
    }
    scoreText.textContent = score;
};

//funkce, která informuje o konci hry
const showGameOverMessage = () => {
    alert("Game over! Your score: " + score);
};

createAllCards();