//                01234567890123456789012345
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetCount = alphabet.length;

const shiftChar = (c, shift) => {
    var index = alphabet.indexOf(c);
    var decipheredChar = index - shift;

    if (decipheredChar < 0) {
        decipheredChar = alphabetCount + decipheredChar;
    }
    return alphabet.charAt(decipheredChar);

};

const shiftString = (str, shift) => {
    var word = "";
    var specialChars = [":", ";", "'", ".", "-"];

    for (var i = 0; i < str.length; i++) {

        var char = str.charAt(i);
        var special = false;

        specialChars.forEach((item, id) => {
            if (char == item) {
                special = true;
            }
        });

        if (special) {
            word += char;
        } else {
            word += shiftChar(char, shift);
        }

    }

    return word;
};

const caesarDecipher = (cipherText, usedKey) => {

    cipherText = cipherText.toUpperCase();

    var string = cipherText.split(' ');
    var decipherText = "";

    string.forEach((val, i) => {

        decipherText += shiftString(val, usedKey);
        decipherText += " ";

    });

    return decipherText;

};

var text = document.querySelector("#text");
var key = document.querySelector("#key");
var button = document.querySelector("#button-decipher");
var errorMessage = document.querySelector("#error-message");
var decipheredText = document.querySelector("#deciphered-text");

button.addEventListener("click", function() {

    decipheredText.classList.remove("error-message");
    text.classList.remove("error");
    key.classList.remove("error");

    var error = false;
    var string = "PLEASE ENTER"

    if (text.value == "") {
        string += " THE CIPHERED TEXT";
        decipheredText.classList.add("error-message");
        text.classList.add("error");
        error = true;
    }
    if (key.value == "") {
        if (error) {
            string += " AND";
        }
        string += " THE KEY";
        decipheredText.classList.add("error-message");
        key.classList.add("error");
        error = true;
    }

    if (!error) {
        string = caesarDecipher(text.value, key.value);
    }

    decipheredText.innerHTML = string;
});

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);