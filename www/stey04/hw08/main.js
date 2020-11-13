/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
console.log("Pepe's age");
let year = 2000;
console.log("Pepe is", (new Date()).getFullYear() - year);



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
console.log("\nWTF (wow, that's fun)");
let convertCtoF = function (c) {
	return c * 9 / 5 + 32;
}

let convertFtoC = function (f) {
	return (f - 32) * 5 / 9;
}

console.log(convertCtoF(20), '°F');
console.log(convertFtoC(68), '°C');


/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
console.log("\nFunkce function fonction funktio");
function functionFonctionFunktio(args) {
	console.log(args);
}

functionFonctionFunktio('hi');
functionFonctionFunktio('hola');
functionFonctionFunktio('ahtung');

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
console.log("\n%CENSORED%");
let procento = function (x, y) {
	return ((33.3 * 100) / y).toFixed(2);
}

let res = procento(33.3, 75);
console.log(res);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
console.log("\nKdo s koho");
let bigger = function (x, y) {
	if (x > y) return x;
	if (x < y) return y;
	else return 'equals'
}
let a = bigger(10, 12);
let b = bigger(100.33, 12.11);
let c = bigger(10 / 2, 11 / 12);
let d = bigger(10, 10);
console.log(a, b, c, d);

/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
console.log("\nI can cleary see the pattern");
let getMultiplesOf = function (n = 13) {
	let res = [];
	let i = 0;
	while (true) {
		let m = i * n;
		if (m > 730) break;
		res.push(m);
		i++;
	}
	return res;
}

getMultiplesOf().forEach(n => console.log(n));

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
console.log("\nAround and about");
let getCircumFromRadius = function (r) {
	return Math.PI * r ** 2;
}

console.log(getCircumFromRadius(15));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr.
 */
console.log("\nAnother dimension");
let getConeVolume = function (r, h) {
	return (Math.PI * r ** 2 * h) / 3;
}

console.log(getConeVolume(10, 13));


/**
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no.
 */
console.log("\nNot sure if triangle, or just some random values");
let checkIfTriangle = function (a, b, c) {
	if (a + b > c && a + c > b && b + c > a) return true;
	return false;
}

console.log(checkIfTriangle(10, 10, 5));
console.log(checkIfTriangle(5, 4, 11));
console.log(checkIfTriangle(10, 30, 3));
console.log(checkIfTriangle(60, 30, 30));

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce,
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze,
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt()
 */
console.log("\nHeroic performance");
let heron = function (a, b, c) {
	if (!checkIfTriangle(a, b, c)) return 'not a triangle';
	let s = (a + b + c) / 2;
	return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

console.log(heron(10, 10, 5));
console.log(heron(10, 30, 3));
console.log(heron(5, 4, 11));
