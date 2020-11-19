/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const age = 25;
console.log('Pepa is ' + age + ' years old');

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here

const temperature = '20°C';
if (temperature.slice(-2) == '°C') {
    console.log(temperature + ' = ' + (parseInt(temperature.slice(0, -2)) * 9 / 5 + 32) + '°F');
};
if (temperature.slice(-2) == '°F') {
    console.log(temperature + ' = ' + (parseInt(temperature.slice(0, -2)) - 32) * 5 / 9 + '°C');
};

/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

const funktio = (years) => {
    const pepaAge = 'Pepa is ' + years + ' years old';
    return pepaAge;
};

console.log(funktio(20));
console.log(funktio(30));
console.log(funktio(40));

const fonction = (degrees) => {
    if (degrees.slice(-2) == '°C') {
        const transferedDeg = degrees + ' = ' + (parseInt(degrees.slice(0, -2)) * 9 / 5 + 32) + '°F';
        return transferedDeg;
    };
    if (degrees.slice(-2) == '°F') {
        const transferedDeg = degrees + ' = ' + (parseInt(degrees.slice(0, -2)) - 32) * 5 / 9 + '°C';
        return transferedDeg;
    };
};

console.log(fonction('20°C'));
console.log(fonction('68°F'));
console.log(fonction('-5°C'));

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here

const divided = (num1, num2) => {
    if (num2 != 0) {
        const percentage = num1 / num2 * 100;
        if (percentage.toFixed(2).slice(-2) != 00) {
            return num1 + ' je ' + percentage.toFixed(2) + '% z ' + num2;
        } else {
            return num1 + ' je ' + percentage + '% z ' + num2;
        };
    } else {
        return 'Nelze dělit nulou';
    };
};

console.log(divided(21, 42));

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

const compare = (num1, num2) => {
    if (num1 > num2) {
        return num1;
    } else {
        if (num1 == num2) {
            return 'Čísla se rovnají';
        } else {
            return num2;
        }
    };
};

console.log(compare(1, 2));
console.log(compare(1.54, 0.45));
console.log(compare(5 / 11, 5 / 10));

const compareResult = compare(8, 9);
console.log(compareResult);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

for (let i = 0; i <= 730; i = i + 13) {
    console.log(i);
};

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here

const calculateCircuit = (radius) => {
    const circuit = radius * 2 * Math.PI;
    return circuit;
};

console.log(calculateCircuit(2).toFixed(2));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

const calculateVolume = (height, radius) => {
    const volume = calculateCircuit(radius) * height;
    return volume;
};

console.log(calculateVolume(3, 2).toFixed(2));

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

const triangleDecide = (lenght1, lenght2, lenght3) => {
    if (lenght1 + lenght2 > lenght3 && lenght1 + lenght3 > lenght2 && lenght2 + lenght3 > lenght1) {
        return true;
    } else {
        return false;
    };
};

console.log(triangleDecide(5, 8, 2));

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

const triangleArea = (lenght1, lenght2, lenght3) => {
    if (triangleDecide(lenght1, lenght2, lenght3)) {
        const s = (lenght1 + lenght2 + lenght3) / 2;
        const area = Math.sqrt(s * (s - lenght1) * (s - lenght2) * (s - lenght3));
        return area;
    } else {
        return 'Nelze sestavit trojúhleník';
    };
};

console.log(triangleArea(5, 8, 4));