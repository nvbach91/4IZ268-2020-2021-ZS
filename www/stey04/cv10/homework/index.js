let score = 0;
let selectionAllowed = true;

const createCard = (name) => {
    let card = document.createElement('div');
    card.classList.add('card');

    const selectCard = (name) => {
        return () => {
            if (selectionAllowed) {
                card.classList.add('selected');
                card.innerText = name;
                flip(card);
            }
        }
    };

    card.addEventListener('click', selectCard(name));
    return card;
}

const flipCard = (card) => {
    card.innerText = '';
    card.classList.remove('selected');
    selectionAllowed = true;
}

let flip = (() => {
    let check = function doubleCheck(c1) {
        function second(c2) {
            if (c1 == c2) return second;
            selectionAllowed = false;
            match(c1, c2)
            return doubleCheck;
        }
        return second;
    }
    let curry = (card) => {
        check = check(card);
    }
    return curry;
})();

function match(c1, c2) {
    if (c1.innerText == c2.innerText) {
        score += 1;
        selectionAllowed = true;
    } else {
        score <= 0 ? score = 0 : score -= 1;
        setTimeout(() => (flipCard(c1), flipCard(c2)), 1500);
    }
    updateScore(score);
}

let s = document.querySelector('h2');
function updateScore(score) {
    s.innerText = 'Score: ' + score;
}

const cardsContainer = document.querySelector('.cards_container');

const scramble = (l) => {
    return l.concat(l).sort(() => { return 0.5 - Math.random(); });
}

(() => {
    let emojis = [
        String.fromCodePoint(0x1F639),  // 😹
        String.fromCodePoint(0x1F385),  // 🎅
        String.fromCodePoint(0x1F606),  // 😆
        String.fromCodePoint(0x1F601),  // 😁
        String.fromCodePoint(0x1F4A9),  // 💩
        String.fromCodePoint(0x1F649),  // 🙉
        String.fromCodePoint(0x1F602),  // 😂
        String.fromCodePoint(0x1F921),  // 🤡
        String.fromCodePoint(0x1F479),  // 👹
        String.fromCodePoint(0x1F61D),  // 😝
    ]
    let c = scramble(emojis);
    let cards = [];
    for (let i = 0, l = c.length; i < l; i++) {
        cards.push(createCard(c[i]));
    }
    cardsContainer.append(...cards);
})()

