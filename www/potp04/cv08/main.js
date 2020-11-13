console.log('AAAAAAAAAAAAA');
console.error('EEEEE');
console.warn('IIIIIIIIIIII'); //oamdoimopijkk

let age = 42;
console.log(age);

const height = 4565465;
console.log(height);
age =12;
console.log(age);


const message = "XXXXXXXXXX"

console.log(message);

const jmeno = 'Petrrr123';
const str = 'Ahoj jsem Petrrr'
console.log(jmeno.split(''));
console.log(str.split);
console.log(str.length);

const pi = 3.14;
console.log('Hodnota pi = ' + pi);

const isLive = true;
const isMarried = false;

console.log(isLive, isMarried);

const something = null; //prázdné
const somethingElse = undefined; //nedefinované

console.log(something, somethingElse);

console.log(typeof isLive);
console.log(typeof message);
console.log(typeof pi);

//arrays - pole
const fruits = ['ananas', 'banana', 'melon', 'strawberries', 'eškere', null, undefined];
console.log('Je tu tolik ovoce:' + fruits.lenght);
const numbers = [0, 1, 2, 3, 4];
console.log(numbers);
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);


console.log ('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
for (let i=0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

console.log ('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
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

//objekt
const person = {
    age: 42,
    nationality: 'Odsud',
    name: 'Janek',
    surname:'Rubeš',
};
console.log(person.name);
console.log(person.age);
console.log(person.name + ' ' + person.surname);

//pole objektů
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
]

//pro všécky dá jméno a věk
for (let i = 0; i < people.lenght; i++) {
    console.log(people[i].name + ' ' + people[i].age);
}

people.forEach((person) => {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log(person.name);
});

if (true){
    console.log(123);
}

if (isLive) {
    console.log(123);
}

if (isMarried) {
    console.log(123);
}


if (isMarried) {
    console.log(123);
} else {
    console.log(456); //here toto se spusti
}

//funkce
const add = (a, b) => {
   
    return a + b;
};

console.log(add(44, 789));