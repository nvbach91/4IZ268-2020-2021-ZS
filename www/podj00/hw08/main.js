/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const person = {
    name: 'Pepa',
    born: "1980"
}

console.log(person.name + " is " +  (new Date().getFullYear() - person.born) + " years old.")



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

const celsius = 30;
const fahrenheiht = 100;

console.log(celsius + "°C equals " + (celsius*9/5+32) + "F" );
console.log(fahrenheiht + "F equals " + ((fahrenheiht-32)*5/9) + "°C" );



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

const getAge = (p) => {
    console.log(p.name + " is " +  (new Date().getFullYear() - p.born) + " years old.")
}

getAge(person);
getAge({
    name:'Koště',
    born:'2000'
});

const getTemperature = (t) => {
    return console.log(t.includes("°C") ? "Teplota je ve stupních Celsia" : "Teplota je ve Fahrenheihtech")
}

const t1 = celsius + "°C"
const t2 = fahrenheiht + "F"

getTemperature(t1);
getTemperature(t2);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

const getPercentage  = (a,b) => {
    if(b === 0){
        return console.log("Cannot divide with " + b)
    }
    const percentage = ((a/b) * 100).toFixed(1) + "%"

    console.log(a + " is " + percentage + " from " + b)
}


getPercentage(10,100)


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

const getHigher = (a,b) => {
    if(a > b){
        return a;
    }
    if(a < b) {
        return b;
    }

    return console.log("Numbers are equal")
}


getHigher(5,5)

const firstCall = getHigher(10,100);
const secondCall = getHigher(11,10)

console.log(firstCall);
console.log(secondCall);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

const numbers = 730/13;

const pattern = () => {
    let result = "Všechny násobky čísla 13 jsou ";
    for (i = 0; i <= 730; i += 13) {
        result += i + " ";
    }
    return result;
};

console.log(pattern);



/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

const getCircleEquation = (r) => {
    return (r * r) * Math.PI
}

console.log(getCircleEquation(5))


/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

const getConesHight = (h,r) => {
    return (1 / 3) * (Math.PI * Math.pow(r, 2) * h);
}

console.log(getConesHight(5,3))



/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

const isTriangle = (a,b,c) => {
    if (a + b > c && a + c > b && b + c > a){
        return true;
    }

    return false;
}

console.log(isTriangle(5,8,10))



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here


const getHeron = (a,b,c) => {
    if(isTriangle(a,b,c)){
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    } else {
        console.log("How dare you trying my validation?")
    }
}


console.log(getHeron(5,8,10));

getHeron(1,2,3);
