/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const birth = 1995;
let age = new Date().getFullYear() - birth;
console.log('Pepému je ' + age + ' let.');

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

const cels = 20;
const fahr = 68;

let fahrFromCels = cels * 9 / 5 + 32;
let celsFromFahr = (5 / 9) * (fahr - 32);

console.log(cels + '°C = ' + fahrFromCels + '°F resp. ' + fahr + '°F = ' + celsFromFahr + '°C.');

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

function ageByYear(birth) {
    age = new Date().getFullYear() - birth;
    return age;
}

function celsFahrConversion(temp, isCelsius) {
    if (isCelsius) {
        const fahrenheit = temp * 9 / 5 + 32;
        const conversion = (temp + '°C = ' + fahrenheit + '°F.');
        return conversion;

    } else {
        const celsius = (5 / 9) * (temp - 32);
        const conversion = (temp + '°F = ' + celsius + '°C.')
        return conversion;
    }
}

console.log(ageByYear(2003));
console.log(ageByYear(2021));
console.log(celsFahrConversion(25, true));
console.log(celsFahrConversion(43, false));

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

function percentage(a, b) {
    if (b == 0) {
        console.warn("You can't divide by zero, mortal fool!")
    } else {
        const result = ((a / b) * 100).toFixed(0);
        console.log(a + ' je ' + result + '% z ' + b + '.');
        return result;
    }
}

console.log(percentage(10, 300));
console.log(percentage(10, 0));

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

function returnGreater(a, b) {
    if (a > b) {
        return a;
    } else if (b > a) {
        return b;
    } else {
        console.log('Čísla se rovnají.');
    }
}

console.log(returnGreater(10, 12))
console.log(returnGreater(6.4, 6.5))
console.log(returnGreater(1 / 2, 1 / 4))
console.log(returnGreater(2 / 4, 4 / 8))

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

function whatIsEvenThat() {
    for (let i = 0; i <= 730; i = i + 13) {
        console.log(i);
    }
}

whatIsEvenThat();

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

function circleArea(radius) {
    //Math.PI
    const area = Math.PI * Math.pow(radius, 2)
    return area;
}

console.log(circleArea(10));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

function trafficConeVol(height, radius) {
    return (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
}

console.log(trafficConeVol(5, 2))

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

function doYouEvenTriangle(a, b, c) {
    if ((a + b > c) &&
        (b + c > a) &&
        (c + a > b)) {
        return true;
    } else {
        return false;
    }
}

console.log(doYouEvenTriangle(1, 1, 1));
console.log(doYouEvenTriangle(1, 1, 2));
console.log(doYouEvenTriangle(10, 15, 20));

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function whyHeron(a, b, c) {
    if (doYouEvenTriangle(a, b, c)) {
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else {
        console.warn("That's no triangle... it's a flying car!");
    }
}

console.log(whyHeron(4, 13, 15));
console.log(whyHeron(1, 1, 2));
console.log(whyHeron(0, 0, 0));
console.log(whyHeron(-1, -1, -1));

