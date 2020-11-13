// komentáře
/* 
    komentář
    */
console.log('Ahoj Péťo');
console.error('Hele, chyba');
console.warn('Upozornění');


//Var, let, const

let age = 42; //uloženou hodnotu jde později změnit
console.log(age);

const height = 178; //je to konstanta, nejde později změnit
console.log(height);


const pi = 3.14; // Number - integer, double, float
const message = 'Ahoj, jmenuje se Petr a chci se naučit js';

const isAlive = true;
const isMarried = false;

const something = null;
const unknown = undefined;

console.log(typeof isAlive);

//Spojování stringů

const string1 = 'Ahoj';
const string2 = 'Péťo';

const string = string1 + ' ' + string2;
console.log(string);

console.log('Hodnota pi = ' + pi);

const name = 'Petr';
const myAge = '21';
const str = `AHoj, jmenuji se ${name} a je mi ${myAge} let.`;

console.log(str);
console.log(name.length);

//Pole
const fruits = ['Jablko', 'Pomeranč', 'Jahoda', 'Hruška'];

//délka pole je ,length

console.log(fruits.length);

for (let a = 0; a < fruits.length; a++)
{
    console.log(fruits[a]);
}

let i = 0; 
while (i < fruits.length)
{
    console.log('i je '+ i + ' ' + fruits[i]);
    i++;
}

//Objekty
const person = {
    age: 42,
    nationality: 'Czech Republic',
    name: 'Petr',
    surname: 'Klepetko'
}

console.log(person.name + ' ' + person.surname);

const people = [
    {
        age: 12,
        name: 'Pavel'
    },
    {
        age: 24,
        name: 'Týna'
    },
    {
        age: 21,
        name: 'Týna'
    }
]

//foreach
people.forEach ((person) => {
    console.log(person);
})

//Podmínky
klepiJeNejlepsi = true;
if (klepiJeNejlepsi) {
    console.log('Svět je v pořádku. ');
}
else {
    //nothing to be there anyway.
}

//funkce
//cont add = function () {};
// kulaté závorky = argument
// add ... název
// {body}
const add = (a, b) => {
    const result = a + b;
    return result;
};

console.log(add(1, 2));