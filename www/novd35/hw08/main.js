/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
const date_of_birth = 1996;
var date = new Date();
var year = date.getFullYear();
console.log('1) ', 'Pepovi je ' + (year - date_of_birth) + ' let.');

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

let cels = 20;
let fahr = 68;
console.log('2) ' + cels + '°C = ' + ((cels * 9) / 5 + 32) + '°F' + ' resp. ' + fahr + '°F = ' + (((fahr - 32) * 5) / 9) + '°C' );



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here




printAge = date_of_birth => console.log('3)' + 'Pepovi je ' + (year - date_of_birth) + ' let.');
toFahr = cels => console.log('3)' + cels + '°C = ' + ((cels * 9) / 5 + 32) + '°F');
toCels = fahr => console.log('3)' + fahr + '°F = ' + (((fahr - 32) * 5) / 9) + '°C' );

printAge(1989);
printAge(1945);
toFahr(8);
toFahr(12);
toCels(40);
toCels(80);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here


division = (dividend, divisor) =>  {
    if (dividend <= 0 || divisor <= 0) {
        console.log('Stop trolling');
    } else {
        console.log('4)' + dividend + ' je ' + ((dividend / divisor) * 100).toFixed(2) + '% z ' + divisor);
    }
}
division(20, 30);
division(60, 60);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

whichIsHigher = (a, b) => {
    if (a == b) {
        return ('Equal­');
    } else if (a > b) {
        return a;
    } else {
        return b;
    }
}
console.log('5.', res = whichIsHigher(5.5, 10));
console.log('5.', res = whichIsHigher(100000000, 10));
console.log('5.', res = whichIsHigher(1, 1));




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
timesThirteen = () => {
    var array = [];
    for (let index = 0; index <= 730; index+=13) {
        array.push(index);
    
        
    }
    console.log('6) ', array);
}

timesThirteen();




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

contentOfCircle = (radius) =>{
    if (radius <= 0) {
        console.log('7) ','must be greater then 0');
    } else {
        console.log('7) ','Obsah kruznice = ' + ((radius * radius) * Math.PI));
    }
}
contentOfCircle(5);
contentOfCircle(-5);






/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

coneVolume = (radius, height) => {
    if (radius <= 0 || height <= 0) {
        console.log('8) ','must be greater then 0, obv');
    } else {
        console.log( '8) ','Objem = ' + (((1 / 3) * (radius * radius) * Math.PI) * height));
    }
}

coneVolume(1, 10);
coneVolume(20, 80);
coneVolume(50, -80);




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here


isItTriangle = (a, b, c) => {
    if (a <= 0 || b <= 0 || c <= 0) {
        console.log('9) ','Must be greater then 0');
    } else if (a + b >= c && a + c >= b && b + c >= a) {
        console.log('9) ','triangle');
        return true;
    } else {
        console.log('9) ','not a triangle');
        return false;
        
    }
}
isItTriangle(5, 8, 12);
isItTriangle(10, 10, 10);
isItTriangle(-3, 8, -66);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

countTriangleContent = (a, b, c) => {
    if (!isItTriangle(a, b, c)) {
        console.log('10) ','Not a triangle, duh!');
    } else {
        let s = (a + b + c) / 2;
        console.log('10) ','Obsah = ' + (Math.sqrt(s * (s - a) * (s - b) * (s - c))));
    }


}

countTriangleContent(5, 8, 12);
countTriangleContent(10, 10, 10);
countTriangleContent(-3, 8, -66);