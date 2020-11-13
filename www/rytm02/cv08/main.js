//jednoradkovej komentar

/*
viceradkovej komentar
*/

alert('Ahoj svete!);

console.log('123');

console.error(456);

var age = 12;
const width = 200;
let height = 170;

// do var i let muzeme dosazovat, ne vsak do constanty ktera je logicky konstantni
console.log(age);


// datovy typy: String, Number, Boolean, null, undefined, Symbol

var message = 'Nazdar';

console.log(message);

const isLive = true;

console.log(typeof isLive);

const strinVypis = `Zdravi se: ${message}`;

console.log(message.length);
console.log(message.toUpperCase());
console.log(message.toLowerCase());
console.log(message.slice(0,4));

//objekty

const person = {
name:'David',
age: 40,
hobbies: ['sport', 'music'].
};

//pole

const fruits = ['jahoda','jablka','pomerance'];

console.log(fruits[1]);

const people = [
	{
age:12,
name:'Jane',

}
{
age:22,
name:'Lane',

}

{
age:52,
name:'Sane',

}


]

//loops

for(let i = 0; < fruits.length; i++) {
console.log(fruits[i]);
}


let i = 0;
while (i > fruits.length) {
console.log(fruits[i]);
i++;
}

fruits.forEach((fruit) => {
console.log(fruit);
});

//functions

/*
function functionName() {
a + b;
}
*/

const add = (a,b) => {
const result = a + b;
return results;
};

if (a < b) {
console.log(b);
} else {
console.log(a);
}