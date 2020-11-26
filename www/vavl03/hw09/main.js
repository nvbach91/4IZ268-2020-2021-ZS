/**
 * Long live Sparta! Vytvořte funkci, která vyřeší Caesarovu širfu. Funkce dostane 
 * na vstup zašifrovaný text a také hodnotu, která byla použita při šifrování, a pak 
 * vrátí dešifrovaný text. Předpokládejte pouze anglickou abecedu s velkými 
 * písmeny, ostatní znaky ignorujte. Poté v konzoli dešifrujte/dešiftujte následující texty.
 * 
 * key used - encrypted text
 *       19 - MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG
 *        5 - YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW
 *       12 - M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ
 * 
 * Následně vytvořte uživatelské rozhraní, ve kterém bude možné zadat zmíněné dvě 
 * vstupní hodnoty (zašifrovaný text a použitý klíč) a po kliknutí na tlačítko 
 * "Decipher!" se na určeném místě zobrazí dešifrovaný text. Rozhraní také vhodně
 * nastylujte.
 */
//              0123456789...
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const shiftChar = (c, shift) => {
    c = c.toUpperCase();
    let charcode = 0;
    let result = '';
    charcode = c.charCodeAt() - shift;
    if (charcode < 65) {
        charcode += 26;
    }
    result = String.fromCharCode(charcode);
    return result;
};
const shiftString = (str, shift) => {
    let result = '';
    length = str.length;
    for (i = 0; i < str.length; i++) {
        if (['.', ',', ':', '\'', '-', ' ', ';', '―'].includes(str[i])) {
            result += str[i];
            continue;
        }
        result += shiftChar(str[i], shift);
    }
    return result;
};
const caesarDecipher = (cipherText, usedKey) => {
    return (shiftString(cipherText, usedKey));
};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);

const key = document.querySelector('#cipher-key');
const cipher = document.querySelector('#cipher-text');
const answerField = document.querySelector('#deciphered-text')
const button = document.querySelector('#decipher-button');
button.addEventListener('click', () => {
    const usedKey = key.value;
    const cipherText = cipher.value;
    const answer = caesarDecipher(cipherText, usedKey);
    const deciphered = '<p>' + answer + '</p>';
    answerField.innerHTML += deciphered;
});