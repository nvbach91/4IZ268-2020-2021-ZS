//vytvoření konstant skrz id
let gameField = document.querySelector('#game-field');
let points = document.querySelector('#points');

//definice karet měst, duplikace a náhodné zamíchání
let cities = ['Praha', 'Trutnov', 'Brno', 'Ostrava', 'Plzeň',
    'Liberec', 'Svitavy', 'Opava', 'Nymburk', 'Jaroměř'];
cities = cities.concat(cities);
cities.sort(() => {
    return 0.5 - Math.random();
});


//nastavení hodnot základních proměnných před začátkem hry
let card = null;
let firstCard = null;
let secondCard = null;
let amountOfPoints = 0;
let flippedCards = 0;

//funkce, která po "kliknutí" (akce), přidá hodnotu karty do proměnné firstCard nebo secondCard
let flippingCards = (card) => {
    card.addEventListener('click', function () {
        //ošetření špatných variant - pokud karta již je obrácená vrací false
        if (card.classList.contains('flipped')) {
            return false;
        }
        //pokud již existují proměnné v proměnných firstCard a secondCard vrací false
        if (firstCard && secondCard) {
            return false;
        }
        //pokud projde podmínkami výše, přidá ke kartě 'flipped'
        card.classList.add('flipped');
        //pokud je firstCard stále null, proměnná card je uložená do přeměnné firstCard plus vrátí false
        if (!firstCard) {
            firstCard = card;
            return false;
        }
        //pokud existuje hodnota firstCard zadá card do proměnné secondCard
        secondCard = card;
        //nyní porovnáme hodnoty karet pokud se rovnají texty na kartách
        if (firstCard.innerText === secondCard.innerText) {
            //k počtu bodů se přičtě 1
            amountOfPoints++;
            //flippedCards se přičte 2 a uloží se nový počet otočených karet
            flippedCards += 2;
            //proměnné na kartách se vrátí opět na hodnotu null (obrátí se zpět)
            firstCard = null;
            secondCard = null;
            //pokud počet obrácených karet je rovna počtu karet, vypíše se vítězná hláška
            if (flippedCards === cities.length) {
                setTimeout(function () {
                    alert(`Vaše skóre je ${amountOfPoints}, dobrá práce! Stránku můžete aktualizovat a vyzkoušet znova`);
                }, 500);
            }
        }
        //pokud se dvě otočené karty nerovnají jeden bod se odečte
        else {
            amountOfPoints--;
            //ošetření možnosti - nechcem jít do záporných čísel
            if (amountOfPoints < 0) {
                amountOfPoints = 0;
            }
            //nastvení timeoutu, který po 1 vteřině odebere dodatek flipped z firstCard a secondCard -> otočí obě zpět
            setTimeout(function () {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
        points.innerText = amountOfPoints;
    });
};
//funkce na vytvoření elementu, přidání 'card - div'. Obsah napsaný
//na kartě je název města. Použití těchto karet na herním plánku. Propojení s funkcí výše.
let addCard = (cityName) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerText = cityName;
    gameField.appendChild(card);
    flippingCards(card);
}
//pro každé město v seznamu měst se provedou pokyny níže v kódu.
//pro město na vstupu se vytvoří nová karta, která je vložena do array
//propojení dvou arrayu
let newCards = [];
cities.forEach((city) => {
    const newCard = addCard(city);
    newCards.push(newCard);
    cities.concat(cities);
});
