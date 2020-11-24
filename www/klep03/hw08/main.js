/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

console.log('Úkol 1:');
let pepaBirthDate = 1998;
let yearNow = new Date().getFullYear();
let pepaAge = yearNow - pepaBirthDate;
console.log('Pepa\'s age is ' + pepaAge);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

console.log('Úkol 2:');
let temperatureCelsius = 20;
let calculatedFahrenheit = temperatureCelsius * 9 / 5 + 32;
let temperatureFahrenheit = 68;
let calculatedCelsius = (temperatureFahrenheit - 32) / 9 * 5;

console.log(temperatureCelsius + '°C = ' + calculatedFahrenheit + '°F');
console.log(temperatureFahrenheit + '°F = ' + calculatedCelsius + '°C');

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

console.log('Úkol 3:');
const getPepaDate = (year) => {
    let yearNow = new Date().getFullYear();
    let pepaAge = yearNow - year;
    console.log('Pepa\'s age is ' + pepaAge);
}

const CtoF = (c) => {
    let f = c * 9 / 5 + 32;
    console.log(c + '°C = ' + f + '°F');
}

const FtoC = (f) => {
    let c = (f - 32) / 9 * 5
    console.log(f + '°F = ' + c + '°C');
}
getPepaDate(2000);
CtoF(30);
FtoC(86);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

console.log('Úkol 4:');
const function4 = (a, b) => {
    if (b != 0 && a != null && b != null) {
        solution = 100 * a / b;
        return a + ' je ' + solution.toFixed(2) + '% z ' + b;
    }
    else {
        return 'User input is invalid. Either a bad number of arguments or dividing by zero. ';
    }

}

console.log(function4(3, 9));

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

console.log('Úkol 5:');
const function5 = (a, b) => {
    if (a != null && b != null) {
        if (a > b) {
            return 'a(' + a + ') > b(' + b + ')';
        }
        else if (a < b) {
            return 'a(' + a + ') < b(' + b + ')';
        }
        else {
            return 'a(' + a + ') = b(' + b + ')';
        }
    }
    else {
        return 'Invalid input';
    }
}

console.log(function5(1, 4));
let first = function5(1, 4);

console.log(function5(2, 1));
let second = function5(2, 1);

console.log(function5(5, 5));
let third = function5(5, 5);

console.log(function5(1));
console.log(function5());
console.log(function5('ahoj'));

/**
 * 6) I can clearly see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

console.log('Úkol 6:');

for (let i = 0; i <= 730; i += 13) {
    console.log(i);
}

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

const circleArea = (radius) => {
    let area = radius * radius * Math.PI;
    return area;
}

console.log('Úkol 7:');
console.log('Obsah kruhu je: ' + circleArea(10));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

const volumeCone = (radius, height) => {
    let volume = radius * radius * Math.PI * height / 3;
    return volume;
}

console.log('Úkol 8:');
console.log('Objem kuželu je: ' + volumeCone(10, 2));

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

const isTriangle = (a, b, c) => {
    if (a + b > c && b + c > a && a + c > b && a != null & b != null && c != null) {
        return true;
    }
    else {
        return false;
    }
}

console.log('Úkol 9:');
console.log('Odpověď: ' + isTriangle(10, 2, 10));

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

const areaTriangle = (a, b, c) => {
    if (isTriangle(a, b, c)) {
        let s = (a + b + c) / 2;
        let area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return area;
    }
    else {
        return 'Not a triangle';
    }
}

console.log('Úkol 10:');
console.log('Obsah je: ' + areaTriangle(3, 4, 5));