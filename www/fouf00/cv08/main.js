//JEdnoradkovy komentar
/*
Viceradkovy
komentar
*/


//Vyskakovací okno alert('Ahoj svete');



console.log('123');
console.error('454');

//var let const -proměnné
//var -obsah lze změnit;
//let -obsah lze změnit;
//const -nelze měnit; používat když se mění

var age = 12;
console.log('věk: ', age);

let height = 170;
const width = 200;
console.log('výška: ', height);
console.log('šířka: ', width);

age = 42;
height = 180;
console.log('nový věk: ', age);
console.log('nová výška: ', height);

//String, Number, Boolean, null, undefined, Symbol

//String
const message = 'Ahoj, ahoj';
console.log(message);

//Number - celá čísla, desetinná čísla s tečkou 3.14; 
const nPeople = 25;
console.log(nPeople)
//Boolean true/false pojmenování is...
let isLive = true;
const isMarried = false;
console.log(isLive)
console.log(isMarried)

//null -prázdná hodnota
const something = null;

//undefined nedidovaná hodnota
const somethingElse = undefined;

//typeof typ hodnoty
console.log(typeof isLive)


//concatenation /zretezeni / nalepení stringu do sebe

const string = 'blabla' + ' ' + 'string2' + ' ' + message
console.log(string);
const msg2 = 'lidi';

//zpětná uvozovka  - můžeme vkládat proměnné dovnitř
const stringTemple = `Je nást tady ${nPeople}`
console.log(stringTemple);
console.log(msg2.length);
console.log(msg2.toLocaleUpperCase);
console.log(msg2.toLocaleLowerCase);
console.log(msg2.slice(0, 2));
console.log(msg2.split(''));


//konstanta VELKYMI PISMENY
const EULER_NUMBER = 2.3;

//deklarace tříd
//const MyChannel;


//objects

const person = {
    name: 'David',
    age: 40,
};

console.log(person.name);

const fruits = ['strawwbery', 'apple', 'banana'];

console.log(fruits[0]);
console.log(fruits[1]);

const people = [
    {
        age: 12,
        name: "James",
    },
    {
        age: 14,
        name: "Bob",
    },
    {
        age: 22,
        name: "Pete",
    },
];

console.log('___________________________');
//cykly loops

for (let i = 0; i < fruits.length; i++) {

    console.log(fruits[i]);
};

console.log('___________________________');

let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;

}
console.log('___________________________');

fruits.forEach((fruit) => {
    console.log(fruit);
})


//functions zapisy:
//function functionName(){};
//const funcNme= ()=>{};

const add = (a, b) => {
    const result = a + b;
    return result;
    //nebo jen return a+b;
}

var res = add(1, 2);
console.log(res);

isLive = false;
if (isLive) {
    console.log('it is live');

}
else {
    console.log('not alive');
}
