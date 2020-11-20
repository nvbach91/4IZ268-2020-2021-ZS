/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const pepesYear = 1980;
var d = new Date();
var currentYear = d.getFullYear();

let age = currentYear - pepesYear;
let sentence = `Pepe is ${age} years old this year.`;
console.log(sentence);




/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var celsius = 25;
var fahrenheit = 90;
var ctof = celsius * 9 / 5 + 32;
var ftoc = (fahrenheit - 32) * 5 / 9;
var fahrenheitOutput = `${celsius} °C is equal to ${ctof} °F.`;
console.log(fahrenheitOutput);
var celsisuOutput = `${fahrenheit} °F = ${ftoc} °C`;
console.log(celsisuOutput);



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function getAge(year) {
    var d = new Date();
    var currentYear = d.getFullYear();
    
    let age = currentYear - year;
    let sentence = `Pepe is ${age} years old this year.`;
    console.log(sentence);

}

function getCelsius (fahrenheit) {
    var cfromf = (fahrenheit - 32) * 5 / 9;
    return cfromf;
}

function getFahrenheit (celsius) {
    var ffromc = celsius * 9 / 5 + 32;
    return ffromc;
}


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function getPercentage (first, second) {
    if (second == 0) {
        console.log('You can not devide by 0');
    } else {
    var percentage = first / second * 100;
    var rounded = percentage.toFixed(2);
    var result = `${first} is ${rounded}% from ${second}.`;
    console.log(result);
}
}



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function moreOrLess (first, second) {
    if (first > second) {
        return first;
    } else if (second > first) {
        return second;
    } else {
        console.log('Provided inputs are equal.');
    }
}



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here


for (var i = 0; i <= 730; i=i+13) {
    console.log(i);
}


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

function volume (radius) {
    var pi = Math.PI;
    var volume = pi * radius * radius;
    console.log(`Volume is ${volume}.`);
}



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here


function coneVolume (radius, height) {
    var pi = Math.PI;
    var coneVolume = 1/3 * pi * (radius * radius) * height;
    console.log(`Volume is ${coneVolume}`);
}


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

function triangle (a,b,c) {
    if (a + b > c && b + c > a && c + a > b) {
        console.log('Triangle can be constructed from these variables.');
    } else {
        console.log('Triangle can not be constructed from these variables.')
    }
}



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function triangleVolume (a,b,c) {
    if (a + b > c && b + c > a && c + a > b) {
        var s = (a + b +c) / 2;
    var odmocnina = s * (s - a) * (s - b) * (s - c);
    var result = Math.sqrt(odmocnina);
    console.log(`Volume is ${result}.`);
    } else {
        console.log('Triangle can not be constructed from these variables.')
    }
}