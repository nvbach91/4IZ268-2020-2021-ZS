console.log('Ahoj svete');

/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
const hisBirthday = 1987;
const hisAge = 2020 - hisBirthday;
console.log('Pepe has ' + hisAge + ' years old. ');


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

const celsius = 20;
const fahrenheiht = 68;
const mathFahrenheiht = ((celsius * 9) / 5) + 32;
const matheCelsius = ((fahrenheiht - 32) * 5) / 9;
console.log(celsius + ' °C = ' + mathFahrenheiht + ' °F');
console.log(fahrenheiht + ' °F = ' + matheCelsius + ' °C');





/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

const counthisAge = (hisBirthday) => {
    return new Date().getFullYear() - hisBirthday;
};
console.log('Pepe has ' + counthisAge(1990) + ' years old. ');
console.log('Pepe has ' + counthisAge(2003) + ' years old. ');

countcelsius = (celsius) => {
    return celsius + ' °C = ' + (((celsius * 9) / 5) + 32) + ' °F';
};

countfahrenheiht = (fahrenheiht) => {
    return fahrenheiht + ' °F = ' + (((fahrenheiht - 32) * 5) / 9) + ' °C';
};

console.log(countcelsius(70));
console.log(countfahrenheiht(70));
console.log(countcelsius(250));
console.log(countfahrenheiht(250));



/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

const calculateRatio = (a, b) => {
    if (b != 0) {
        return (a / b) * 100;
    } else {
        return "Division by zero!"
    }
};

const num1 = 13;
const num2 = 91;
const result = calculateRatio(num1, num2);
console.log(num1 + ' je ' + result.toFixed(2) + '% ze ' + num2 + ' . ');



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

const numCompare = function (a, b) {
    if (a != b) {
        if (a < b) {
            return b;

        } else {
            return a;
        }
    } else {
        return 'Numbers are equal';
    }
}

var numCompare1 = numCompare(0, 0);
var numCompare2 = numCompare(0.9, 0.65);
var numCompare3 = numCompare(1 / 5, 1 / 8);

console.log(numCompare1);
console.log(numCompare2);
console.log(numCompare3);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

for (i = 0; i <= 730; i += 13) {
    console.log(i);
}


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

var calculateCircleArea = function (r) {
    return Math.PI * Math.pow(r, 2);
}

console.log(calculateCircleArea(2));


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

function getConeVolume (h,r) {
    var vol = 1 / 3 * Math.PI * Math.pow(r,2) * h;
console.log("Volume of cone with height = " + h + " and radius = " + r + " is " + vol.toFixed(2));
}
getConeVolume(10,15);



/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

const isTriangle = (a, b, c) => {
    if (a + b > c && b + c > a && a + c > b) {
console.log(true);
console.log("a=" + a + " b=" + b + " c=" + c);
    } else {
        console.log(false);
        console.log("a=" + a + " b=" + b + " c=" + c);

    }
};

triangle(1, 2, 3);
triangle(4, 5, 1);
triangle(3, 5, 5)


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

const calculateTriangleArea = (a, b, c) => {
    if (a + b > c && b + c > a && a + c > b) {
        const s = (a + b + c) / 2
        const result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        console.log(result.toFixed(0));
    } else {
        console.log('This is not a triangle');
    }
}
calculateTriangleArea(7, 4, 5);
calculateTriangleArea(4, 2, 5);