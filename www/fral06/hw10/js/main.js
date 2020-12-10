/**
 * Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs
 */
const createCard = (team, id, tag, cssClasses) => {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
        rootElement.className = cssClasses;
    }
    rootElement.addEventListener('click', turnCard.bind());
    rootElement.innerText = team;
    rootElement.dataset.team = id;
    return rootElement;
};

const turnCard = (target) => {
    const card = target.target;
    if (flippedCards >= 2 || card.classList.contains(flippedCardClass)) {
        return;
    }
    card.classList.add(flippedCardClass);
    flippedCards++;

    if (flippedCards === 1) {
        firstCard = card;
    } else {
        secondCard = card;
        validate();
    }
}

const validate = () => {
    if (firstCard.dataset.team && firstCard.dataset.team === secondCard.dataset.team) {
        points++;
        firstCard.removeEventListener('click', turnCard);
        secondCard.removeEventListener('click', turnCard);
        pointsElement.innerText = points;
        endRound()
    } else {
        setTimeout(() => {
            firstCard.classList.remove(flippedCardClass);
            secondCard.classList.remove(flippedCardClass);
            endRound()
        }, 2000)
    }
}

const endRound = () => {
    flippedCards = 0;
    firstCard = null;
    secondCard = null
}

const pointsElement = document.querySelector('#points');
const gameID = '#game-field';
const cardClasses = 'card';
const flippedCardClass = 'clicked'
let teams = [
    {team: 'Borussia Dortmund', id: 'bvb'},
    {team: 'Lazio Rome', id: 'laz'},
    {team: 'FC Zenit', id: 'zen'},
    {team: 'FC Internazionale Milano', id: 'int'},
    {team: 'Juventus', id: 'juv'},
    {team: 'RB Leipzig', id: 'rbl'},
    {team: 'FC Bayern München', id: 'fcb'},
    {team: 'Chelsea FC', id: 'che'},
    {team: 'Liverpool FC', id: 'liv'},
    {team: 'Manchester City FC', id: 'mnc'},
    {team: 'Manchester United FC', id: 'mnu'},
    {team: 'Atlético de Madrid', id: 'amd'},
    {team: 'Real Madrid CF', id: 'rmd'},
    {team: 'FC Barcelona', id: 'bar'},
    {team: 'Paris Saint-Germain', id: "psg"}
    ];

let firstCard;
let secondCard;
let flippedCards = 0;
let points = 0;

teams = teams.concat(teams);


teams.sort(() => {
    return 0.5 - Math.random();
});

const init = () => {
    const cards = [];
    for (const teamItem of teams) {
        cards.push(createCard(teamItem.team, teamItem.id,'div', cardClasses));
    }
    document.querySelector(gameID).append(...cards);
};


init();