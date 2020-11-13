//prvni typ komentare na jednu radku - tyhle zpravy pisou prikazy do konzole
console.log('Ahoj světe');
/*
druhy typ komentare na vice radku
 */ 
console.error('Hele chyba!');
console.warn('Upozornění');

//ver, let, const

let age = 42;
console.log(age);

const height = 170;
console.log(height);

age = 12;
console.log(age);

//height = 180;
//console.log(height);

// height nelze měnit, je to konstanta


//String, Number, Boolean, null, undefined, Symbol

const pi = 3.14; //Number - integer, double, float
const message = 'Ahoj, jmenuji se Pepa a chci se naučit JavaScript!';
    //nedoporučuje - "Ahoj, jmenuji se..."
    //`Ahoj, jmenuje se...`

console.log(message);


const isLive = true;
const isMarried = false;

console.log(isLive, isMarried);

const something = null;
const somethingElse = undefined;
//null prázdné, undefined nedefinované

console.log(something, somethingElse);

console.log(typeof isLive);
console.log(typeof message);
console.log(typeof pi);

// String řetězce
const string1 = 'Ahoj';
const string2 = 'svete';

//concatenation - zřetězení
const string = string1 + ' ' + string2;
console.log(string);

console.log('Hosnota PI = ' + pi);


const myAge = 20;
const myName = 'Baru';
const str = `Ahoj jmenuje se ${myName} a je mi ${myAge} let.`;
console.log(str);
    
console.log(myName.lenght);
console.log(myName.toUpperCase());
console.log(myName.toLowerCase());

console.log(myName.slice(0, 2));
console.log(myName.slice(1, 3));
console.log(myName.split(''));
console.log(myName.split('c'));


//arrays - pole
const fruits = ['ananas', 'banana', 'melon', 'strawberries', null, undefined];
console.log('Máme ' + fruits.lenght + ' ovoce.');

const numbers = [0, 1, 2, 3, 4];
console.log(numbers);

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);

//cykly - for cyklus (opakování cyklu - to co je v těle)
console.log ('----------------------');
for (let i=0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

//while cyklus - dělá v podstatě to stejné, ale je v jiném zápisu než for cyklus
console.log ('----------------------');
let i = 0;
while (i < fruits.lenght) {
    console.log(i, fruits[i]);
    i++;
}

fruits.push('pomeranč');
console.log(fruits);
fruits.shift();
console.log(fruits);
fruits.shift('jablko');;
console.log(fruits);

//objekty - objects (má jednotlivé vlastnosti)
const person = {
    age: 42,
    nationality: 'Czech',
    name: 'Pepa',
    surname:'Mach',
};
console.log(person.name);
console.log(person.age);

//řetězení z objektu

console.log(person.name + ' ' + person.surname);

const people = [
    {
        age:12,
        name:'David',
    },
    {
        age:22,
        name:'Jane',
    },
    {
        age:16,
        name:'Carl',
    },
    {
        age:72,
        name:'George',
    },
];

for (let i = 0; i < people.lenght; i++) {
    console.log(people[i].name + ' ' + people[i].age);
}

people.forEach((person) => {
    console.log(person);
});

//podmínky - if else
if (true){
    console.log(123);
}

if (isLive) {
    console.log(123);
}

if (isMarried) {
    console.log(123);
}
//tady se nic nespusti - neni pravda, je false

//tady se spusti else
if (isMarried) {
    console.log(123);
} else {
    console.log(456);
}

//funkce - functions
//const add = function () {};
const add = (a, b) => {
    //const result = a + b;
    //return result;
    //lze ale zkrátit na..
    return a + b;
};

console.log(add(2, 3));