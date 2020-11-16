/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here

var year = 1995;
var age = 2020 - year;

console.log("My name is Pepe and I am " + age + " years old.");

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

var Fahrenheiht = 68;
var Celsius = 20;

var CtoF = (Celsius * 9) / 5 + 32;
console.log(CtoF + "°F");

var FtoC = Fahrenheiht - (32 * 5) / 9;
console.log(FtoC + "°C");

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

var tempC = function (a) {
  return a - (32 * 5) / 9 + "°C";
};
console.log(tempC(68));

var tempF = function (a) {
  return (a * 9) / 5 + 32 + "°F";
};
console.log(tempF(20));

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here
pi = 3.1415926535;
console.log(pi.toFixed(2))


var mathFunc = function (a, b) {
    result = (100 * a) / b;
    if (b != 0){
        return a + " je " + result.toFixed(2) +'%' + " z " + b;
    }else{
        return "dělit nulou nelze"
    }
};

console.log(mathFunc(1, 3));

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

var numCompare = function(a,b){
    if(a!=b){
        if(a<b){
            return b
        }else{
            return a
        }
    }else{
        return 'čísla se rovnají'
    }
}

numCompareResult1 = numCompare(1,3);
numCompareResult2 = numCompare(1.5,1.3);
numCompareResult2 = numCompare(5/6,4/7);

console.log(numCompare(5/6,4/7));


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here


var pattern= function(num){
    var i = 0;
    for(i=0;i<57; i++){
        var results = i*num
        console.log(results)
    } 
}

console.log(
    pattern(13)
);


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

var circleArea = function(r){
    return Math.PI *(r*r)
}

console.log(circleArea(4))


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

var coneVol = function(r,v){
   return 1/3* Math.PI *Math.pow(r,2)*v
}

console.log(coneVol(2,5))

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

var isTriangle = function(a,b,c){
    if (a+b>c&& a+c>b && b+c>a){
        return true
    }else{
        return false
    }
}
console.log(
    isTriangle(4,2,5)
)

console.log(
    isTriangle(255,9,6)
)


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here


var triangleArea = function(a,b,c){
    if (a+b>c&& a+c>b && b+c>a){
        s= a+b+c/2
        return Math.sqrt(s*(s-a)*(s-b)*(s-c))
    }else{
        return 'nejedná se o trojuhelník'
    }

}

console.log(
    triangleArea(9,7,5)
)

console.log(
    triangleArea(153,8,6)
)