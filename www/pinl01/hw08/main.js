/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here

const birth = 2000;
let year = new Date().getFullYear();
const ageP = (year - birth);
console.log('Pepovi je ' + ageP + ' let.');
console.log('---------------------');

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

const C = 20;
const F = C * 9 / 5 + 32;
console.log(C + '°C' + ' = ' + F + '°F');

const F1 = 68;
const C1 = ((F - 32) * 5 / 9);
console.log(F + '°F' + ' = ' + C + '°C');

console.log('---------------------');

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here
var age = (b) => {
    const year = new Date().getFullYear();
    const age = year - b;
    return age;
};

var res = age(1980);
console.log('Pepovi je ' + (res) + ' let.');

var fh = (C) => {
    const result = ((C * 9 / 5 + 32) + '°F');
    return result;
}
var res = fh(30);
console.log(C + '°C' + ' = ' + res);

var cel = (F) => {
    const result = ((F - 32) * 5 / 9) + '°C';
    return result;
}
var res = cel(86);
console.log(F + '°F' + ' = ' + res);
console.log('---------------------');


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

var count = (n1, n2) => {
    if (n1 == 0 || n2 == 0) {
        console.log('dělení nulou');
    } else {
        const result = (n1 / n2).toFixed(2);
        return result;
    };
}

var res = count(30, 10);
console.log(res);
console.log('---------------------');




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here
var fce = (n1, n2) => {
    if (n1 > n2) {
        return n1;
    } else if (n2 > n1) {
        return n2;
    } else {
        return 'čísla se rovnají';
    }
}


var res = fce(20, 10);
console.log(res);
console.log('---------------------');



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

var multiple = () => {
    for (let i = 0; i <= 730; i = i + 13) {
        console.log(i);
    }
}

multiple();
console.log('---------------------');


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

var circle = (r) => {
    const result = (Math.PI * r * r);
    return result;
}

var res = circle(5);
console.log(res);
console.log('---------------------');

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

var cone = (v, r) => {
    const result = (1 / 3 * Math.PI * r * r * v);
    return result;
}

var res = cone(9, 5);
console.log(res);
console.log('---------------------');

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

var triangle = (a, b, c) => {
    if (a + b > c && a + c > b && b + c > a) {
        return true;
    }
    return false;
}

var res = triangle(20, 3, 7);
console.log(res);
console.log('---------------------');


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

var heron = (a, b, c) => {
    if (triangle(a, b, c) == true) {
        const s = (a + b + c) / 2;
        const result = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        return result;
    } else {
        return ('nemá smysl dále počítat');
    }
}

var res = heron(5, 3, 4);
console.log(res);