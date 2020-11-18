
/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

var year = 2020;
var birth = 1694;

var age = year - birth;
//console.log(age);

var pepe = "Pepe is " + age + " years old.";
console.log(pepe);


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

var tempF1 = 68;
var tempC1 = 20;

function FtoC (F) {
    var C = (F - 32)/9*5;
    console.log(F + "°F = " + C + "°C");
}

FtoC(tempF1);


function CtoF (C) {
    var F = C*9/5 + 32;
    console.log(C + "°C = " + F + "°F");
}

CtoF(tempC1);



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

function pepesAge (year, birth) {
    var age = year - birth;
    var pepe = "Pepe is " + age + " years old.";
    console.log(pepe);
}

pepesAge(2020, 866);
pepesAge(15655, 8845);
pepesAge(2020, 1991);


FtoC(20);
FtoC(40);
FtoC(70);

CtoF(65486);
CtoF(555);
CtoF(36);
CtoF(-273.15);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

function sth1 (a, b) {
    c = a/b;
    c = c.toFixed(2) * 100;
    console.log(a + " je " + c + "% z " + b + ".");
}

sth1(5, 5);
sth1(5, 8);
sth1(14, 18);
sth1(4153, 56486.555);



/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

function greater (a, b) {

    if (a === b) {
        console.log("The numbers are equal.");
        return null;
    }
    
    if (a > b) {
        console.log(a);
        return a;
    }

    console.log(b);
    return b;
}

greater(15, 21);
greater(111, 11);
greater(0.2513, 0.15151);
greater(5, 5);




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

function sth2 () {
    for (var i = 13; i <= 730; i = i + 13) {
        console.log(i);
        
    }    
}

console.log("===============================");
sth2();

function altSth2 () {
    for (var i = 0; i <= 730; i++) {
        if(i%13 === 0 && i > 0) {
            console.log(i);
        }
        
    }    
}

console.log("===============================");
altSth2();
console.log("===============================");



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

function circleArea (r) {
    return Math.PI*r*r;
}

console.log(circleArea(51));
console.log(circleArea(5));
console.log(circleArea(15));
console.log(circleArea(1));
console.log("===============================");


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

function coneVolume (r, v) {
    circleArea = circleArea(r);
    return 1/3*circleArea*v;
}


console.log(coneVolume(2,4));

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here


function isTriangle (a, b, c) {
    if (a > b && a > c) {
        if (a < c+b) {
            return true;
        }
    }
    else  if (b > a && b > c) {
        if (b < a+c) {
            return true;
        }
    }
    else if (c > a && c > b) {
        if (c < a+b) {
            return true;
        }
    }
    
    return false;
}



console.log(isTriangle(1,1,1));
console.log(isTriangle(1,3,5));
console.log(isTriangle(5,8,4));
console.log(isTriangle(5,6,7));
console.log(isTriangle(7,6,5));



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function heron (a,b,c) {
    if (isTriangle(a,b,c) === false) {
        console.log("Not a triangle.");
        return false;
    }
    return 1/4*Math.sqrt((a+b+c)*(-a+b+c)*(a-b+c)*(a+b-c));
}

console.log(heron(7,6,5));
console.log(heron(1,1,1));
console.log(heron(1,3,5));
console.log(heron(10,20,25));

