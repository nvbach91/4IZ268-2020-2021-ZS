/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
console.log('1)');
let age = 42;
console.log('Pepe is ' + age + ' years old.');
age = 16;
console.log('Pepe is ' + age + ' years old.');
/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
console.log('2)');
let celsius = 20;
console.log(`${celsius}°C = ${celsius * 9 / 5 + 32}°F`);
let fahrenheiht = 68;
console.log(`${fahrenheiht}°F = ${(fahrenheiht - 32) * 5 / 9}°C`);
/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
console.log('3)');
function pepeAge(age) {
    if (typeof age != 'number') {
        console.error('Pepe`s age can only be a number!');
    } else if (age < 0) {
        console.warn('Pepe can`t be younger than 0 years old');
    } else {
        console.log('Pepe is ' + age + ' years old.');
    }
}
pepeAge(2);
pepeAge(2.2);
pepeAge(2.4444444444444444444);
pepeAge(2222222222222222222222222222222222222222);
pepeAge('a');
pepeAge('2');
pepeAge(-5);
console.log('===============================');
function celsiusToFahrenheiht(temperature) {
    if (typeof temperature != 'number') {
        console.error('Temperature must be a number');
    } else if (temperature < -273.15) {
        console.warn('Temperature can`t be below absolute zero.');
    } else {
        console.log(`${temperature}°C = ${temperature * 9 / 5 + 32}°F`);
    }
}
celsiusToFahrenheiht(2);
celsiusToFahrenheiht(-300);
celsiusToFahrenheiht('asd');
celsiusToFahrenheiht(25.55);
console.log('===============================');
function fahrenheihtToCelsius(temperature) {
    if (typeof temperature != 'number') {
        console.error('Temperature must be a number');
    } else if (temperature < -459.67) {
        console.warn('Temperature can`t be below absolute zero.');
    } else {
        console.log(`${temperature}°F = ${(temperature - 32) * 5 / 9}°C`);
    }
}
fahrenheihtToCelsius(666);
fahrenheihtToCelsius(-460);
fahrenheihtToCelsius('JS is awesome');
fahrenheihtToCelsius(6.66);
/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
console.log('4)');
function percentage(a, b) {
    if (typeof a != 'number' || typeof b != 'number') {
        console.error('Both arguments must be numbers!');
    } else if (a <= 0 || b <= 0) {
        console.warn('Both numbers must be positive!');
    } else {
        console.log(`${a} is ${(a / b * 100).toFixed(2)}% of ${b}`);
    }
}
percentage(21, 42);
percentage(-21, 42);
percentage('a', 42);
percentage(100, 0);
/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
console.log('5)');
function biggerNumber(a, b) {
    if (typeof a != 'number' || typeof b != 'number') {
        console.error('Both arguments must be numbers!');
        return null;
    } else if (a == b) {
        console.log('Given numbers are equal!');
        return null;
    } else if (a > b) {
        console.log(`${a} is bigger than ${b}`);
        return a;
    } else {
        console.log(`${b} is bigger than ${a}`);
        return b;
    }
}
let result = biggerNumber('a', 8);
console.log(result);
result = biggerNumber(666, 666);
console.log(result);
result = biggerNumber(-220, 400);
console.log(result);
result = biggerNumber(400, -220);
console.log(result);
result = biggerNumber(0.00000001, 0.00000002);
console.log(result);
result = biggerNumber(1/3, 2/7);
console.log(result);
/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
console.log('6)');
for (let i = 0; i <= 730; i+=13) {
    console.log(i);
}
/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
console.log('7)');
function circleArea(radius) {
    if (typeof radius != 'number') {
        console.error('Radius must be number!');
    } else if (radius <= 0){
        console.warn('Radius must be positive!');
    } else {
        console.log('Area of a given circle is: ' + (radius**2)*Math.PI + ' or: ' + radius**2 + '\u03C0');
    }
}
circleArea(2);
circleArea('a');
circleArea(-2);
circleArea(2.222222);
/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
console.log('8)');
function coneVolume(height, radius) {
    if (typeof height != 'number' || typeof radius != 'number') {
        console.error('Height and radius must be number!');
    } else if (height < 0 || radius < 0) {
        console.warn('Height and radius must be positive!');
    } else {
        console.log(`Volume of cone is: ${1/3*(radius**2)*height*Math.PI} or: ${1/3*(radius**2)*height}\u03C0`);
    }
}
coneVolume(12,2);
coneVolume(12,-2);
coneVolume('a',2);
/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
console.log('9)');
function isTriangle(a,b,c) {
    if (typeof a != 'number' || typeof b != 'number' || typeof c != 'number') {
        console.error('All values must be numbers!');
        return false;
    } else if (a <= 0 || b <= 0 || c <= 0) {
        console.warn('All numbers must be positive for triangle!');
        return false;
    } else if (a + b <= c || a + c <= b || b + c <= a) {
        console.log('false/no');
        return false;
    } else {
        console.log('true/yes');
        return true;
    }
}
isTriangle('a');
isTriangle();
isTriangle(-2,5,6);
isTriangle(1,2,3);
isTriangle(2,2,3);
isTriangle(301,300,600);
/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
console.log('10)');
function areaTriangle(a,b,c) {
    if (!isTriangle(a,b,c,)) {
        console.log('Not a triangle');
    } else {
        let s = (a+b+c)/2;
        console.log(`Area of given triangle is: ${Math.sqrt(s*(s-a)*(s-b)*(s-c))}`);
    }
}
areaTriangle('a');
areaTriangle();
areaTriangle(-2,5,6);
areaTriangle(2,2,3);
areaTriangle(3,4,5);
//author Pavlo Prykhnenko