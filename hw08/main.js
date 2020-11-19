/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

console.log('1.');
let birth_year = 1998;
var date = new Date();
var this_year = date.getFullYear();
console.log('Tento rok Pepovi je ' + (this_year - birth_year) + ' let.');



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

console.log('2.');
let celsius = 20;
console.log(celsius + '°C = ' + ((celsius * 9) / 5 + 32) + '°F');
let fahrenheiht = 68;
console.log(fahrenheiht + '°F = ' + (((fahrenheiht - 32) * 5) / 9) + '°C');


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
console.log('3.');

function year(birth_year) {

    console.log('Tento rok Pepovi je ' + (this_year - birth_year) + ' let.');
}



year(1978);
year(1999);

function CToF(celsius) {
    console.log(celsius + '°C = ' + ((celsius * 9) / 5 + 32) + '°F');

}

function FToC(fahrenheiht) {
    console.log(fahrenheiht + '°F = ' + (((fahrenheiht - 32) * 5) / 9) + '°C');
}

CToF(5);
CToF(6);
FToC(60);
FToC(20);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
console.log('4.');

function part(a, b) {
    if (a <= 0 || b <= 0) {
        console.log('Obě čísla musí být kladná');
    } else {
        console.log(a + ' je ' + ((a / b) * 100).toFixed(2) + '% z ' + b);
    }
}
part(2, 40);
part(5, 45);
part(-4, 42);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
console.log('5.');

function higherNumber(a, b) {
    if (a == b) {
        return ('čísla se rovnají');
    } else if (a < b) {
        return b;
    } else {
        return a;
    }
}

console.log(x = higherNumber(5, 10));
console.log(x = higherNumber(10, 10));
console.log(x = higherNumber(15, 10));

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

console.log('6.');
for (let a = 0; a <= 730; a += 13) {
    console.log(a);
}


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
console.log('7.');

function circlecontent(radius) {
    if (radius <= 0) {
        console.log('Zadaný poloměr musí být kladné číslo');
    } else {
        console.log('Při poloměru ' + radius + ' Obsah kružnice je ' + ((radius * radius) * Math.PI).toFixed(2));
    }
}

circlecontent(5);
circlecontent(-5);
/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
console.log('8.');

function dimension(radius, height) {
    if (radius <= 0 || height <= 0) {
        console.log('Zadané hodnoty musí být kladné číslo');
    } else {
        console.log('Při poloměru ' + radius + ' a výšce ' + height + ' Ojem kuželu je ' + (((1 / 3) * (radius * radius) * Math.PI) * height).toFixed(2));
    }
}

dimension(6, 8);
dimension(5, 8);
dimension(5, -8);

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

console.log('9.');

function triangleCheck(a, b, c) {
    if (a <= 0 || b <= 0 || c <= 0) {
        console.log('Zadaná čísla musí být kladná');
    } else if (a + b >= c && a + c >= b && b + c >= a) {
        console.log('true/yes');
        return true;
    } else {
        console.log('false/no');
        return false;
    }
}
triangleCheck(5, 6, 7);
triangleCheck(-4, 8, 10);
triangleCheck(5, 20, 30);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
console.log('10.');

function heroic(a, b, c) {
    if (!triangleCheck(a, b, c)) {
        console.log("Není to trojúhelník.");
    } else {
        let s = (a + b + c) / 2;
        console.log('Obsah trojúhelníka je ' + (Math.sqrt(s * (s - a) * (s - b) * (s - c))).toFixed(2));
    }


}
heroic(3, 4, 6);
heroic(-4, 5, 10);
heroic(5, 50, 10);