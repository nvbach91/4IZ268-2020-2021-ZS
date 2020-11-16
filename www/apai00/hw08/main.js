/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
const birthday = 1997;
const age = 2020 - birthday;
console.log('He has ' + age + ' years old.');




/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
const celsius = 20;
const fahrenheiht = 68;
const mathFahrenheit = ((celsius * 9) / 5) + 32;
const mathCelsius = ((fahrenheiht - 32) * 5) / 9;
console.log(celsius + ' °C = ' + mathFahrenheit + ' °F');
console.log(fahrenheiht + ' °F = ' + mathCelsius + ' °C');





/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
const countAge = (birthday) => {
    return new Date().getFullYear() - birthday;
};
console.log('He has ' + countAge(1997) + ' years old.');
console.log('He has ' + countAge(2000) + ' years old.');

const countCelsius = (celsius) => {
    return celsius + ' °C = ' + Math.round(((celsius * 9) / 5) + 32) + ' °F';
};

const countFahrenheiht = (fahrenheiht) => {
    return fahrenheiht + ' °F = ' + Math.round(((fahrenheiht - 32) * 5) / 9) + ' °C';
};

console.log(countCelsius(100));
console.log(countCelsius(200));
console.log(countFahrenheiht(100));
console.log(countFahrenheiht(200));





/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here




const FCE = (a, b) => {
    if (b != 0) {
        return (a / b) * 100;
    } else {
        return "You can´t divide by zero!!!"
    }
};
const numA = 21;
const numB = 42;
const result = FCE(numA, numB);
console.log(numA + ' je ' + result.toFixed(2) + '% ze ' + numB + '.');




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

const number = (x, y) => {
    if (x === y) {
        console.log("The numbers are same!!! => " + "x=" + x + " y=" + y)
    } else if (x > y) {
        console.log(x + " => x=" + x.toFixed(2) + ">y=" + y.toFixed(2))
    } else {
        console.log(y + " => x=" + x.toFixed(2) + "<y=" + y.toFixed(2))
    }
};

let example1 = number(100, 100);
let example2 = number(100 / 2, 100 / 3);
let example3 = number(100.100, 100.111);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
console.log("-------------------------begin------------------------------");
let howMuch = 0;
const thirteen = () => {
    for (let i = 0; i * 13 <= 730; i++) {
        howMuch = howMuch + 1;
        const summary = i * 13;
        console.log(summary);
    }
};
thirteen();
console.log("Total is: " + howMuch);
console.log("--------------------------end-----------------------------");


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

const circle = function(r) {
    const pi = Math.PI;
    const pow = Math.pow(r, 2);
    const summary = pi * pow;
    console.log(summary);
};
circle(10);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

const coneVolume = (r, s) => {
    if (r == 0 || s == 0) {
        console.log("Zero is not acceptable")
    } else {
        const pi = Math.PI;
        const pow = Math.pow(r, 2);
        const summary = (1 / 3) * pi * pow * s;
        console.log(summary);
    }
};

coneVolume(10, 100);
coneVolume(10, 0);
coneVolume(0, 0);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

const triangle = (a, b, c) => {
    if (a + b > c && b + c > a && a + c > b) {
        console.log(true);
        console.log("a=" + a + " b=" + b + " c=" + c);
    } else {
        console.log(false);
        console.log("a=" + a + " b=" + b + " c=" + c);
    }
};
triangle(1, 2, 3);
triangle(4, 3, 3);
triangle(3, 4, 3);
triangle(3, 3, 4);



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

const triangleHeroic = (a, b, c) => {
    if (a + b > c && b + c > a && a + c > b) {
        const s = (a + b + c) / 2
        const result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(result.toFixed(0));
    } else {
        console.log('This is not a triangle');
    }
}
triangleHeroic(3, 2, 1);
triangleHeroic(10, 20, 20);