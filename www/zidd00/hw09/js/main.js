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
};

const shiftString = (str, shift) => {
    // a helper function to shift one entire string inside the 
    // alphabet based on the shift value and return the result
};

const caesarDecipher = (cipherText, usedKey) => {
    // your implementation goes here
    // good to know: 
    //    str.indexOf(c) - returns the index of the specified character in the string
    //    str.charAt(i) - returns the character at the specified index in the string
    //    when the shifted character is out of bound, it goes back to the beginning and count on from there

    let result = ""; //prázdný string, do kterého budeme plnit rozšifrované znaky
    for(let i = 0; i < cipherText.length; i++) //loopneme přes každý znak v šifře
    {
        let index = alphabet.indexOf(cipherText[i]); //zjistíme, v jakém pořadí (index) se nachází náš znak v abecedě (pokud není v abecedě, return -1)
        if(index != -1) //znak se nachází v abecedě (A-Z)
        {
            let usedKeyCurrent = usedKey; //proměnná, do které dáme klíč
            while(index-usedKeyCurrent < 0) //pokud je aktuální klíč větší než pořadí v abecedě (tento while cyklus se dokáže vypořádat i s tím, když zadáme klíč větší než počet znaků v abecedě)
            {
                usedKeyCurrent -= index+1; //od aktuálního klíče odečteme index+1, "+1" protože první prvek je 0
                index = alphabet.length-1; //pořadí aktuálního znaku přehodíme na konec abecedy
            }
            index -= usedKeyCurrent; //toto se vyvolá, jen pokud index-usedKeyCurrent >= 0, tj. nedochází k přetečení z alphabet
            result += alphabet.charAt(index); //do našeho výsledného stringu vložíme přeložený znak, který podle klíče odpovídá znaku v šifře
        }
        else result += cipherText[i]; //tento znak můžeme do výsledného stringu vložit tak, jak je, protože není zašifrovaný (spec. znaky atd.)
    }
    console.log(result);
    return result;
};

// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);


const cipherInput = document.querySelector('#form-cipher-input');
const cipherKey = document.querySelector('#form-key-input');
const decipherButton = document.querySelector('#form-decipher');

decipherButton.addEventListener('click', () => { //uživatel klikne na tlačítko

    let text = "";
    if(!cipherInput.value || !cipherKey.value) //jedno z polí je prázdné
    {
        text = "Please fill out both fields!";
        document.getElementById("output-text").style.color = "red";
    }
    else if(isNaN(cipherKey.value)) //zadaný klíč není číslo
    {
        text = "The key has to be a number!";
        document.getElementById("output-text").style.color = "red"; 
    }
    else if(!isNaN(cipherKey.value) && cipherKey.value <= 0) //zadaný klíč je záporný
    {
        text = "The key has to be greater than 0!";
        document.getElementById("output-text").style.color = "red"; 
    }
    else //zobrazit dešifrovaný text
    {
        text = caesarDecipher(cipherInput.value, cipherKey.value);
        document.getElementById("output-text").style.color = "black"; 
    }
    document.getElementById("output-text").textContent = text;
    document.getElementById("output-area").style.display = "block";
});