/* Ceasar cipher logic
*/
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const validateChar = (c) => {
  // type and length check
  if (typeof c !== 'string' || c.length > 1) return false;

  // accept only uppercased char
  if (!alphabet.includes(c)) return false;

  return true;
}

const validateShift = (shift) => {
  if (typeof shift !== 'number') return false;
  return true;
}

const shiftChar = (c, shift) => {
  // a helper function to shift one character inside the 
  // alphabet based on the shift value and return the result

  if (!validateChar(c) || !validateShift(shift)) return c;

  const originalCharCode = alphabet.indexOf(c);
  let shiftedCharCode = originalCharCode - shift % 26;

  if (shiftedCharCode < 0) shiftedCharCode = alphabet.length + shiftedCharCode;

  let shiftedChar = alphabet[shiftedCharCode];


  return shiftedChar;
};

const caesarDecipher = (str, shift) => {
  // a helper function to shift one entire string inside the 
  // alphabet based on the shift value and return the result

  if (typeof str !== 'string' || !validateShift(shift)) return;

  const shiftedString = str.split('').map(char => shiftChar(char, shift))

  return shiftedString.join('');
};


// albert einstein
caesarDecipher("MPH MABGZL TKX BGYBGBMX: MAX NGBOXKLX TGW ANFTG LMNIBWBMR; TGW B'F GHM LNKX TUHNM MAX NGBOXKLX. - TEUXKM XBGLMXBG", 19);

// john archibald wheeler
caesarDecipher("YMJWJ NX ST QFB JCHJUY YMJ QFB YMFY YMJWJ NX ST QFB. - OTMS FWHMNGFQI BMJJQJW", 5);

// charles darwin
caesarDecipher("M YMZ ITA PMDQE FA IMEFQ AZQ TAGD AR FUYQ TME ZAF PUEOAHQDQP FTQ HMXGQ AR XURQ. ― OTMDXQE PMDIUZ", 12);


/* DOM manipulation
*/

// selecting input and button
const formEncryptedText = document.querySelector("#encrypted-text");
const formShiftValue = document.querySelector("#shift");
const formButton = document.querySelector("#decrypt-button");
const decryptedText = document.querySelector("#decrypted-text");
// const decryptedText  = document.querySelector("#decrypted-text");

formButton.addEventListener('click', (e) => {
  // get value from input
  const formInputValues = {
    text: formEncryptedText.value,
    shift: Number(formShiftValue.value),
  }

  // update result on button click
  decryptedText.innerHTML = (formInputValues.text && formInputValues.shift) ? caesarDecipher(formInputValues.text, formInputValues.shift) : 'Enter both required inputs please.';

  // don't refresh page
  e.preventDefault();
})
