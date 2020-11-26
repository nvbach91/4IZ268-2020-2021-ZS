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
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function shiftChar(c, shift) {
  var i = c.charCodeAt(0);
  //console.log(i);
  if (i >= 65 && i < 91) {
    i = i - shift;
    if (i < 65) {
      i = i + 26;
    }
    c = String.fromCharCode(i);
  }
  return c;
  // a helper function to shift one character inside the
  // alphabet based on the shift value and return the result
}
function shiftString(str, shift) {
  //console.log("Spusteno shift string");
  var strDone = "";
  for (var i = 0; i < str.length; i++) {
    var c = shiftChar(str.charAt(i), shift);
    //console.log(c);
    strDone += c;
  }

  return strDone;
  // a helper function to shift one entire string inside the
  // alphabet based on the shift value and return the result
}
const caesarDecipher = (cipherText, usedKey) => {
  var strDone = "";
  //console.log(cipherText);
  strDone = shiftString(cipherText, usedKey);
  console.log(strDone);
  return strDone;
  // your implementation goes here
  // good to know:
  //    str.indexOf(c) - returns the index of the specified character in the string
  //    str.charAt(i) - returns the character at the specified index in the string
  //    when the shifted character is out of bound, it goes back to the beginning and count on from there
};

// albert einstein
caesarDecipher(
  "MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG",
  19
);

// john archibald wheeler
caesarDecipher(
  "YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW",
  5
);

// charles darwin
caesarDecipher(
  "M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ",
  12
);


  document.querySelector('#button1').addEventListener('click', (b) => {
    console.log("AAAAAAAA");
    let cipherText = document.querySelector('#text').value;
    let usedKey = document.querySelector('#key').value;
    console.log(cipherText);
    console.log(usedKey);
    document.querySelector('#result').innerText = caesarDecipher(cipherText, usedKey);
   
    b.preventDefault();
}); 