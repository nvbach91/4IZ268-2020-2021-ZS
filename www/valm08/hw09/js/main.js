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

const decipherButton = document.getElementById("decipher");


/*
const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    if (alphabet.indexOf(c)+shift > 25) {
        return alphabet.charAt(alphabet.indexOf(c)+shift-25);

    };

    return alphabet.charAt(alphabet.indexOf(c)+shift);

};
*/

const shiftChar = (c, shift) => {
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    if (alphabet.indexOf(c)-shift < 0) {
        return alphabet.charAt(alphabet.indexOf(c)-shift+25);

    };

    return alphabet.charAt(alphabet.indexOf(c)-shift);

};


console.log(shiftChar("A", 1));
console.log(shiftChar("X", 10));
console.log(shiftChar("A", 11));
console.log(shiftChar("B", 11));
console.log(shiftChar("C", 11));
console.log("==============");

const shiftString = (str, shift) => {
    let shifted = "";
    for (let index = 0; index < str.length; index++) {
        shifted = shifted + shiftChar(str[index], shift);
    };
    return shifted;
};
console.log(shiftString("ABC",11));


const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    //return alert("Hi!");
    if (usedKey > 26 || usedKey < 1) {
        alert("Please use number between 1 and 25.");
        return;
    };
    document.getElementById("output").innerText = shiftString(cipherText, usedKey);
    return;
};



//decipherButton.addEventListener("click", caesarDecipher(document.getElementById("input-text").value, document.getElementById("shift").value));
decipherButton.addEventListener("click", function(e) {
    caesarDecipher(document.getElementById("input-text").value, document.getElementById("shift").value);
});




console.log(caesarDecipher("JCJC", 2));

// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));
console.log(shiftString("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12));




