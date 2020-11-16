/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
var name="Pepe";
const msg="'s age is ";
var age="22";
console.log(name+msg+age+".");

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
var tempc="20";
const celsius="°C";
const fahrenheitht="°F";
var tempf="68";

console.log(tempc+celsius+" = "+(((tempc*9)/5)+32)+fahrenheitht);
console.log(tempf+fahrenheitht+" = "+((tempf-32)*5/9)+celsius);

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
const add = (a, b) => {
    const result= a + b;
    return result;
    // return a + b;
 };
 
 const res1 = add(22, 54);
 console.log("Pepe's age is 22, Agata's age is 54 together they are " + res1 +" years old");

const countC = (a) => {
    const result2 = (((a*9)/5)+32);
    return result2;
}
const res2 = countC(24);
console.log(res2+fahrenheitht);

const countF = (a) => {
    const result3 = ((a-32)*5/9);
    return result3
}
const res3 = countF(81);
console.log(res3+celsius);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
var percentage = (a, b) => {
    var result4 = ((b/a)*100);
    return result4;
}
var a= 100;    //větší
var b= 33;    //menší
var res4 = percentage(a, b);
var res4fixed = res4.toFixed(0);

console.log(b +" je "+ res4fixed+ "% z "+ a);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

var compare = (n1, n2) => {
    if (n1 < n2) {
        solution = (n1+" is smaller than "+n2);
        return solution;
      } else if (n1 > n2) {
        solution = (n1+" is bigger than "+n2);
        return solution;
      } else {
        solution = (n1+", "+n2+" numbers are equall");
        return solution;
      }
}
var res5 = compare(3,3);
console.log(res5);

var res6 = compare(3.1,3/2);
console.log(res6);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

var s = "";
for ( var i = 0; i <= 730; i+= 13) {
     s += i + ", ";
}

console.log(s);

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kruhu podle dodaného poloměru v argumentu. 
 */
// Solution here
const pi  = 3.14;

var circleS = (r) => {
     return (Math.pow(r, 2))*pi;
  }

var res7 = circleS(2);

console.log("Content of circle is " + res7);


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

var coneV = (r, v) => {
    return (1/3)*(Math.pow(r, 2))*pi*v;
 }

var res8 = coneV(3,4).toFixed(2);

console.log("Volume of cone is " +res8);



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

function triangle(x, y, z) {
    if ((x+y > z) && (x+z > y) && (y+z > x)) {
        return "True";
    }
    else { return "False"};
}

var res9 = triangle(3, 4, 5);
console.log(res9);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

function triangleS(x, y, z) {
    if ((x+y > z) && (x+z > y) && (y+z > x)) {
        s = (x+y+z)/2 ;
        result10 = Math.sqrt(s*(s-x)*(s-y)*(s-z))
        return "Heron's formula result is "+result10;
    }
    else { return "It is not triangle."};
}

var res10 = triangleS (3,4,5);
console.log( res10);