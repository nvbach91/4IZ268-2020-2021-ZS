/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
const birthYear = 1997;
const age = new Date().getFullYear() - birthYear;
console.log(`Pepopvi je ${age}`);


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

const celsius = 20;
const fahrenheit = 68;

console.log(`${celsius}°C =  ${celsius * 9 / 5 + 32}°F \n${fahrenheit}°F = ${(fahrenheit - 32) * 5 / 9}°C`)


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

const toCelsius = (fahrenheit) => {
    if(!isNaN(fahrenheit)) return  'NaN';
    const celsius = (fahrenheit - 32) * 5 / 9;
    console.log(`${fahrenheit}°F = ${celsius}°C`)

}
const toFahrenheit = (celsius) => {
    if(!isNaN(celsius)) return  'NaN';
    const fahrenheit = celsius * 9 / 5 + 32;
    console.log(`${celsius}°F = ${fahrenheit}°C`)
}

const calcAge = function (person) {
    const age = new Date().getFullYear() - person.birthYear;
    console.log(`${person.name} je ${age}`);
}

const karel = {
    name: 'Karel',
    birthYear: 2000
}

calcAge(karel);

toCelsius(20);
toFahrenheit(30)

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

const censored = (x, y) => {
    if (isNaN(x) || isNaN(y) || y == 0) {
        return console.log("not valid inputs")
    }
    const percentage = ((x / y) * 100).toFixed(2);
    console.log(`${x} je ${percentage}% z ${y}`)
}

censored(10, 20)
censored("ok", 'ok');
censored(10, 0)
censored(33, 33);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

const maxNumber = (x, y) => {

    if (isNaN(x) || isNaN(y)) {
        console.log("Invalid inputs");
    }
    if (x === y) {
        console.log("Numbers are equal");
    }

    const max = Math.max(x, y);
    if (isNaN(max)) {
        console.log("Invalid inputs");
    } else {
        console.log(max);
    }
}

maxNumber(1, 2);
maxNumber(2, 0)
maxNumber(3, 3);
maxNumber("3", "4");
maxNumber('dd', "asdf")

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

const nasobeni = function (number, limit) {
    for (let i = number; i <= limit; i += number) {
        console.log(i);
    }
}

nasobeni(13, 730)


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

const circle = function (radius) {
    if (isNaN(radius) && radius <= 0) return 'Invalid input.';
    return Math.PI * radius ** 2;
}

console.log(circle(5))


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here


const cone = function (height, radius) {
    if (isNaN(height) || isNaN(radius) || height <= 0 || radius <= 0) return 'Invalid input.';
    return circle(radius) * (1 / 3) * height;
}

console.log(cone(5, 3))
console.log(cone(7.8, 3.3))

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

const isTriangle = function (x, y, z) {
    if (x >= y + z || y >= x + z || z >= x + y) return false;
    return true
}

console.log(isTriangle(1, 2, 3))


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

const heronsFormula = function (x, y, z) {
    if (isTriangle(...arguments)) {
        const s = (x + y + z) / 2
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}