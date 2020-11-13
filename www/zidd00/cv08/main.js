//prikazy, ktere vypisou zpravu do konzole
console.log('Ahoj');
console.error('Chyba');
console.warn('Varovani');

//let, const - pro promenne nejcasteji
let age = 42; //mohu zmenit
console.log(age);

const height = 170; //nemohu zmenit
console.log(height);

//datove typy - String, Number, Boolean, null, undefined, Symbol
const pi = 3.14; //Number - integer, double, float
const message = 'Ahoj';
console.log(message);

const isAlive = true;
const isMarried = false;

console.log(isAlive, isMarried);

const something = null;
const somethingelse = undefined;

console.log(something, somethingelse);

console.log(typeof isAlive);

//Stringy
const string1 = 'Ahoj';
const string2 = 'svete';
const string = string1 + ' ' + string2;
console.log(string);
console.log('PI = ' + pi);

const myAge = 20;
const myName = 'David';

console.log(myName.length);
console.log(myName.toUpperCase());
console.log(myName.slice(0,2));
console.log(myName.split(''));

//Pole
const fruits = ['ananas', 'banan', 'meloun', 'jahoda', null, false];
console.log('Velikost pole: ' + fruits.length);

const numbers = [0,1,2,3,4];
console.log(numbers);

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

console.log('FOR LOOP ----------------------------------');
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

console.log('WHILE LOOP ----------------------------------');
let i = 0;
while (i < fruits.length) {
    console.log(fruits[i]);
    i++;
}
console.log('---------------------------------------------');

fruits.push('orange');
console.log(fruits);
fruits.shift();
console.log(fruits);
fruits.unshift('apple');
console.log(fruits);

// objekty
const person = {
    age: 42,
    nationality: 'Germany',
    name: 'Pepa',
    surname: "Mach",
};
console.log(person.name);

const people = [
    {
        age: 12,
        name: 'David',
    },
    {
        age: 54,
        name: 'Jane',
    },
    {
        age: 65,
        name: 'Anna',
    },
];

for (let i = 0; i < people.length; i++) {
    console.log(people[i].name + ' ' + people[i].age);
}

people.forEach((person) => {
    console.log(person);
});

//podminky
if(true) {
    console.log(123);
}

//funkce
const add = (a, b) => {
    const result = a + b;
    return result;
};

console.log(add(2,3));