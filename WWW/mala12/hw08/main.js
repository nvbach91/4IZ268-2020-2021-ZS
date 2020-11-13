//Příklady příkazů
alert("Ahoj"); //uvozovky v závorce
console.log("123");  //uvozovky v závorce
console.error(456);

//var, let, const
var age = 12;
console.log(age); //vypisuje obsah proměnné

let height = 178;
const width = 200; // constantní proměnnou nelze dále měnit
console.log(height);
console.log(width);

age = 42;
height = 100;
//takhle se pak dají obsahy proměnných měnit

//String, NUmber, Boolean, null, undefined, Symbol
var message = "Ahoj, já jsem David.";
console.log(message);
const nPeople = 25;


const isLive = true;
const isMarried = false;
console.log(isLive);
console.log(isMarried);

const something = null;
const somethingelse = undefined;
console.log(isLive);
console.log(isMarried);

console.log(typeof isLive);
console.log(typeof nPeople);
console.log(typeof message);

const string = "string1" + " " + "string2";
console.log(string);
const msg2 = "lidí";
const stringTemple = "Je nás tady ${nPeople} ${msg2}."
console.log(stringTemple);

console.log(mdg2.length);
console.log(msg2.toUpperCase());
console.log(msg2.toLowerCase());

console.log(msg2.slice(0,2)); //část stringu od nultého po druhý znak
console.log(msg2.split(""));

const EULER_NUMBER = 2.3;
const myFavoriteTelevisionChannel;
const myChannel;

const person = {
    name: "David",
    age: 23,
    hobbies: ["sport", "books"],
};
console.log(person.name);
console.log(person.age);

const fruits = ["jablka","banány","jahody"]; //pole, začíná od indexu 0
console.log(fruits[0]); //vypisuje "jablka"

const people = [
    {age: 12,
    name: "Jane",},
    {age: 25,
    name: "Thomas",},
    {age: 31,
    name: "Penny",}
];

//cykly, loops
for (let i = 0; i<fruits.length; i++){
console.log(fruits[i]);
};

let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
};

console.log("-------------------");
fruits.forEach((fruit)=>{
    console.log(fruit);
});

function functionName() {};
const add=(a,b)=>{
    const result = a+b;
    return result;
}
const res = add(1,2);
console.log(res);

if (isLive){
console.log("adwd it is live jsjk");
} else {console.log("it is not live")};