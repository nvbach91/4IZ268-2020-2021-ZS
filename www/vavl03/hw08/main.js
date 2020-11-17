/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const person = {
    name: "Pepe",
    birthDate: new Date(1999, 4, 17),
};
const age = new Date().getFullYear() - person.birthDate.getFullYear();
console.log(person.name + " tento rok oslaví " + age + ". " + "narozeniny.");

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak.
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32.
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou.
 */
// Solution here

const cel = 20;
const celToFahr = (cel * 9) / 5 + 32;
const fahr = 68;
const fahrToCel = ((fahr - 32) * 5 / 9);
console.log(cel + "°C = " + celToFahr + "°F");
console.log(fahr + "°F = " + fahrToCel + "°C");

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce,
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli.
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce.
 */
// Solution here

const calcAge = (person) => {
    const today = new Date();
    const age = today.getFullYear() - person.birthDate.getFullYear();
    return console.log(person.name + " tento rok oslaví " + age + ". " + "narozeniny!");
}

const personA = {
    name: "Honza",
    birthDate: new Date(1998, 8, 12),
};

const personB = {
    name: "Luky",
    birthDate: new Date(1923, 9, 11),
};

calcAge(person);
calcAge(personA);
calcAge(personB);

const temperature = (temperature) => {
    if (temperature.includes("°C")) {
        return console.log("Toto je teplota ve stupních Celsia");
    }
    else if (temperature.includes("°F")) {
        return console.log("Toto je teplota ve stupních Fahrenheiht");
    }
    else {
        return console.log("Žádná teplota")
    }
};
const temp1 = cel + "°C";
const temp2 = fahr + "°F";
temperature(temp1);
temperature(temp2);


/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou!
 */
// Solution here

const numbers = (a, b) => {
    if (a == 0 || b == 0) {
        return console.log("Jedno z čísel je rovno 0.")
    }
    const ratio = ((a / b) * 100);
    const percentage = ratio.toFixed(1);
    return console.log(a + " je " + percentage + "% z " + b);
};

numbers(50, 100);
numbers(12, 50);
numbers(70, 35);
numbers(25, 0);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste
 * je párkrát zavolat v kódu a výsledky uložit do proměnných.
 */
// Solution here

const higherNumber = (a, b) => {
    if (a == b) {
        return 'Čísla se rovnají.';
    }
    else if (a > b) {
        return a;
    }
    else {
        return b;
    }
};

const a = higherNumber(20, 57);
const b = higherNumber(2 / 8, 55 / 39);
const c = higherNumber(7.425, 80.475);
const d = higherNumber(36.27, 7 / 23);


/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší
 * nebo rovno 730, včetě nuly. Používejte for loop.
 */
// Solution here

const pattern = () => {
    for (i = 13; i <= 730; i += 13) {
        console.log(i);
    }
};


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu.
 */
// Solution here

const area = (r) => {
    return (r * r) * Math.PI;
};

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
// Solution here

const dimension = (v, r) => {
    return (1 / 3) * (Math.PI * (r * r) * v);
};

/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
// Solution here

const triangle = (a, b, c) => {
    if ((a + b > c) && (a + c > b) && (c + b > a)) {
        console.log("True");
        return true;
    }
    console.log("False");
    return false;
};

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
// Solution here

const hero = (a, b, c) => {
    if (!triangle(a, b, c)) {
        return console.log("Tohle není trojúhelník!.")
    }
    const s = (a + b + c) / 2;
    const S = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return S;
};