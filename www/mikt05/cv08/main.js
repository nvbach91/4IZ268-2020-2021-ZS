console.log('Ahoj světe!')
console.error('Hlásím error!')
console.warn('Upozornění')

//let (můžu měnit v průběhu), const (neměnná proměnná)
let age = 20;
console.log(age);

const height = 170;
console.log(height);

age = 12;
console.log(age);

//String, Number, Boolean, null, undefined, Symbol
const pi = 3.14;
console.log(pi);
const message = 'Ahoj, jsem Tobi a todle je moje zpráva.'
//stále musím proměnnou vypsat konzolí
console.log(message);

const isLive = true;
const isMarried = false;

console.log(isLive, isMarried);
//vypíše mi hodnoty proměnných isLive a isMarried

const something = null;
const somethingElse = undefined;
console.log(something, somethingElse);

console.log(typeof isLive);
console.log(typeof message);
console.log(typeof pi)
//konzole mi vypíše jaký typ jsou proměnné

//string / řetězce
const string1 = 'Ahoj';
const string2 = 'Světe';
//concatenation / zretezeni;
const string = string1 + ' ' + string2;
console.log(string);

console.log('Matematické pi=' + pi);

const MyAge = 21;
const MyName = 'Tobi';
const str = `Ahoj, jmenuji se ${MyName} a je mi ${MyAge} let`;
console.log(str);

console.log(MyName.length);
console.log(MyName.toUpperCase());
console.log(MyName.toLowerCase());
//čísluje (indexuje) se stejně jako v Javě od 0
console.log(MyName.slice(0, 2));
console.log(MyName.slice(1, 3));
console.log(MyName.split('o'))

//pole
const fruits = ['pineapple', 'banana', 'strawberry', 'kiwi']
console.log('We have ' + fruits.length + ' fruits')
const numbers = [0, 1, 2, 3, 4];
console.log(numbers);

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);

console.log('-----------------')
//cykly for
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

console.log('-----------')
let i = 0;
while (i < fruits.length) {
    console.log(fruits[i]);
    i++;
}
fruits.push('orange');
console.log(fruits);
fruits.shift();
console.log(fruits);
fruits.unshift('apple');
console.log(fruits);

//objekty
const person = {
    age: 42,
    nationality: 'Czech',
    name: 'Pepa',
    surname: 'Kral'
}
console.log(person.name + ' ' + person.surname)

const people =
    [
        { age: 12, name: 'David' },
        { age: 26, name: 'John' },
        { age: 50, name: 'Tobi' },
        { age: 94, name: 'George' }
    ]
for (let i = 0; i < people.length; i++) {
    console.log(people[i].name + ' ' + people[i].age);
}

people.forEach((person) => {
    console.log(123);
});

//conditionals
if (isMarried) {
    console.log(123);
} else {
    console.log(456);
}
//funkce
const add = (a, b) => {
    return a + b;
};
console.log(add(2, 3));
