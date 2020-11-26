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
    // a helper function to shift one character inside the 
    // alphabet based on the shift value and return the result
    
    // Index písmenka v abecedě
    let firstIndex = alphabet.indexOf(c);      
    
    //Pokud je neznámé písmenko - vracíme prázdnou hodnotu
    if (firstIndex == -1)
    {
        return '';
    }

    // nový index je posunutí původního o danou hodnotu, vždy modulo 26, protože potom se to už opakuje
    let transcribedIndex = (firstIndex + shift) % 26;
    if (transcribedIndex < 0) { //šlo se směrem doleva do mínusu
        transcribedIndex = alphabet.length + transcribedIndex;
    }
    return alphabet.charAt(transcribedIndex);
    
    
};




const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
    console.log(str + shift);
    let encryptedMessage = '';
        for (let i = 0; i < str.length; i++) {
            encryptedMessage = encryptedMessage + shiftChar(str.charAt(i), shift);
        };
        return encryptedMessage;
    
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there
    // Thank you

    return shiftString(cipherText, -usedKey);
};


// albert einstein
console.log(caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19));

// john archibald wheeler
console.log(caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5));

// charles darwin
console.log(caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12)); 

const writer = () => {
    document.getElementById('clearTextEncrypted').value = 'Ahoj';
};




const encrypt = document.querySelector('#encrypt');

encrypt.addEventListener('click', () => {
    const inputText = document.querySelector('#clearText').value;
    const key = document.querySelector('#clearTextKey').value;
    output = shiftString(inputText, parseInt(key));
    document.querySelector('#clearTextEncrypted').value = output;
});

const decrypt = document.querySelector('#decrypt');

decrypt.addEventListener('click', () => {
    const inputText = document.querySelector('#encryptedText').value;
    const key = document.querySelector('#encryptedTextKey').value;
    output = caesarDecipher(inputText, parseInt(key));
    document.querySelector('#clearTextDecrypted').value = output;
});