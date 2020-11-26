const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

document.querySelector('#decipher').addEventListener('click', (b) => {
    let cipherText = document.querySelector('#text-area').value;
    let usedKey = document.querySelector('#key-number').value;
    document.querySelector('#result').innerText = caesarDecipher(cipherText, usedKey);

    b.preventDefault();
})

const shiftChar = (c, shift) => {

    let index = (alphabet.indexOf(c) - shift) % alphabet.length;
    index = (index + alphabet.length) % alphabet.length;
    return alphabet.charAt(index);
};

const shiftString = (str, shift) => {

    let newString = '';
    for (i = 0; i < str.length; i++) {

        if (alphabet.indexOf(str.charAt(i)) != -1) {
            newString = newString + shiftChar(str.charAt(i), shift);
        }
        else {
            newString = newString + str.charAt(i);
        }
    }
    return newString;
};

const caesarDecipher = (cipherText, usedKey) => {

    return shiftString(cipherText.toUpperCase(), usedKey);
};


// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. â€• OTMDXQE PMDIUZ", 12));
