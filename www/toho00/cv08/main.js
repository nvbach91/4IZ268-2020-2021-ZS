// Jednoradkovy komentar

/*víceradkovy komentar
dalsi radek
*/

// alert('Ahoj Světe!')
// třeba středník pro zakončení

//příklady příkazů
console.log('123');

console.error(456);

// var(globálně, lze změnit později), let (také lze změnit), cost(lokálně blokovaně, nejde změnit)
// dosazení hodnoty do age
var age = 12;
// vypsání příkazu hodnoty
console.log(age);
let height = 170;
const width = 200;
console.log(height);
console.log(width);

age = 42;
console.log(age);
height = 100;
console.log(height);

//nelze dosadit do konstanti promenne
//width = 250; vyhodí error

//String, Number, Boolean, null, undefined, Symbol
// názvy nesmí začínat číslem
const message = 'Ahoj, Peepo here a chci se naučit Javascript'
    // zpětné uvozovky
    //  "Ahoj, Peepo here a chci se naučit Javascript";//nepoužívat

console.log(message);
const nPeople = 25; //number 3.14,100.5,

console.log(nPeople);


let isLive = true; //boolean true x false
const isMarried = false;
console.log(isLive);
console.log(isMarried);


const something = null;
const somethingElse = undefined;
console.log(typeof isLive); // vypíše jaký je použit String, number atd
console.log(typeof nPeople);
console.log(typeof message);

// concatenation /zřetězení / nalepeni stringu do sebe

const string = 'string1' + ' ' + 'string2' + message;
console.log(string);
const msg2 = 'lidí';
const stringTemple = `je nás tady ${nPeople} ${msg2}`;
console.log(stringTemple);

console.log(msg2.length);
console.log(msg2.toUpperCase());

console.log(msg2.slice(0, 2));
console.log(msg2.slice(1, 3));
// rozdělení písmen
console.log(msg2.split(''));

// const EULER_NUMBER = 2.3;
// const myFavoriteTelevisionCHannel; // camel case
// const MyChannel; // Psacal case pro pojmenování tříd

//objects
//oděluje čárkou
const person = {
    name: 'David',
    age: 40,
    Hobbies: ['sport', 'music'],
}

console.log(person.name);
console.log(person.age);

//pole / arrays
const fruits = ['strawberry', 'apple', 'orange', true, 42, null, undefined];


console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[5]);

const people = [{
        age: 12,
        name: 'Jane',
    },
    {
        age: 42,
        name: 'Bob',
    },
    {
        age: 72,
        name: 'Frank',
    },

];
console.log('---------------------');
//cykly / loops
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}
console.log('---------------------');

let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

console.log('---------------------');

fruits.forEach((fruit) => {
    console.log(fruit);
});


//functions
function functionName() {};
const add = (a, b) => {
    //  const result = a + b;
    // return result;
    return a + b;
};
var res = add(1, 2);
console.log(res);

if (isLive) {
    console.log('adqwe it is live abcde');

} else {
    console.log('it is not live');
};