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

const textInput = document.getElementById('cipherText');
const shiftInput = document.getElementById('shift')
const buttonSubmit = document.querySelector('button');
const result = document.getElementById('result');

buttonSubmit.addEventListener('click', () => {

   const cipherText = textInput.value;
   const shift = shiftInput.value;
   result.textContent = caesarDecipher(cipherText, shift);
   result.classList.remove('d-none');
});

console.log(alphabet.charAt(0));

const mod = (n, p) =>
{
    if ( n < 0 )
        n = p - Math.abs(n) % p;

    return n % p;
}

const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the
    // alphabet based on the shift value and return the result
    let index = mod(alphabet.indexOf(c) - shift, alphabet.length);
    return alphabet[index];
};
const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the
    // alphabet based on the shift value and return the result
    let result = "";

    [...str].forEach((char) => {
        if(char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)
            result += shiftChar(char, shift);
        else
            result += char
    })
    return result;
};
const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know:
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    if(usedKey > alphabet.length)
        usedKey = usedKey % alphabet.length;
    return shiftString(cipherText, usedKey)
};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);