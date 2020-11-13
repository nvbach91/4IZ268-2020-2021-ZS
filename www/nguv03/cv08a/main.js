// Jednoradkovy komentar

/* viceradkovy komentar
  dalsi radek
*/

//alert('Ahoj světe!');


// priklady prikazu
console.log('123');
console.error(456);

// var, let, const
var age = 12;
console.log(age);

let height = 170;
const width = 200;
console.log(height);
console.log(width);

age = 42;
console.log(age);
height = 100;
console.log(height);
// nelze dosadit do konstantni promenne
//width = 250;

// String, Number, Boolean, null, undefined, Symbol
const message = 'Ahoj, já jsem Pepa a chci se naučit JavaScript';
              //"Ahoj, já jsem Pepa a chci se naučit JavaScript";
              //`Ahoj, já jsem Pepa a chci se naučit JavaScript`;

console.log(message);

const nPeople = 25; // 3.14, 100.5, 
console.log(nPeople);


let isLive = true; // true / false
const isMarried = false; // true / false
console.log(isLive);
console.log(isMarried);

const something = null;
const somethingElse = undefined;

console.log(typeof isLive);
console.log(typeof nPeople);
console.log(typeof message);


// concatenation / zretezeni / nalepeni stringu do sebe / vlozeni stringu do stringu
const string = 'string1' + ' ' + 'string2 ' + message;
console.log(string);
const msg2 = 'lidí';
const stringTemple = `Je nás tady ${nPeople} ${msg2}`;
console.log(stringTemple);

console.log(msg2.length);
console.log(msg2.toUpperCase());
console.log(msg2.toLowerCase());

console.log(msg2.slice(0, 2));
console.log(msg2.slice(1, 3));

console.log(msg2.split(''));

const EULER_NUMBER = 2.3;
// const myFavoriteTelevisionChannel;
// const MyChannel;


// objects
const person = {
    name: 'David',
    age: 40,
    hobbies: ['sport', 'music'],
};

console.log(person.name);
console.log(person.age);

// pole / arrays
const fruits = ['strawberry', 'apple', 'orange', true, 42, null, undefined];

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
console.log('------------------');
// cykly / loops
for (let i = 0; i < fruits.length; i++) {
    console.log(i, fruits[i]);
}

console.log('------------------');
let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

console.log('------------------');
fruits.forEach((fruit) => {
    console.log(fruit);
});


// functions
// function functionName() {};
const add = (a, b) => {
    // const result = a + b;
    // return result;
    return a + b;
};

const res = add(1, 2);
console.log(res);


if (isLive) {
    console.log('it is live');
}

isLive = false;

if (isLive) {
    console.log('adqwe it is live abcde');
} else {
    console.log('it is not live');
}


