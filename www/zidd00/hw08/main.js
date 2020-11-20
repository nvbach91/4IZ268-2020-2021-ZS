/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
const currentTime = new Date();
const year = currentTime.getFullYear();
const yearBirth = 1999;
let age = year-yearBirth;
let result = 'Pepovi je ' + age + ' let.';
console.log(result);



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
let cInput = 20;
let fResult = ((cInput*9)/5)+32;
result = cInput + "°C = " + fResult + "°F";
console.log(result);

let fInput = 68;
let cResult = ((fInput-32)*5)/9;
result = fInput + "°F = " + cResult + "°C";
console.log(result);




/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
const getAge = (yearBirth2) => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    let age = year-yearBirth2;
    return age;
};

console.log('Funkce getAge vratila: ' + getAge(1999));


const celsiusToFahrenheiht = (celsius) => {
    let fResult = ((celsius*9)/5)+32;
    return fResult;
};

let testInput = 20;
console.log('Funkce celsiusToFahrenheiht vratila: ' + celsiusToFahrenheiht(testInput) + ' pro hodnotu ' + testInput);


const fahrenheihtToCelsius = (fahrenheiht) => {
    let cResult = ((fahrenheiht-32)*5)/9;
    return cResult;
};

testInput = 68;
console.log('Funkce fahrenheihtToCelsius vratila: ' + fahrenheihtToCelsius(testInput) + ' pro hodnotu ' + testInput);




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
const getPercentage = (num1, num2) => {
    let result;
    if(num2 > 0)
    {
        let percentage = (num1/num2)*100;
        result = percentage.toFixed(2) + '%';
    }
    else
    {
        result = 'Jmenovatel musí být větší než 0!'
    }
    return result;
};

let num1 = 21;
let num2 = 42;
console.log(num1 + '/' + num2 + ' = ' + getPercentage(num1,num2));




/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
const getGreaterNumber = (num1, num2) => {
    if(num1 > num2) return num1;
    if(num2 > num1) return num2;
    return 'Čísla ' + num1 + ' a ' + num2 + ' se rovnají.';
};

console.log(getGreaterNumber(1, 5));
console.log(getGreaterNumber(3, 2));
console.log(getGreaterNumber(1, 5/5));
console.log(getGreaterNumber(10/5, 2.0));




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
for(let i = 0; i <= 730; i += 13)
{
    console.log(i);
}




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
const getCircleArea = (radius) => {
    return Math.PI*radius*radius;
};

let radius = 1;
console.log('Kružnice s poloměrem ' + radius + ' má obsah ' + getCircleArea(radius));




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
const getConeVolume = (height, radius) => {
    return (1/3) * getCircleArea(radius) * height;
};

radius = 1;
let height = 2;
console.log('Kužel s poloměrem podstavy ' + radius + ' a výškou ' + height + ' má objem ' + getConeVolume(height, radius));




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
const isTriangle = (a, b, c) => {
    if(!(a+b > c)) return false;
    if(!(a+c > b)) return false;
    if(!(b+c > a)) return false;
    return true;
};

let a = 4;
let b = 8;
let c = 15;
console.log('Tvori hodnoty ' + a + ', ' + b + ', ' + c + ' trojuhelnik? Odpoved: ' + (isTriangle(a,b,c) ? 'ano' : 'ne'));

a = 7;
b = 9;
c = 13;
console.log('Tvori hodnoty ' + a + ', ' + b + ', ' + c + ' trojuhelnik? Odpoved: ' + (isTriangle(a,b,c) ? 'ano' : 'ne'));




/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
const triangleArea = (a, b, c) => {
    if(isTriangle(a,b,c))
    {
        let s = (a+b+c)/2;
        return Math.sqrt( s*(s-a)*(s-b)*(s-c) );
    }
    else
    {
        return 'Toto neni trojuhelnik!';
    }
};

a = 4;
b = 8;
c = 15;
console.log('Obsah trojuhelniku s delkami stran ' + a + ', ' + b + ', ' + c + ' je: ' + triangleArea(a,b,c));

a = 3;
b = 5;
c = 4;
console.log('Obsah trojuhelniku s delkami stran ' + a + ', ' + b + ', ' + c + ' je: ' + triangleArea(a,b,c));