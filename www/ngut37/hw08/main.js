/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here

const pepeBirthday = 1998;
const getPersonsAge = (year) => {
  return Math.round(new Date().getFullYear() - year);
}

console.log('1) ' + getPersonsAge(pepeBirthday));


/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
const celsiusToFahrenheit = (celcius) => {
  return Number(celcius * 9 / 5 + 32).toFixed(2);
}
const fahrenheitToCelsius = (fahrenheit) => {
  return Number((fahrenheit - 32) * 5 / 9).toFixed(2);
}

const mockCelsius = 20;
const mockFahrenheit = 68;

console.log('2) ' + `${mockCelsius}°C = ${celsiusToFahrenheit(mockCelsius)}°F`);
console.log('2) ' + `${mockFahrenheit}°F = ${fahrenheitToCelsius(mockFahrenheit)}°C`);


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

console.log('3) ' + getPersonsAge(1985));
console.log('3) ' + `${24}°C = ${celsiusToFahrenheit(24)}°F`);
console.log('3) ' + `${64}°F = ${fahrenheitToCelsius(64)}°C`);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
const calculateRatio = (a, b) => {
  if (b === 0) return;
  return Number(a / b);
}

const formatDecimalNum = (number) => {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    return 'Cannot calculate';
  }
  return `${(number * 100).toFixed(2)} %`
}

console.log('4) ' + `${20} / ${42} = ${formatDecimalNum(calculateRatio(20, 42))}`);
console.log('4) ' + `${42} / ${21} = ${formatDecimalNum(calculateRatio(42, 21))}`);
console.log('4) ' + `aaa / bbb = ${formatDecimalNum(calculateRatio('aaa', 'bbb'))}`);


/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

const compareNumbers = (a, b) => {
  if (a === b) return "Numbers are equal"
  return a > b ? a : b;
}

console.log('5) ' + `${20} vs. ${42} => ${compareNumbers(20, 42)}`);
console.log('5) ' + `${20.05} vs. ${20.06} => ${compareNumbers(20.05, 20.06)}`);
console.log('5) ' + `${40 / 13} vs. ${3.14} => ${compareNumbers(10 / 13, 3.14)}`);
console.log('5) ' + `${20} vs. ${20} => ${compareNumbers(20, 20)}`);



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
for (i = 0; i <= 730; i += 13) {
  console.log('6) ' + i);
}




/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here


const calculateCircleArea = (radius) => {
  if (radius <= 0) return;
  return Number(Math.PI * radius ** 2).toFixed(2);
}

const mockRadius = 4;

console.log('7) ' + `r = ${mockRadius} => S = ${calculateCircleArea(mockRadius)}`);




/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
const calculateConeVolume = (radius, height) => {
  const absoluteHeight = height >= 0 ? height : height * -1;
  if (radius <= 0) return;
  return Number(1 / 3 * Math.PI * absoluteHeight * radius ** 2).toFixed(2);
};
// v případě hodnoty z y osy
const mockHeight = -4;

console.log('8) ' + `r = ${mockRadius} && v = ${mockHeight} => V = ${calculateConeVolume(mockRadius, mockHeight)}`);


/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
const isTriagle = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0) return false;
  return a + b >= c && b + c >= a && a + c >= b;
};

console.log('9) ' + `a = 2 && b = 2 && c = 3  => ${isTriagle(2, 2, 3) ? 'is a triangle' : 'is not a triangle'}`);
console.log('9) ' + `a = 1 && b = 1 && c = 3  => ${isTriagle(1, 1, 3) ? 'is a triangle' : 'is not a triangle'}`);
console.log('9) ' + `a = -2 && b = 2 && c = 3  => ${isTriagle(-2, 2, 3) ? 'is a triangle' : 'is not a triangle'}`);


/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
const calculateSemiparameter = (a, b, c) => {
  return (a + b + c) / 2;
}

const calculateTriangleArea = (a, b, c) => {
  if (!isTriagle(a, b, c)) return 'Is not a triangle';
  const s = calculateSemiparameter(a, b, c);
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

console.log('9) ' + `a = 2 && b = 2 && c = 3  => S = ${calculateTriangleArea(2, 2, 3)}`);
console.log('9) ' + `a = 1 && b = 1 && c = 3  => S = ${calculateTriangleArea(1, 1, 3)}`);