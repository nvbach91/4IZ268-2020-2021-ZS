//komentář na jeden řádek
/*víceřádkový
komentář*/

/* tyhlepříkazy vypíšou zprávu do konzole */
console.log('Ahoj světe');
console.error('Chyba!');
console.warn('Varování!');

// Úvod: var, let, const

let age = 42;
console.log(age);

const height= 170;
console.log(height);

age=12;
console.log(age);

/*height=30;
console.log(height);*/

//Závěr: const je konstanta a nedá se měnit narozdíl od let, které měnit lze

//Úvod: string, number, boolean, null, undefined, sybmol

const pi = 3.14; // Number - integer, double, float
const message = 'Ahoj, tady Maykl :)'; // String
              //"Ahoj, tady Maykl :)"
              //Ahoj, tady Maykl :)

console.log(message);

const isLive = true
const isMarried = false;

console.log(isLive, isMarried);

const something = null;
const somethingElse = undefined;

console.log(something, somethingElse);

console.log(typeof isLive);
console.log(typeof message);
console.log(typeof pi);

// STrings / retezce

const string1 = 'Ahoj';
const string2 = 'svete';
//concatetation / retezeni
const string = string1 + ' ' + string2;
console.log(string);

console.log('Hodnota PI = ' + pi);

const maAge = 5;
const myName = 'Míša';
const str = 'Ahoj jmenuji se ${}, a je mi ... let';
console.log(str);

console.log(myName.length);
console.log(myName.toUpperCase());
console.log(myName.toLocaleLowerCase());


console.log(myName.slice(0,3));
console.log(myName.slice(1,4));
console.log(myName.split(''));
console.log(myName.split('í'));

//pole / arrays

const fruits = ['ananas', 'banana', 'melon', 'strawberry', null, undefined, false];
console.log('We have ' + fruits.length + ' friuts');

const numbers = [0, 1, 2, 3, 4];
console.log(numbers);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);

console.log('-------------------------');
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
};

console.log('-------------------------');
let i = 0;
while(i<fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

fruits.push('orange');
console.log(fruits);
fruits.shift();
console.log(fruits);
fruits.unshift('apple');
console.log(fruits);


//objects
const person = {
    age: 52,
    nationality: 'Czech republic',
    name: 'Josef',
    surname: 'Číko',
}
console.log(person.name + ' ' + person.surname);

const people = [
    {
        age: '12',
        name: 'David'
    },
    {
        age: '13',
        name: 'Marek'
    },
    {
        age: '14',
        name: 'Lukas'
    },
    {
        age: '15',
        name: 'Petr'
    },
];


// for(let i = 0; i < people.length

people.forEach((person) => {
    console.log(person);
});

if(isMarried) {
    console.log(123);
} else {
    console.log(456);
}


//functions
//const add = function () {};
const add = (a, b) => {
    const result = a + b;
    return result;
};

console.log(add(2, 3))