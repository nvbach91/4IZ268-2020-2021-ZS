/* HOMEWORK */
/**
 * 1) Pepe's age. Vypište na konzoli smysluplnou oznamovací větu ohledně věku Pepy, pokud znáte jeho rok narození, 
 * který je uložený v proměnné a pro výpis použijte zřetězení stringů. Pro názvy proměnných používejte smysluplnou 
 * angličtinu.
 */
// Solution here
var birthYear = 1990;
var currentYear = new Date().getFullYear();
console.log('Pepovi je '+(currentYear - birthYear)+' let.')

/**
 * 2) WTF (wow, that's fun). Vypište teplotu v Fahrenheiht, pokud znáte teplotu v Celsius, a také naopak. 
 * Formát výpisu je: 20°C =  68°F resp. 68°F = 20°C. Výpočet probíhá takto:
 *     z C na F: vynásobit devíti, vydělit pěti a přičíst 32. 
 *     z F na C: odečíst 32, vynásobit pěti a vydělit devítkou. 
 */
// Solution here
const celsiusToFarenheit = (celsiusValue) => {
  return (celsiusValue + '°C = ' +(celsiusValue * 9 / 5 + 32 )+ '°F');
}

const farenheitToCelsius = (farenheitValue) => {
  return (farenheitValue + '°F = '+(farenheitValue - 32) * 5 / 9 ) + '°C';
}

const celsiusExample = 30;
console.log(celsiusToFarenheit(celsiusExample))

const farenheitExample = 90;
console.log(farenheitToCelsius(farenheitExample))



/**
 * 3) Funkce function fonction funktio. Vemte předchozí úlohy a udělejte z nich funkce. Tj. vytvořte funkce, 
 * které přijímají argumenty, a na základě argumentů po zavolání vypíše výsledek na konzoli. 
 * Párkrát zavolejte tyto funkce s různými argumenty. V konzoli také vyzkoušejte, zda fungují vaše funkce. 
 */
// Solution here

//Funkce pro úlohu 1
const ageFromBirthY = (birthY) => {
  return console.log('Pepovi je ' + (currentYear - birthY) + ' let.')
}

ageFromBirthY(2006)
ageFromBirthY(1987)


//Funkce pro úlohu 2 jsem již vytvořil v jejím řešení
console.log(celsiusToFarenheit(-12))
console.log(farenheitToCelsius(20))




/**
 * 4) %CENSORED%. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí podíl prvního čísla a druhého čísla 
 * v procentech. Výsledek vypište do konzole, např. 21 je 50% z 42. Pro zkrácení / zaokrouhlování desetinných 
 * míst použijte funkci .toFixed(n). Např. var pi = 3.1415926535; pi.toFixed(2); Pozor na dělení nulou! 
 */
// Solution here
const calculateRatio = (a, b) =>{
  if (b === 0) return ('dělení nulou');
  return (a / b).toFixed(2)
}

console.log('20 je ' + (calculateRatio(20, 80) * 100) + '% z 80')





/**
 * 5) Kdo s koho. Vytvořte funkci, která vezme 2 číselné argumenty a vrátí ten větší z nich. Pokud se čísla 
 * rovnají, vypište, že se rovnají. Vyzkoušejte funkčnost pro celá čísla, desetinná čísla, zlomky. Zkuste 
 * je párkrát zavolat v kódu a výsledky uložit do proměnných. 
 */
// Solution here

const whoIsGreater = (a, b) =>{
  if(a > b){
    return a;
  }else if(a < b){
    return b;
  }else{
    return ('Čísla se rovnají')
  }
}

console.log(whoIsGreater(4,5))
console.log(whoIsGreater(5,5))
console.log(whoIsGreater(74.6,25.85))
console.log(whoIsGreater(8/9,7/8))




/**
 * 6) I can cleary see the pattern. Vytvořte funkci, která vypíše popořadě všechny násobky 13, které jsou menší 
 * nebo rovno 730, včetě nuly. Používejte for loop. 
 */
// Solution here

const multiplesByThirteen = () =>{
  for (var i = 0; i <= 730; i = i + 13) {
    console.log(i)
  }
}

multiplesByThirteen();


/**
 * 7) Around and about. Vytvořte funkci, která vypočte obsah kružnice podle dodaného poloměru v argumentu. 
 */
// Solution here
 const circleArea = (radius) =>{
   return (Math.PI * radius**2).toFixed(2);
 }

 console.log(circleArea(5));



/**
 * 8) Another dimension. Vytvořte funkci, která vypočte objem kuželu, pokud dostanete na argumentech výšku a poloměr. 
 */
// Solution here

const  coneVolume = (radius, height) =>{
  return (Math.PI * radius**2 * (height/3)).toFixed(2);
}

console.log(coneVolume(5,10));




/** 
 * 9) Not sure if triangle, or just some random values. Vytvořte funkci, která rozhodne, zda se z 
 * dodaných 3 délek dá postavit trojúhelník, tj. vypíše buď true/yes nebo false/no. 
 */
// Solution here

const triangleInequality = (a, b, c) =>{
  if((a + b) > c && (b + c) > a && (a + c) > b ) {return true;} else {return false;}
  return
}

console.log(triangleInequality(10, 30, 21))



/**
 * 10) Heroic performance. Vytvořte funkci, která vypočte obsah trojúhelníka podle Heronova vzorce, 
 * tj. funkce dostane délky všech 3 stran. Použijte přitom předchozí validaci, tj. počítejte pouze, 
 * když to má smysl. Hint: funkce pro odmocninu je Math.sqrt() 
 */
// Solution here

const heronsFormula = (a, b, c) => {
  if(triangleInequality(a, b, c)){
    var s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c)).toFixed(2);
  } else{
    return false;
  }
}

console.log(heronsFormula(10,30,21))