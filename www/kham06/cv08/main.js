console.log('Ahoj pidor') // prosto pokazivaetsa v console
console.error('Hele chyba')// pokazivaet oshibku v console
console.warn('upozorneni')// pokazivaet warning prompt stroka

//var,let,const  - var se ne pouziva
let age = 20;
console.log(age);

const height = 170;
console.log(height);

age= 12 ;
console.log(age);


//let mozno izmenit jestli napises nize jeste jednou stroku

//String, Number, Boolean, null, undefined, Symbol
const pi = 3.14; // number- integer, double, float
const message = 'Ahoj, jsem Mad and im mad'
console.log(message);

const isLive = true;
const isMarried = false;

console.log(isLive,isMarried);

const something = null;
const somethingElse = undefined;
console.log(something,somethingElse);

console.log(typeof isLive);
console.log(typeof message);
console.log(typeof pi)

//string / retezce
const string1 = 'Ahoj';
const string2 = 'Sveta';
//concatenation / zretezeni;
const string = string1 + ' ' + string2;
console.log (string);

console.log('Hodnota PI =' + pi);

const MyAge = 19;
const MyName = 'Madi';
const str = `Ahoj, jmenuji se ${MyName} a je mi ${MyAge} let`;
console.log(str);

console.log(MyName.length);//dlina slova
console.log(MyName.toUpperCase());//bolshie bukvy
console.log(MyName.toLowerCase());//malenkie bukvy

console.log(MyName.slice(0, 2));// ot nachala slova do 2 bukvy obrezaet 'Ma'
console.log(MyName.slice(1,3));
console.log(MyName.split('a'))//rozdelyaet slovo na bukvy krome vydelenou 'M' 'di'


//pole/arrays
const fruits = ['ananas','banan','meloun','jahoda']
console.log('We have ' + fruits.length + ' fruits')// pokazivaet cislo fruktov 'we have 4 fruits'
const numbers = [0, 1, 2, 3, 4];
console.log(numbers);// pokazivaet cisla

console.log(fruits[0]);
console.log(fruits[1]);
console.log(fruits[2]);//pokazivaet vtoroi frukt

console.log('-----------------')
for ( let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);
}

console.log('-----------')
let i = 0;
while(i < fruits.length){
    console.log(fruits[i]);
    i++;
}
fruits.push('orange');
console.log(fruits);
fruits.shift();
console.log(fruits);
fruits.unshift('apple');
console.log(fruits);

//objects
const person = {
    age: 42,
    nationality: 'ASLAN',
    name: 'i love it when u call me',
    surname: 'BigPoppa'
}
console.log(person.name + ' ' + person.surname)

const people = 
[
    {age:12, name:'David',}
    {age:22,name:'Bro',}
    { age:30,name:'Megan',}
    {age:40,name:'Daddy',}
]
for(let i = 0; i < people.length; i++){console.log(people[i].name + ' '+ people[i].age);}
people.forEach((person)=>{
    console.log(123);});

//conditionals, if else
if(isMarried){
    console.log(123);
} else {
    console.log(456);
}
//funtiomcs
//const add = function() {}
const add = (a, b) => {
    //const result = a+b;
    //return result;
    return a + b;
};
console.log(add(2,3))