const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    let index = alphabet.indexOf(c);
    if (index == -1) {
        return c;
    }
    let shiftedChar = index - shift;
    if (shiftedChar > alphabet.length) {
        shiftedChar -= alphabet.length;
    }
    if (shiftedChar < 0) {
        shiftedChar += alphabet.length;
    }
    return alphabet[shiftedChar];
};

const shiftString = (str, shift) => {
    let res = '';
    for (let i = 0; i < str.length; i++) {
        res += shiftChar(str[i], shift);
    }
    return res;
};

const caesarDecipher = (cipherText, usedKey) => {
    let res = '';
    cipherText.split(' ').forEach(s => {
        res += shiftString(s, usedKey) + ' ';
    });
    return res.trimEnd();
};

let btn = document.querySelector('#submit');
let textArea = document.querySelector('#ceasar');
let inp = document.querySelector('#key');
btn.onclick = () => {
    textArea.value = caesarDecipher(textArea.value, inp.value);
}
