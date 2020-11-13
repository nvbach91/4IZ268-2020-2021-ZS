// vypsani do konzole
console.log('Ahoj světe');
console.error('Chyba');
console.warn('Varování');

//var, let, const

let age = 42;
console.log(age);

const height = 170;
console.log(height);

age = 12;
console.log(age);

//String, Number, Boolean, null, undefined, Symbol

const pi = 3.14; // Number - integer, double, float
const message = 'Ahoj, jmenuji se Pepa a chci se naučit JS';

console.log(message);

const isLive = true;
const isMarried = false;

console.log(isLive, isMarried);

const something = null;
const somethingElse = undefined;

console.log(something, somethingElse);

console.log(typeof isLive);

//String

const string1 = 'Ahoj';
const string2 = 'světe';
//concatenation
const string = string1 + ' ' + string2;
console.log(string);

console.log('Hodnota PI = ' + pi);

const myAge = 28;
const str = `Ahoj, je mi ${myAge}`;
console.log(str);

console.log(message.length);
console.log(message.toLocaleUpperCase());
console.log(message.toLowerCase());

console.log(message.slice(0, 2));
console.log(message.slice(1, 8));

console.log(message.split('se'));

// pole

const fruits = ['jablko', 'hruška', 'banán', 'meloun', null, undefined, false];
console.log('Máme ' + fruits.length + ' druhy ovoce');

const numbers = [1, 2, 3, 4, 5];
console.log(numbers);

console.log(fruits[0]);
console.log(fruits[3]);

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

fruits.push('pomeranč'); //přidat poslední prvek
fruits.shift(); //odebrat první
fruits.unshift('mandarinka'); //přidat první
console.log(fruits);

//objekty
const person = {
    age: 42,
    nationality: 'CZ',
    name: 'Pepa',
    surname: 'Novák',
};

console.log(person.name + ' ' + person.surname);

const people = [{
        age: 12,
        name: 'David'
    },
    {
        age: 25,
        name: 'Eva'
    },
    {
        age: 58,
        name: 'Michal'
    },
    {
        age: 45,
        name: 'Hanz'
    },
];

for (let i = 0; i < people.length; i++) {
    console.log(people[i].name + ' ' + people[i].age);
}

people.forEach((person) => {
    console.log(person.name);
});

//conditionals, if else

if (isMarried) {
    console.log(123);
} else {
    console.log(456);
};

//funkce
//const add = function () {};

const add = (a, b) => {
    const result = a + b;
    return result;
}

console.log(add(2, 3));