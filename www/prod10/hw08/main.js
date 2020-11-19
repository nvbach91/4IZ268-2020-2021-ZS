/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here

var currentYear, person, pepeAge;

currentYear = new Date().getFullYear();

person = {
    name: "Pepe",
    born: 1999
}

pepeAge = currentYear - person.born;

console.log(person.name + " is " + pepeAge + " years old.");


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

var celsius, fahrenheiht;

celsius = 10;
fahrenheiht = 10;

console.log(celsius + "°C = " + (celsius * 9 / 5 + 32) + "°F");
console.log(fahrenheiht + "°F = " + (fahrenheiht - 32) * 5 / 9 + "°C");


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

function bornToAge(year) {
    var age = currentYear - year;
    if (year > currentYear) {
        console.log(person.name + " wasn't born yet.");
    } else {
        console.log(person.name + " is " + age + " years old.");
    }
}

function CtoF(c) {
    var fah = c * 9 / 5 + 32;
    console.log(c + "°C = " + fah.toFixed(2) + "°F");
}

function FtoC(f) {
    var cel = (f - 32) * 5 / 9;
    console.log(f + "°F = " + cel.toFixed(2) + "°C");
}

bornToAge(person.born);
bornToAge(2021);
CtoF(celsius);
CtoF(20);
FtoC(fahrenheiht);
FtoC(20);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

var number1, number2;

function getPercentage(n1, n2) {

    var percentage = (n1 / n2 * 100).toFixed(2);

    if (n2 == 0) {
        console.log("WARNING - division by zero!!!")
    } else {
        console.log(n1 + " is " + percentage + "% of " + n2);
    }
}

number1 = 15;
number2 = 29;

getPercentage(number1, number2);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here


function biggerNumber(n1, n2) {

    if (n1 == n2) {
        console.log("Numbers are equal.")
    } else if (n1 > n2) {
        return n1;
    } else {
        return n2;
    }
}

biggerNumber(10, 10);
biggerNumber(0.5, 1 / 2);
var bigger1 = biggerNumber(0.1, 0.58);
var bigger2 = biggerNumber(1 / 3, 1 / 5);
var bigger3 = biggerNumber(20, 1 / 5);
console.log(bigger1);
console.log(bigger2);
console.log(bigger3);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

var number, maximum;

function allMultiples(num, max) {

    var text = "Multiples of " + num + " with the maximum of " + max + " are: ";

    for (i = 0; i <= (max / num); i++) {
        if (i == 0) {
            text += num * i;
        } else {
            text += ", " + num * i;
        }
    }

    console.log(text);
}

number = 13;
maximum = 730;

allMultiples(number, maximum);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

function getCircleVolume(r) {
    var vol = Math.PI * Math.pow(r, 2);

    console.log("Volume of circle with radius = " + r + " is " + vol.toFixed(2));
}

getCircleVolume(10);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

function getConeVolume(h, r) {
    var vol = 1 / 3 * Math.PI * Math.pow(r, 2) * h;

    console.log("Volume of cone with height = " + h + " and radius = " + r + " is " + vol.toFixed(2));
}

getConeVolume(10, 20);

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

function isTriangle(a, b, c) {

    var check = false;

    if (a + b > c && a + c > b && b + c > a) {
        check = true;
    }

    return check;
}

console.log(isTriangle(7, 10, 5));
console.log(isTriangle(5, 3, 8));

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function heronsFormula(a, b, c) {

    var s, area;

    if (isTriangle(a, b, c)) {
        s = (a + b + c) / 2;
        area = Math.sqrt(s * (s - a) * s * (s - b) * s * (s - c));
        console.log(area);
    } else {
        console.log("This is not a triangle");
    }

}

heronsFormula(7, 10, 5);
heronsFormula(5, 3, 8);