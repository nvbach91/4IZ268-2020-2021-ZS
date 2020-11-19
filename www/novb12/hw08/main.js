/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var birthYearOfPepe = 1945;
var year = 2020;
var pepesAge = (year - birthYearOfPepe);
var pepesAgeSentence = 'Pepe is ' + pepesAge + ' years old.';

console.log(pepesAgeSentence);


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var temperatureCelsius = function (a) {
    return a - (32 * 5) / 9 + ' °C';
}

console.log(temperatureCelsius(68));

var temperatureFahrenheit = function (a) {
    return (a * 9) / 5 + 32 + ' °F';
}

console.log(temperatureFahrenheit(20));


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

var temperatureCelsius = function (a) {
    return a - (32 * 5) / 9 + ' °C';
}

console.log(temperatureCelsius(68));

var temperatureFahrenheit = function (a) {
    return (a * 9) / 5 + 32 + ' °F';
}

console.log(temperatureFahrenheit(20));


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

var mathFunction = function (a, b) {
    result = (100 * a) / b;
    if (b != 0) {
        return a + ' je ' + result.toFixed(2) + '%' + ' z ' + b;
    } else {
        return 'Nulou nelze dělit!';
    }
}

console.log(mathFunction(1, 2));


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

var numCompare = function (a, b) {
    if (a != b) {
        if (a < b) {
            return b;
        } else {
            return a;
        }
    } else {
        return 'Číselné hodnoty se rovnají.';
    }
}

numCompare1 = numCompare(0, 0);
numCompare2 = numCompare(0.1, 0.2);
numCompare3 = numCompare(1 / 2, 2 / 3);

console.log(numCompare2 = numCompare(0.1, 0.2));
console.log(numCompare2 = numCompare(1 / 2, 2 / 3));



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

function multiples() {
	for (i = 13; i <= 730; i += 13) {
        console.log(i);
    }
}

multiples();


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

var circleArea = function (r) {
    return Math.PI * Math.pow(r, 2);
}

console.log(circleArea(2));


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

var coneVolume = function (v, r) {
    return 1 / 3 * Math.PI * Math.pow(r, 2) * v;
}

console.log(coneVolume(2, 5));


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

var isTriangle = function (a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        s = a + b + c / 2
        return true;
    } else {
        return false;
    }
}

console.log(
    isTriangle(10, 5, 3)
);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

var triangleArea = function (a, b, c) {
    if (a + b > c && a + c > b && b + c > a) {
        s = a + b + c / 2
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else {
        return 'Toto není trojuhelník - hodnoty stran nesplňují trojúhelníkovou nerovnost.';
    }
}

console.log(
    triangleArea(4, 2, 3));

console.log(
    triangleArea(20, 5, 6));