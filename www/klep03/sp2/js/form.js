$(document).ready(() => {
    const contactMethod = [];
    let contactMethodValue = 'phone';
    const chooseTime = document.querySelector('#choose-time');
    let chooseTimeisHidden = false;
    let sendButton = document.querySelector('#sendButton');
    const apiToken = "760b711ff687a4f4d60d1442f3b3e106820e4e35";
    let person_id;
    let loader;

    /**
     * 
     * Načtení dat z DOMu
     * 
     */

    /** Zpracování dat z formuláře */
    let firstName = document.querySelector('#first-name');
    let surname = document.querySelector('#surname');
    let email = document.querySelector('#email');
    let telefon = document.querySelector('#phone');
    let fieldForNote = document.querySelector('#fieldForNote');

    /** Čas kontaktování */
    let dayTime = [];
    dayTime[0] = document.querySelector('#morning');
    dayTime[1] = document.querySelector('#afternoon');

    /** Den kontaktování */
    let weekDay = [];
    weekDay[0] = document.querySelector('#monday');
    weekDay[1] = document.querySelector('#tuesday');
    weekDay[2] = document.querySelector('#wednesday');
    weekDay[3] = document.querySelector('#thursday');
    weekDay[4] = document.querySelector('#friday');
    weekDay[5] = document.querySelector('#saturday');
    weekDay[6] = document.querySelector('#sunday');

    /** Nastavit vše na NE */
    let weekDayDisplayValue = [];
    for (let a = 0; a < 7; a++) {
        weekDayDisplayValue[a] = 'Ne';
    }

    /** Metoda kontaktování */
    contactMethod[0] = document.querySelector('#contact-method-phone');
    contactMethod[1] = document.querySelector('#contact-method-email');

    //** Políčka na zpracování osobních údajů  */
    let agreeWithTerms = document.querySelector('#agreeWithTerms');
    let sendAds = document.querySelector('#sendAds');

    //** Zobrazení a schovávání kalendáře a uložení vybrané hodnoty způsobu kontaktování */
    for (let a = 0; a < 2; a++) {
        contactMethod[a].addEventListener('click', () => {
            if (a === 0 && chooseTime.classList.contains('hidden')) {
                chooseTime.classList.remove('hidden');
                contactMethodValue = "phone";
            }
            if (a === 1) {
                chooseTime.classList.add('hidden');
                contactMethodValue = "email";
            }
        });
    }

    /**
     * 
     * Akce po kliknutí na "Odeslat"
     * 
     */
    sendButton.addEventListener('click', () => {

        /** Kontrola vyplnění */
        if (firstName.value == "") {
            alert('Je třeba vyplnit jméno.');
        }
        else if (surname.value == "") {
            alert('Je třeba vyplnit příjmení.');
        }
        else if (email.value == "") {
            alert('Je třeba vyplnit email.');
        }
        else if (!email.value.match(/.+@.+\..+/)) {
            alert('Je třeba Vyplnit e-mail ve správné formě.');
        }
        else if (phone.value == "") {
            alert('Je třeba vyplnit telefon.');
        }
        else if (!phone.value.match(/\+?\d+/)) {
            alert('Je třeba vyplnit telefon ve správné podobě.');
        }
        else if (!agreeWithTerms.checked) {
            alert('Je třeba zaškrtnout souhlas se zpracováním osobních údajů.');
        }
        else {
            /**
             * nastavit loader místo odesílacího tlačítka
             */
            sendButton.classList.add('hidden');

            let rightSide = document.querySelector('#rightSide');
            loader = document.createElement('div');
            loader.classList.add('loader');
            loader.classList.add('form-row');
            loader.classList.add('inline');
            loader.classList.add('center-align');
            loader.classList.add('send-button-container');
            rightSide.appendChild(loader);



            /**
             * 
             * První požadavek - vytvoření osoby
             *  
             * */

            /** Vytvoření požadavku */
            var pdRequest = new XMLHttpRequest();

            var url = 'https://api.pipedrive.com/v1/persons?api_token=' + apiToken;

            /** Otevření požadavku, nastavení hlaviček */
            pdRequest.open('POST', url);
            pdRequest.setRequestHeader('Accept', 'application/json');
            pdRequest.setRequestHeader('Content-Type', 'application/json');

            /** Nastavení body */
            let body = {
                "name": `${firstName.value} ${surname.value}`,
                "email": [
                    email.value
                ],
                "phone": [
                    phone.value
                ]
            };

            /** nastavení akce po odeslání požadavku */
            pdRequest.addEventListener('load', function () {  // callback
                var data = JSON.parse(pdRequest.responseText);
                person_id = data.data.id;
                addNoteToPerson();
            });

            /** nastavení akce při erroru */
            pdRequest.addEventListener('error', function (e) {  // callback
                console.error('PdRequest error', e);
            });

            /** Vypálit požadavek do stratosféry */
            pdRequest.send(JSON.stringify(body));
        }
    });

    function addNoteToPerson() {
        /**
         * 
         * Druhý požadavek - vytvoření poznámky
         *  
         * */
        var pdRequestNote = new XMLHttpRequest();
        var url = 'https://api.pipedrive.com/v1/notes?api_token=' + apiToken;

        /** Otevření požadavku, nastavení hlaviček */
        pdRequestNote.open('POST', url);
        pdRequestNote.setRequestHeader('Accept', 'application/json');
        pdRequestNote.setRequestHeader('Content-Type', 'application/json');

        /** 
         * Nastavení body 
         */

        /** 
         * Nastavení výpisu dní, kdy má uživatel čas 
         */

        /** Pokud je zaškrtnutý den, tak se mu nastaví ANO */
        for (let a = 0; a < 7; a++) {
            if (weekDay[a].checked) {
                weekDayDisplayValue[a] = 'Ano';
            }
            else {
                weekDayDisplayValue[a] = 'Ne';
            }
        }

        /**
         * Vyprázdnění kalendáře
         */
        let calendar = '';
        let dayTimeDisplayValue = [];

        for (let a = 0; a < 2; a++) {
            if (dayTime[a].checked) {
                dayTimeDisplayValue[a] = 'Ano';
            }
            else {
                dayTimeDisplayValue[a] = 'Ne';
            }
        }

        /**
         * vytvoření poznámky, jak se propíše do Pipedrive
         */
        if (contactMethodValue === 'phone') {
            contactMethodValue = 'Telefonicky';
            calendar += `
            
            Pondělí:    ${weekDayDisplayValue[0]}
            Úterý:      ${weekDayDisplayValue[1]}
            Středa:     ${weekDayDisplayValue[2]}
            Čtvrtek:    ${weekDayDisplayValue[3]}
            Pátek:      ${weekDayDisplayValue[4]}
            Sobota:     ${weekDayDisplayValue[5]}
            Neděle:     ${weekDayDisplayValue[6]}
    
            Odpoledne:  ${dayTimeDisplayValue[0]}
            Dopoledne:  ${dayTimeDisplayValue[1]}
            `
        }
        /**
         * V poznámce nebudou dny, pokud chce kontaktovat e-mailem
         */
        else if (contactMethodValue === 'email') {
            contactMethodValue = 'E-mailem';
        }

        /**
         * Nastavení začátku poznámky, kde je odpověď na otázku, metoda kontaktu a dny, kdy se mu to hodí
         */
        let noteValue = 'Používáte nějaké naše produkty?\n' + fieldForNote.value
            + '\n\nPřeje si být kontaktován: ' + contactMethodValue + calendar;
        body = {
            "content": noteValue,
            "person_id": person_id
        };

        /** nastavení akce po odeslání požadavku */
        pdRequestNote.addEventListener('load', function () {  // callback
            //var data = JSON.parse(this.responseText);
            //console.log(data);
            loader.classList.add('hidden');
            sendButton.classList.remove('hidden');
            //alert('Požadavek byl úspěšně odeslán.');
            cleanUp();
        });

        /** nastavení akce při erroru */
        pdRequestNote.addEventListener('error', function (e) {  // callback
            console.error('PdRequest error', e);
        });

        /** Vypálit požadavek do stratosféry */
        pdRequestNote.send(JSON.stringify(body));
    }

    /** Metoda pro zobrazení děkovného textu */
    function cleanUp() {
        let containerMain = $('#container-main').empty();
        let text = $("<p></p>").text('Děkujeme za vyplnění.').addClass('thankYouText');
        $(containerMain).append(text).addClass('center-align');
    };

})