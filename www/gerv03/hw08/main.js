/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const birthDate = 1999;
const pepesAge = new Date().getFullYear() - birthDate;
console.log('Pepe is ' + pepesAge + ' years old.');


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

const celsius = 20;
const fahrenheiht = 68;

const countFahrenheit = (celsius * 9 / 5) + 32;
const couuntCelsius = (fahrenheiht - 32) * 5 / 9;
console.log(celsius + '°C = ' + countFahrenheit + '°F resp. ' + fahrenheiht + '°F=' + couuntCelsius + '°C');


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

const countAge = (birthDate) => {
    return new Date().getFullYear() - birthDate + ' years old.';
}

console.log('Pepe is ' + countAge(1999));
console.log('Pepe is ' + countAge(2000));

const FromCelsiusToFahrenheit = (celsius) => {
    return celsius + '°C = ' + ((celsius * 9 / 5) + 32) + '°F';
}
console.log(FromCelsiusToFahrenheit(25));
console.log(FromCelsiusToFahrenheit(20));

const FromFahrenheintToCelsius = (fahrenheit) => {
    return fahrenheit + '°F = ' + ((fahrenheit - 32) * 5 / 9) + '°C'
}
console.log(FromFahrenheintToCelsius(68));
console.log(FromFahrenheintToCelsius(77));

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

const dividing = (a, b) => {
    if (b === 0) {
        return ("You can't divide by zero")
    }
    else {
        return (a + ' is ' + ((a / b) * 100).toFixed(2) + '% from ' + b);
    }
}

console.log(dividing(20, 40));
console.log(dividing(20, 0));



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

const compare = (a, b) => {
    if (a === b) {
        return 'The numbers are equal';
    }
    else if (a > b) {
        return a;
    }
    else {
        return b;
    }
};

console.log(compare(40, 20));
console.log(compare(20, 20));
console.log(compare(20, 40));


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

const multiply13 = () => {
    for (var i = 0; i * 13 <= 730; i++) {
        console.log(i * 13);
    }
}

console.log(multiply13());

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

const circle = (a) => {
    return (Math.PI * Math.pow(a, 2)).toFixed(2) + ' cm²';
}

console.log(circle(8));


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

const cone = (h, r) => {
    return (1 / 3 * Math.PI * Math.pow(r, 2) * h).toFixed(2) + 'cm³';
}

console.log(cone(10, 6));


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

const triangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    }
    else {
        return false;
    }
}
console.log(triangle(2, 2, 2));
console.log(triangle(4, 82, 3));



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

const heroicTriangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        var s = (a + b + c) / 2;
        return S = Math.sqrt((s * (s - a) * (s - b) * (s - c))).toFixed(2) + 'cm²';
    }
    else {
        return 'This is not possible';
    }
}
console.log(heroicTriangle(3, 4, 5));

