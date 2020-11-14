/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
console.log('1.');
const bornYear = 1999;
let thisYear = 2020;
resultYear = thisYear - bornYear;
console.log('Ahoj, já jsem Pepa a je mi ' + resultYear + ' let.');
console.log('----------------------------------------------');


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
console.log('2.');
const celsius = 20;
const fahrenheiht = 68;
result1 = (celsius * 9) / 5 + 32;
result2 = (fahrenheiht - 32) * 5 / 9;
console.log(celsius + '°C = ' + result1 + '°F');
console.log(fahrenheiht + '°F = ' + result2 + '°C');
console.log('----------------------------------------------');


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
console.log('3.');
const temperatureFah = (a) => {
    return (a * 9) / 5 + 32;
};
const temperatureCel = (a) => {
    return (a - 32) * 5 / 9;
};
console.log(temperatureFah(20));
console.log(temperatureCel(68));
console.log('----------------------------------------------');


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
console.log('4.');
const percent = (a, b) => {
    return (a / b) * 100;
};
const resultPercent = percent(a = 21, b = 42);
console.log(a + ' je ' + resultPercent.toFixed(2) + '% ze ' + b + '.');
console.log('----------------------------------------------');



/**
 * 5) Kdo z koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
console.log('5.');
const compare = (a, b) => {
    if (a == b) {
        return console.log('Čísla jsou stejná.');
    } else {
        if (a > b) {
            return resultCompare = a;
        } else {
            return resultCompare = b;
        }
    }
};
compare(1.5, 1 / 4);
console.log(resultCompare);
compare(15, 60);
console.log(resultCompare);
console.log('----------------------------------------------');



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
console.log('6.');
for (let i = 0; i * 13 <= 730; i++) {
    console.log(i * 13);
};
console.log('----------------------------------------------');


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
console.log('7.');
const circle = (a) => {
    return Math.PI * Math.pow(a, 2);
};
console.log(circle(3).toFixed(2) + 'cm²');
console.log('----------------------------------------------');


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
console.log('8.');
const cone = (a, b) => {
    return (1 / 3) * Math.PI * Math.pow(a, 2) * b;
};
console.log(cone(3, 5).toFixed(2) + 'cm³');
console.log('----------------------------------------------');


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
console.log('9.');
const triangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        return resultTriangle = true;
    }
    else {
        return resultTriangle = false;
    }
};
triangle(2, 3, 4);
console.log(resultTriangle);
console.log('----------------------------------------------');



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
console.log('10.');
const triangleHeron = (a, b, c) => {
    if (resultTriangle = true) {
        s = (a + b + c) / 2;
        sSquare = s * (s - a) * (s - b) * (s - c);
        return resultTriangleHeron = Math.sqrt(sSquare);
    }
    else {
        console.log('Trojúhelník nemůže vzniknout!');
    }
};
triangleHeron(2, 3, 4);
console.log(resultTriangleHeron.toFixed(2));
console.log('----------------------------------------------');