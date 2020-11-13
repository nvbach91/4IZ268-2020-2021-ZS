// Jednoradkovy komentar

/* viceradkovy komentar
   dalsi radek
*/

//vyskočí okno: Ahoj svete
//alert('Ahoj světe!');

//příklady prikazu
console.log('123'); //vypíše zprávu: 123
console.error('456'); //error

// var, let, const (pouzivat let a const)
var age = 12; //deklarace promenne 
console.log(age);  //vypis promenne
//const - pouzivat, kdyz vime ze se hodnota v promenne menit NEBUDE
//let - pouzivat, kdyz se menit BUDE

let height = 170;
const width = 200;
console.log(height);
console.log(width);

age = 42; // var - muzeme zmenit hodnotu
console.log(age);
height = 100; // let - muzeme zmenit
console.log(height);
//u const neprojde - nelze dosadit od konstantni promenne; width=250;

//Datove typy
//String, Number, Boolean, null, undefined, Symbol
const message = 'Ahoj, já jsem Pepa a chci se naučit JavaScript'; //doporučeně použivat
//   "Ahoj, já jsem Pepa a chci se naučit JavaScript";

console.log(message);

const nPeople = 25; //3.14, 100.5
console.log(nPeople);

let isLive = true; // ture / false
// -> jestli je něco živé/běží true, jinak false
const isMarried = false; //true / false
console.log(isLive);
console.log(isMarried);

const something = null;
const somethingElse = undefined;

//typeof: zjisteni datoveho typu
console.log(typeof isLive);
console.log(typeof nPeople);
console.log(typeof message);

// concatenation / zretezeni / nalepeni stringu do sebe / vlozeni stringu do stringu
const string = 'string1' + ' ' + 'string2 ' + message;
console.log(string);
const msg2 = 'lidí';
const stringTemple = `Je nás tady ${nPeople} ${msg2}`; // používám ``
console.log(stringTemple);

console.log(msg2.length);
console.log(msg2.toUpperCase());
console.log(msg2.toLowerCase());

//chci část stringu od indexu 0 až do 2, ne včetně(bez 2)
console.log(msg2.slice(0, 2));
console.log(msg2.slice(1, 3));

// rozdeleni pismen do polí
console.log(msg2.split(''));

/*const EULER_NUMBER = 2.3; //const, která se nemění
const myFavoriteTelevisionChannel; //camelCase zapis
const MyChannel; // PascalCase - vetsinou deklarace trid v JS */

//objects
const person = {
    name: 'David',   // vlastnost, vlastnost -> oddělení čárkou
    age: 40,
    hobbies: ['sport', 'music'],
};

console.log(person.name);
console.log(person.age);

//pole / arrays
const fruits = ['strawberry', 'apple', 'orange', true, 42, null, undefined];
//lepší zachovat stejny datovy typ v ramci pole

//výpis podle indexu
console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[5]);

const people = [
    {
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

console.log('---------------------')
//cykly / loops
for (let i = 0; i < fruits.length; i++) {
    console.log(i, fruits[i]);
}

console.log('---------------------')
let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

//forEach zavoleme funkci, pro kazdy prvek provede
console.log('---------------------')
fruits.forEach((fruit) => {
    console.log(fruit);
});

//functions
//function functionName() { };
const add = (a, b) => {
    const result = a + b;
    return result;
    //zkracenina: return a + b;
};

var res = add(1, 2);
console.log(res);

//podminky
if (isLive) {
    console.log('it is live');
}

isLive = false;

if (isLive) {
    console.log('');
} else {
    console.log('it is not live');
}
