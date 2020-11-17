/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
const Person = {
    name: 'Pepe',
    age: 42,
};

console.log(Person.name + " is " + Person.age + " years old.");

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
const Celsius = 20;
const Fahrenheiht = 90;

console.log(Celsius + "°C = " + (Celsius*9/5+32) + "F" );
console.log(Fahrenheiht + "F = " + ((Fahrenheiht-32)*5/9) + "°C" );

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
function CelsiusToFahrenheiht (Celsius){
    console.log(Celsius + "°C = " + (Celsius*9/5+32) + "F" );
}

CelsiusToFahrenheiht(21);

function FahrenheihtToCelsius (Fahrenheiht){
    console.log(Fahrenheiht + "F = " + ((Fahrenheiht-32)*5/9) + "°C" );
}

FahrenheihtToCelsius(72);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
function PercentageFromBase(Part, Base) {
    if (Base === 0) throw "Function exception: base number cannot be zero";
    const one = Base / 100;
    const percentage = (Part / one).toFixed();
    console.log(Part + " is " + percentage + "% from " + Base + ".");
}

PercentageFromBase(26,90);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
function WhoIsBigger (first, second) {
    if (first > second) {
        console.log(first + " is bigger than " + second + ".");
    }
    else if (second > first)
    {
        console.log(second + " is bigger than " + first + ".");
    }
    else
    {
        console.log("Numbers are equal.")
    }
}

WhoIsBigger(7,7);
WhoIsBigger(7.3,7);
WhoIsBigger(7/3,7);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
var i;
for (i = 1; i <= 730; i *= 13) {
    console.log(i);
}

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
function CircleArea (radius) {
    console.log(Math.PI * radius * radius);
}

CircleArea(2);

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
function getConeArea(radius, height) {
    console.log(Math.PI * radius * radius * height);
}

getConeArea(2,3);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
function WillBeTriangle(a, b, c) {
    if (a + b > c && a + c > b && b + c > a) return true;
    else return false;
}

function showWillBeTriangle(a, b, c) {
    if (WillBeTriangle(a, b, c)) console.log("yes");
    else console.log("no");
}

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
function heroicFormula(a, b, c) {
    if (WillBeTriangle(a, b, c)) {
        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else throw "Function exception: cannot build a triangle";
}