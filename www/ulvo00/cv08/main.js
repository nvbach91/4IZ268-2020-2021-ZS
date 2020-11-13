//komentar na jednu radku
/*na vice
radku*/

//tyto konzole vypisou zpravu do konzole
console.log('Ahoj světe!');
console.error('Hele chyba!');
console.warn('Upozorneni!');

//tyto prikazy vyhodi hlasku v oknu
//alert('Vyskocilo upozorneni!');
//prompt('Enter your name:');

//deklerace promenych var(pry uz se moc nepouziva), let, const
let age = 42;
console.log(age);
const PI  = 3.14;
console.log(PI);
//let umoznuje menit se ale const ne
age = 12;
console.log(age);
//PI = 5;
//console.log(PI);

//datove typy - String, Number, Boolean, null, undefined, Symbol

const E = 2.9; //Number - integer nebo double nebo float
const message = 'Ahoj, jmenuji se Pepa a chci se naucit JS!';
const message2 = "Lze pouzit i uvozovky, ale nedoporucuje se!";
const isLive = true;
const isMarried = false;
const nic = null;
const nevim = undefined;
console.log(E, message, message2, isLive, isMarried, nic, nevim);

//vypsání datového typu
console.log(typeof isLive);
console.log(typeof message);

//stringy detailně / retezce
const string1 = 'Ahoj';
const string2 = 'světě!';
//concatenation neboli retezeni
const string = string1 + ' ' + string2;
console.log(string);

console.log('Hodnota PI = '+PI)

const myAge = 21;
const name = 'Ulvr Ondřej';
const str = `Ahoj, jmenuji se ${name}, a je mi ${myAge} let`;
console.log(str);

console.log(name.length);
console.log(name.toUpperCase());
console.log(name.toLowerCase());

console.log(name.slice(0, 4));
console.log(name.slice(5, 11));
console.log(name.slice(5, 11));
console.log(name.split(' '));
console.log(name.split(''));


//pole - arrays
const fruits = ['Ananas', 'Banán', 'Meloun', 'Jahoda', null];
console.log('Máme v kosiku ' + fruits.length + ' typy ovoce.');

const numbers = [0, 1, 2, 3, 4];
console.log(numbers);

console.log(fruits[0]);
console.log(fruits[3]);

//cykly!!
console.log('--------------');
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

console.log('--------------');
let i = 0;
while (i < fruits.length) {
    console.log(i, fruits[i]);
    i++;
}

console.log('--------------');
//pridani na konec
fruits.push('Pomeranc');
console.log(fruits);
//odebrani prvniho
fruits.shift();
console.log(fruits);
//pridani na prvni misto
fruits.unshift('Jablko');
console.log(fruits);


//objekty
console.log('--------------');
const person = {
    age: 42,
    narodnost: 'CZ',
    name: 'Pepa',
    surname: 'Omacka'
};
console.log(person);
console.log(person.narodnost + ' ' + age);

const people = [
    {
        age: 12,
        name: 'david'
    }, 
    {
        age: 15,
        name: 'jan'
    }, 
    {
        age: 17,
        name: 'michal'
    }, 
];

for (let i = 0; i < people.length; i++) {
    console.log(people[i].name + ' ' + people[i].age);
}

people.forEach((person) => {
    console.log(person);
});


//conditions podminky
console.log('--------------');
if (isMarried) {
    console.log(123);
} else {
    console.log(456);
};

//funkce
console.log('--------------');
// const add = function () {};
const add = (a, b) => {
    //const result = a + b;
    //return result;
    return a + b;
};

console.log(add(2, 3));