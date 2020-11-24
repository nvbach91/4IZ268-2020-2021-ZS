/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here

const birthYear = 1972;
const pepesAge = new Date().getFullYear() - birthYear;
console.log('Pepe is ' + pepesAge + ' years old.');
//console.log(`Pepe is ${pepesAge} years old.`);


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here
const celsius = 20;
const fahrenheiht = 68;
const countedFahrenheit = celsius * 9 / 5 + 32;
const countedCelsius = (fahrenheiht - 32) * 5 / 9;
console.log(celsius + '°C = ' + countedFahrenheit + '°F resp. ' + fahrenheiht + '°F = ' + countedCelsius + '°C.');



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here
const countPepesAge = (birthYear) => {
    return new Date().getFullYear() - birthYear;
};

console.log('Pepe is ' + countPepesAge(1970) + ' years old.');
console.log('Pepe is ' + countPepesAge(1999) + ' years old.');

const countCelsiusToFahrenheit = (celsius) => {
    return celsius + '°C = ' + (celsius * 9 / 5 + 32) + '°F';
};

console.log(countCelsiusToFahrenheit(20));
console.log(countCelsiusToFahrenheit(30));

const countFahrenheitToCelsius = (fahrenheit) => {
    return fahrenheit + '°F = ' + ((fahrenheit - 32) * 5 / 9) + '°C';
};

console.log(countFahrenheitToCelsius(68));
console.log(countFahrenheitToCelsius(86));


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here
const getPercentageRate = (a, b) => {
    if (b === 0) {
        console.error('You can not divide by 0!!');
    } else {
        console.log((a + ' je ' + ((a / b) * 100).toFixed(2) + '% z ' + b));
    }
};

getPercentageRate(48, 73);




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

const compare = (x, y) => {
    if (x === y) {
        console.log("Cisla se rovnaji!")
    } else if (x > y) {
        console.log(x)
    } else {
        console.log(y)
    }
};

let attempt1 = compare(45, 45);
let attempt2 = compare(47.84, 123.45);
let attempt3 = compare(1 / 2, 1 / 3);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

const thirteen = () => {
    for (let i = 0; i * 13 <= 730; i++) {
        console.log(i * 13);
    }
};
/*const thirteen = () => {
    for (let i = 0; i < 730; i += 13) {
        console.log(i);
    }
};*/

thirteen();



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

const getCircleArea = (radius) => {
    console.log(Math.PI * Math.pow(radius, 2));
};

getCircleArea(5);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

const getConeVolume = (radius, height) => {
    console.log(1 / 3 * Math.PI * Math.pow(radius, 2) * height);
};

getConeVolume(4, 5);


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

const isTriangle = (x, y, z) => {
    if (x + y > z && x + z > y && y + z > x) {
        console.log('true/yes');
    } else {
        console.log('false/no');
    }
};

isTriangle(2, 3, 4);
isTriangle(2, 3, 44);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

const getTriangleArea = (x, y, z) => {
    if (x + y > z && x + z > y && y + z > x) {
        let s = ((x + y + z) / 2)
        console.log(Math.sqrt(s * (s - x) * (s - y) * (s - z)));
    } else {
        console.error('Triangle content cannot be calculated! Incorrectly entered edge lengths!');
    }
};

getTriangleArea(2, 3, 4);
getTriangleArea(2, 3, 44);