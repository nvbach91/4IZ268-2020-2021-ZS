console.log("Yo, světe.");
console.error("Dunno, asi chyba");

let age = 42;
console.log(age);

const height = 170;
console.log(height);

const pi = 3.14;
const message = "Yo";

console.log(message);

const isLive = true;
const isMarried = false;

console.log(isLive, isMarried);

const sumting = null;
const sumtingElse = undefined;

console.log(sumting, sumtingElse);

console.log(typeof isLive);
console.log(typeof message);
console.log(typeof pi);

const string1 = "YOOOOOOOOOOOOOOOOOOO";
const string2 = "ExTrA thicc světe";

const string = string1 + ' ' + string2;
console.log(string);

console.log('Hodnota PI = ' + pi);

const myAge = 130;
const myName = 'Pata';
 const str = `Yo, jmenuju se ${myName}, a je mi ${myAge} let.`;
 console.log(str);

 console.log(myName.length);
 console.log(myName.toLocaleUpperCase());
 console.log(myName.toLocaleLowerCase());

 console.log(myName.slice(1,3));
 console.log(myName.split(''));

 const fruits = ['Pineapple','Banana','Melon','Strawberry',null, undefined, false];
 console.log("We have " + fruits.length + " fruits")

 const numbers = [0, 1, 2, 3, 4];
 console.log(numbers);
 console.log(fruits[0]);

 for (let index = 0; index < fruits.length; index++) {
     console.log(fruits[index]);
 }

 let i = 0
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

fruits.push("orange");
console.log(fruits);
fruits.shift();
console.log(fruits);
fruits.unshift('apple');
console.log(fruits);

const person = {
    age: 42,
    nationality: "Czech Republic",
    name: "Luboš",
    surname: "Pata",
};
console.log(person.name + ' ' + person.surname);

const people = [
    {
        age: 12,
        name: 'David',
    },
    {
        age: 25,
        name: 'Lenny',
    },
    {
        age: 30,
        name: 'Carl',
    },
    {
        age: 22,
        name: 'Jane',
    },
];

for (let index = 0; index < people.length; index++) {
    console.log(people[index].name + ' ' + people[index].age);
}

people.forEach((person) =>{
    console.log(person);
});

if(isLive){
    console.log(123);
}
else
{
    console.log(456);
}

//const add = function() {};
const add = (a, b) => {
    return a + b;
};

console.log(add(2,3));