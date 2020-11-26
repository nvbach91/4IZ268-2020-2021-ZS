const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const shiftChar = (c, shift) => {
    c = c.toUpperCase();
    let charcode = 0;
    let encodedChar = '';
    charcode = c.charCodeAt() - shift;
    if (charcode < 65) {
        charcode += 26;
    }
    encodedChar = String.fromCharCode(charcode);
    return encodedChar;
};
const shiftString = (str, shift) => {
    let encodedString = '';
    for (i = 0; i < str.length; i++) {
        if (['.', ',', ':', ' ', ';', 'â€•', '\'', '-'].includes(str[i])) {
            encodedString += str[i];
            continue;
        }
        encodedString += shiftChar(str[i], shift);
    }
    return encodedString;
};
const caesarDecipher = (cipherText, usedKey) => {
    return (shiftString(cipherText, usedKey));
};

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));

const shift = document.querySelector('#cipher-shift');
const text = document.querySelector('#cipher-text');
const resultText = document.querySelector('#result-text')
const button = document.querySelector('#action-button');

const decipher = () => {
    console.log("It seems the button has been pressed");
    const usedKey = shift.value;
    const cipherText = text.value;
    const answer = caesarDecipher(cipherText, usedKey);
    resultText.innerHTML = answer;
}
