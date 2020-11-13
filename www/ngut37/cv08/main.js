alert('Hello world!');

const consoleEvent = (string) => {
  return function () {console.log(string)};
}

const kamo = document.querySelector("#kamo")

kamo.addEventListener("mouseover", consoleEvent("over!"));
kamo.addEventListener("click", consoleEvent("clicked!"));

const boo = false

// if condition
if (boo) console.log()

// ternary operator
console.log(boo ? 'oka' : null);

// logic operator
boo && console.log('booo');

// declaring constant
const PI_CONSTANT = 3.14

// enumeration
const petEnum = Object.freeze({
  dog: 'pes',
  cat: 'kočka',
  spider: 'pavouk'
})

// object
const myDog = {
  name: 'Rex',
  kind: petEnum.dog,
}

// object destructuring
const { name }  = myDog;
// logs "Rex"
console.log(name);

// passing by reference
const neighboursDog = myDog;

// "overwrites" myDog's name
neighboursDog.name = 'Cinamon';

console.log(myDog);
console.log(neighboursDog);

const alphabet = ['a', 'b', 'c'];

// adds after last index
alphabet.push('d'); 

const alphabetContinued = [...alphabet, 'f'];

console.log(alphabetContinued);

alphabetContinued.map((letter, index) => {
  console.log(`Letter at index ${index}: ${letter}`);
})

