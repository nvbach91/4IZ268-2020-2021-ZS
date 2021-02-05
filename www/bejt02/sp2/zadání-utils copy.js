// vyber elementu (dosadit do promenne)
const form = $('#form');
const input = $('#input');
const container = $('#container');

// pripojime udalost submit
form.submit((e) => {
    e.preventDefault();

    // zjistit hodnotu inputu
    // hodnotu predat do URL API
    // zavolat na API pres tento URL
    // dostat vysledek/odpoved v JSON
    // proiterovat polozky v odpovedi a vygenerovat HTML elementy (drinky)
    //      pripojit udalosti click na tlacitko v tech elementech -> provest ukladani do localStorage*
    // nove vytvorene elementy zobrazit na strance (container.append)

    // * funkce pro ukladani drinku do localStorage
    //      zjistime data pro dotycny drink
    //      ulozime data do localStorage.myDrinks pod id toho drinku

    // const myDrinks = {
    //     '1': { name: 'Voda', /*...*/ },
    //     '2': { name: 'Cola', /*...*/ },
    //     '4': { name: 'Vodka' },
    // };

    // ukladani:
    //    nacist z localStorage a zparsovat do objektu  
    //    localStorage.getItem('myDrinks')
    //    '{"1":{"name":"Voda"}}' => {'1':{name:'Voda'}}' pomoci JSON.parse()
    //    myDrinks[id] = { name: 'Vodka' } // ulozit novy zaznam do objektu
    //    objekt prevest do stringu a ulozit do localStorage pod stejnym klicem (myDrinks)

    // mazani: 
    //    nacist z localStorage a zparsovat do objektu  
    //    localStorage.getItem('myDrinks')
    //    '{"1":{"name":"Voda"}}' => {'1':{name:'Voda'}}' pomoci JSON.parse()
    //    delete myDrinks[id]
    //    objekt prevest do stringu a ulozit do localStorage pod stejnym klicem (myDrinks)
    
    // cteni: 
    //    nacist z localStorage a zparsovat do objektu  
    //    localStorage.getItem('myDrinks')
    //    '{"1":{"name":"Voda"}}' => {'1':{name:'Voda'}}' pomoci JSON.parse()
    //    proiterovat zaznamy v objektu
    //      Object.keys(myDrinks) => ['1', '2', '4'];
    //      Object.keys(myDrinks).forEach((key) => {
    //            const drink = myDrinks[key];
    //            // generovat html element + zobrazit na strance po skonceni 
    //      });
});
