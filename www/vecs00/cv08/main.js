// Vyskakuje hláška při načtení stránky
//alert('Ahoj světe!');

//Příklady příkazů
console.log('123');  
console.error(456)

//deklarování proměnných - var, let, const (používat ty poslední dva var - globálně skopovaný, const je blokově skopovaný)
var age = 12; //hodnotu jsme dosadili do proměnné age
console.log(age);

let height = 170;
const width =200;

console.log(height);
console.log(width);

age=42;
console.log(age);
height= 110;
console.log(height);
//s width to nejde, je to kontatní proměnná a to nelze editovat dál 


/*
Datové typy:
 String, Number, Boolean, null, undefined, Symbol
*/
var message='Jsem Pepa a chci se naučit Fifu';
                //"Nepoužívat"
                //`Používat když mám v textu proměnnou?`                
console.log(message);

const nPeople = 25; //3.14, 100.5,...
console.log(nPeople);

let isLive = true; //true, false
console.log(isLive);

const something = null;
console.log(something);

console.log(typeof isLive); // vrátí mi typovou hodnotu isLive - v tomto případě boolean


/*Práce s řetězcem
 concatenation /zretezeni /nalepeni stringu do sebe
 */

 const string = 'string1, ' + 'string2' + ' ' + message;
 console.log(string);

 const msg2 = 'lidí';
 const stringTemple = `Je nás tady ${nPeople} ${msg2}`;
 console.log(stringTemple);

 console.log(msg2.length);
 console.log(msg2.toUpperCase());
 console.log(msg2.toLowerCase());
console.log(msg2.slice(0,2));
console.log(msg2.slice(1,3));

console.log(msg2.split(''));

//objects
const person = {
    name:'David',
    age:  40,
    hobbies: ['sport', 'music']
};

console.log(person.name);
console.log(person.age);

// pole / array

const fruits = ['strawberry', 'apple', 'orange', true, 42, null, undefined];

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);
console.log(fruits[3]);
console.log(fruits[7]);

const people = [
    {
        age: 12,
        name: 'Jane',
    },
    {
        age:42,
        name:'Bob',
    },
]
console.log(people[0]);

// cykly /loops

for(let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

let i = 0;
while(i <fruits.length) {
    console.log(i, fruits [i]);
    i++;
}

console.log('---------------');
fruits.forEach((fruit) => {
    console.log(fruit);
});

// Funkce
//function functionName() {};

const add = (a, b) => {
   const result= a + b;
   return result;
   // return a + b;
};

const res = add(1, 2);
console.log(res);

if (isLive){
    console.log('it is live');
}

isLive = false;
if (isLive) {
    console.log ('adqwe it is live abcde');
} else {
    console.log('it is not live');
}