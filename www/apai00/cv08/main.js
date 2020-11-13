// tyhle příkazy vypíšou zprávu do konzole
console.log('Ahoj světe');
console.error('Hele chyba!')
console.warn('Upozornění')

//var, let, const 

let age = 42;
console.log(age);

const height = 170;
console.log(height);

age = 12;
console.log(age);

// String, Number, Boolean, null, undefined, Symbol

const pi = 3.14; // Number - integer, double, float
const message = 'Ahoj, jsem Pepa a chci se naučit JavaScript';

console.log(message);

const isLive = true;
const isMarried = false;

console.log(isLive, isMarried);

const something = null;
const somethingElse = undefined;

console.log(something, somethingElse);

console.log(typeof isLive);
console.log(typeof pi);

// Strings / retezce

const string1 = 'Ahoj';
const string2 = 'svete';
// concatenation / zretezeni;
const string = string1 + '' + string2;
console.log(string);

console.log('Hodnota PI = ' + pi);

const myAge = 28;
const myName = 'Jan';
const str = 'Ahoj, jmenuji se ${myName}, a je mi ${myAge} let';
console.log(str);

console.log(myName.lenght);
console.log(myName.toUpperCase());

console.log(myName.slice(0, 2));

//pole / arrays
const fruits = ['ananas', 'banana', 'melon', 'strawberry', null, undefined];
console.log('We have' + fruits.length + 'fruits');


console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

console.log('----------');
for (let i = 0; i < fruits.lenght; i++) {
    console.log(fruits[i]);
};

let i = 0;
while (i < fruits.lenght) {
    console.log(i, fruits[i]);
    i++;
};

//functions
const add = (a, b) => {
    const result = a + b;
    return result;
};

console.log(add(2, 3));