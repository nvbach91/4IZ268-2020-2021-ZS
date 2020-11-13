/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
birthYear = 2000;
console.log("Pepe's age is " + (new Date().getFullYear() - birthYear));



/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
degrees = 30;
console.log(degrees + "°C =  " + (degrees*9/5+32) + "°F")
console.log(degrees + "°F =  " + ((degrees-32)*5/9) + "°C")




/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here
function echoAge(birthYear) {
	console.log("Pepe's age is " + (new Date().getFullYear() - birthYear));
}
echoAge(1999);
echoAge(2005);
echoAge(1894);

function echoDegrees(degrees) {
	console.log(degrees + "°C =  " + (degrees*9/5+32) + "°F")
	console.log(degrees + "°F =  " + ((degrees-32)*5/9) + "°C")
}
echoDegrees(91);
echoDegrees(21);
echoDegrees(0);

/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
function calcNumbers(x, y) {
	if (x == 0 || y == 0) {
        return console.log("Číslo x nebo y se rovná 0")
    }
    percentage = ((x / y) * 100).toFixed(1);
    return console.log(x + " je " + percentage + "% z " + y);
}
calcNumbers(1, 100);
calcNumbers(2, 5);
calcNumbers(25, 50);

/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here
function bigger(x, y) {
	if (x == y) {
		console.log("Čísla se rovnají.")
		return x;
	} else if (x > y) {
		return x;
	} else if (x < y) {
		return y;
	}
}
console.log(a = bigger(5, 5));
console.log(b = bigger(1.5, 5));
console.log(c = bigger(6, 4));



/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here
function multiples() {
	for (i = 13; i <= 730; i += 13) {
        console.log(i);
    }
}
multiples();

/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
function contentOfCircle(r) {
    return (r * r) * Math.PI;
}
console.log(contentOfCircle(5));

/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here
function volume(h, r) {
	return (1 / 3) * (Math.PI * (r * r) * h);
}
console.log(volume(2, 5));

/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here
function triangle(a, b, c) {
	if ((a + b > c) && (c + b > a) && (a + c > b)) {
        console.log("true");
        return true;
    }
    console.log("false");
    return false;
}
triangle(4, 5, 6);
triangle(1, 1, 6);

/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here
function hero(a, b, c) {
	if (!triangle(a, b, c)) {
        return console.log("Trojúhelník nelze sestavit.");
    }
    o = (a + b + c) / 2;
    s = Math.sqrt(o * (o - a) * (o - b) * (o - c));
    return s;
}
console.log(hero(2, 2, 3));

