/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

console.log('1.');
let dateOfBirth = 1999;
var date = new Date();
var currentYear = date.getFullYear();
console.log('Pepa is ' + (currentYear - dateOfBirth) + 'years old');





/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here
console.log('2.');
let tempCelsius = 20;
console.log(tempCelsius + '°C = ' + ((tempCelsius * 9) / 5 + 32) + ' °F')
let tempFarenheiht = 93;
console.log(tempFarenheiht + '°F = ' + (((tempFarenheiht - 32) * 5) / 9) + '°C');



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here
console.log('3. ');

function age(dateOfBirth) {
    console.log('Pepa is ' + (currentYear - dateOfBirth) + 'years old');
}
dateOfBirth = 1999;

function temperatureF(tempCelsius) {
    console.log(tempCelsius + '°C = ' + ((tempCelsius * 9) / 5 + 32) + ' °F')
}

function temperatureC(tempFarenheiht) {
    console.log(tempFarenheiht + '°F = ' + (((tempFarenheiht - 32) * 5) / 9) + '°C');

}
tempCelsius = 20;
tempFarenheiht = 93;



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

console.log('4.');

function part(a, b) {
    if (a == 0 || b == 0) {
        console.log('You can not devide a number by zero');
    } else {
        console.log(a + ' je ' + ((a / b) * 100).toFixed(2) + '% z ' + b);
    }
}
part(10, 100);
part(13, 45);
part(11, 0);





/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

console.log('5. ');

function theGreatestNumber(a, b) {
    if (a == b) {
        return ('Numbers are equal');
    } else if (a > b) {
        return a;
    } else {
        return b;
    }

}

theGreatestNumber(119, 315);
theGreatestNumber(-12, 35);
theGreatestNumber(3 / 7, 2 / 8);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here
console.log('6. ')
for (let a = 0; a <= 730; a += 13) {
    console.log(a)
}



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here
console.log('7. ');
function calculateCircleArea(radius) {
    if (radius <= 0) {
        console.log('Radius should be a non negative number greater then 0');
    } else {
        console.log('Circle area is ' + ((radius * radius) * Math.PI).toFixed(2));

    }
}

calculateCircleArea(2);
calculateCircleArea(-2);



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here
console.log('8. ');
function calculateConeVolume(hight, radius) {
    if (hight <= 0 || radius <= 0) {
        console.log('Value of hight and radius must be a positive number greater then 0');

    } else {
        console.log('The volume is ' + (1 / 3 * radius * radius * Math.PI * hight).toFixed(2));
    }
}
calculateConeVolume(4, 3);
calculateConeVolume(-4, 3);
calculateConeVolume(4, 0);


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here
console.log('9. ');
function isTriangle(a, b, c) {
    if (a + b > c && b + c > a && a + c > b) {
        console.log("Triangel with such sides values can exist")
    } else {
        console.log('Triangle with such side values can not exist')
    }
}
isTriangle(1, 2, 3);
isTriangle(3, 4, 3);




/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here
console.log('10. ');
function calculateTriangleArea(a, b, c) {
    if (!isTriangle(a, b, c)) {
        console.log('Triangle with such side values can not exist');
    }
    else {
        console.log('Area of triangle is ' + (a + b + c * c).toFixed(2));
    }
}
calculateTriangleArea(1, 2, 3);
calculateTriangleArea(3, 4, 3);
