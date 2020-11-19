/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození,
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou
 * angličtinu.
 */
// Solution here
console.warn("1.");
let year = 1987; //náhodně jsem vybral tento věk a urožil do proměnné
var date = new Date();
var year_now = date.getFullYear();
console.log(
  "Pepova se narodil v roce " + year + " takže mu teď je: " + (year_now - year)
);

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here
console.warn("2.");

//jestli to chápu správně, tak si nyní mám vymyslet dvě náhodné teploty, které budu převádět...

let C1 = 20; //teplota v celsiích
let F1;
let C2;
let F2 = 68; //fahrenhit

F1 = C1 * (9 / 5) + 32;
C2 = (F2 - 32) * (5 / 9);

console.log(C1 + "°C =  " + F1 + "°F");
console.log(F2 + "°F = " + C2 + "°C");

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here
console.warn("3.");

function AgeCalc(year) {
  var date = new Date();
  var year_now = date.getFullYear();
  console.log(
    "Pepova se narodil v roce " +
      year +
      " takže mu teď je: " +
      (year_now - year)
  ); // The function returns the product of p1 and p2
}

function toCelsius(F) {
  console.log(F + "°F = " + (5 / 9) * (F - 32) + "°C");
}

function toFahrenheiht(C) {
  console.log(C + "°C =  " + (C * (9 / 5) + 32) + "°F");
}

AgeCalc(1984);
AgeCalc(1999);
toCelsius(68);
toCelsius(108);
toFahrenheiht(20);
toFahrenheiht(0);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here
console.warn("4.");

function percetnage(N1, N2) {
  if (N2 != 0) {
    let P = (N1 / N2).toFixed(2) * 100;
    console.log(N1 + " je " + P + "% z " + N2);
  } else {
    console.log("Toto počítat nebudu.");
  }
}
percetnage(5, 50);
percetnage(2, 0);
percetnage(852, 5021);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here
console.warn("5.");
function compare(N1, N2) {
  if (N1 == N2) {
    console.log("Čísla se rovnají");
  } else {
    if (N1 > N2) {
      console.log("Číslo " + N1 + " je větší, než " + N2);
    } else {
      console.log("Číslo " + N1 + " je menší, než " + N2);
    }
  }
}

compare(1,1);
compare(2,1);
compare(1,2);
compare(2.5,1);
compare(10/2,1);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here
console.warn("6.");
for (i = 0; i < 731; i = i+13) {
   console.log(i);
  }
/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here
console.warn("7.");
function surface(R){
    console.log("Povrch kružnice o ploměru "+R+" je: " +  (Math.PI*R*R).toFixed(4) + " jednotek čtverečních.");
}
surface(1);
surface(5);
/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here
console.warn("8.");
function volume(H,R){
    console.log("Objem kuželu o výšce " + H + " a poloměru "+ R+ " je: " +  (1/3*Math.PI*R*R* H).toFixed(4) + " jednotek krychlových.");
}
/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

function isTriangle(A,B,C){
    if(A+B < C || A + C < B || B + C < A){
        console.log(false);
    }
    else{
        console.log(true);
    }
}
isTriangle(3,5,4);
isTriangle(1,2,54);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

function surfaceTriangle(A,B,C){
    if(A+B < C || A + C < B || B + C < A){
        console.log("A toto dělat nebudu.");
    }
    else{
        let s = (A+B+C)/2;
        let surface = Math.sqrt(s*(s-A)*(s-B)*(s-C));
        console.log("Povrch trojuhelníka je: " +surface + " jednotek čtverečních.");
    }
}

surfaceTriangle(3,5,4);
surfaceTriangle(2,2,2);
surfaceTriangle(1,2,54);
