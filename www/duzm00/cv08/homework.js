/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const pepeBirthYear = 1997;
let age = new Date().getFullYear() - pepeBirthYear;
console.log("Pepe is " + age + ' years old.')


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

function celsiusToFarenheit(celsius) {
    return ((celsius * 9) / 5) + 32;
}

function farenheitToCelsius(farenheit) {
    return ((farenheit - 32) * 5) / 9;
}

let celsius = farenheitToCelsius(68);
let farenheit = celsiusToFarenheit(20);

console.log(celsius + " °C = " + farenheit + ' °F')

console.log(farenheit + " °F = " + celsius + ' °C')



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function showPepeAgeByBirthYear(pepeBirthYear) {
    let age = new Date().getFullYear() - pepeBirthYear;
    console.log("Pepe is " + age + ' years old.')
}
showPepeAgeByBirthYear(1998);

function showFarenheitToCelsius(farenheit) {
    console.log(farenheit + " °F = " + farenheitToCelsius(farenheit) + ' °C')
}
showFarenheitToCelsius(67);


function showFarenheitToFarenheit(celsius) {
    console.log(celsius + " °C = " + celsiusToFarenheit(celsius) + ' °F')
}
showFarenheitToFarenheit(21);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function getPrecentageNumberFromBase(part, base) {
    if (base === 0) throw "Function exception: base number cannot be zero";
    const one = base / 100;
    const percentage = (part / one).toFixed();
    console.log(part + " is " + percentage + "% z " + base)
}
getPrecentageNumberFromBase(21, 42);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function whatIsBugger(num1, num2) {
    if (num1 === num2) console.log("Numbers are equal.")
    else if (num1 > num2) {
        console.log("First number is bigger.")
    } else {
        console.log("Second number is bigger.")
    }
}

whatIsBugger(1, 2);
whatIsBugger(1.2, 1);
whatIsBugger(1 / 2, 1);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

(() => {
    for (let index = 1; index <= 730; index *= 13) {
        console.log(index);
    }
})();


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here


function getCircleArea(radius) {
    return Math.PI * radius * radius;
}

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here


function getConeArea(radius, height) {
    return Math.PI * radius * radius * height;
}


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

function canIMakeATriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) return true;
    else return false;
}

function showCanIMakeATriangle(a, b, c) {
    if (canIMakeATriangle(a, b, c)) console.log("yes");
    else console.log("no");
}


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function heroicFormula(a, b, c) {
    if (canIMakeATriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else throw "Function exception: cannot build a triangle";
}
