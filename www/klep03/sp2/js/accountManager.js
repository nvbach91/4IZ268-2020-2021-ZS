$(document).ready(() => {
    /**
     * Získat elementy z DOM
     */
    let main = $('main');
    let right = $('#right');

    let mode = ['writeEmail', 'browseLeads', 'browseContacts'];
    let currentMode = 1;

    let buttonWriteEmailMode = $('#writeEmailMode');
    let buttonBrowseLeadsMode = $('#browseLeadsMode');
    let buttonBrowseContactsMode = $('#browseContactsMode');

    buttonWriteEmailMode.click(writeEmailMode);

    function writeEmailMode(idFromUrl, back) {
        main.empty();
        currentMode = 0;

        handleHistory(null, back);
        initialize();
    };

    buttonBrowseLeadsMode.click(browseLeadsMode);

    function browseLeadsMode(idFromUrl, back) {
        main.empty();
        currentMode = 1;

        initialize(idFromUrl, back);
    }

    buttonBrowseContactsMode.click(browseContactsMode);

    function browseContactsMode(idFromUrl, back) {
        main.empty();
        currentMode = 2;

        handleHistory(null, back);
        initialize();
    }

    /**
     * 
     * 
     * Nahrávání z historie
     * 
     */
    onpopstate = function () {
        /**
        * Načíst správnou stránku
        */
        let page;
        let idFromUrl;

        /** žádná stránka v adrese není */
        if (location.href.match(/(?<=.*#).+(?=\/)/) === null) {
            page = 'leadDetail';
        }
        /** nějaká stránka je v adrese */
        else {
            /** Získat to, co je za # a před /, např. xxxxxx#STRANKA/ */
            page = location.href.match(/(?<=.*#).+(?=\/)/)[0];
            switch (page) {
                case 'writeEmail':
                    currentMode = 0;
                    writeEmailMode(idFromUrl, true);
                    break;
                case 'leadDetail':
                    currentMode = 1;
                    idFromUrl = location.href.match(/(?<=.*#leadDetail\/)\d+/)[0];
                    browseLeadsMode(idFromUrl, true);
                    break;
                case 'searchContacts':
                    currentMode = 2;
                    browseContactsMode(idFromUrl, true);
                    break;
            }
        }
    }

    initialize();

    /**
     * 
     * @param {int} idFromUrl - id prectene z adresy
     * @param {boolean} back  - vracime se zpet?
     */
    function initialize(idFromUrl, back) {
        right.empty();
        if (currentMode === 0) {
            appendEmailFields(null, null, false);
        }
        else if (currentMode === 1) {
            setDisplayBrowseLeads(idFromUrl, back);
        }
        else if (currentMode === 2) {
            setDisplayBrowseContacts()
        }
    };

    /**
     * 
     * @param {int} index - index zaznamu v odpovedi z PIPEDRIVE, aby ho bylo mozne identifikovat pro prefill
     * @param {object} response - odpoved z PIPEDRIVE
     * @param {boolean} prefill - info, zda budeme predvyplnovat. Predvyplnuje se pouze pri detailu na lead
     */
    function appendEmailFields(index, response, prefill) {
        let list = [];

        /**
         * KOMU
         */
        let textTO = $('<p>Komu:</p>');
        list.push(textTO);

        let areaTO = $('<textarea>').addClass('areaTO area');
        list.push(areaTO);

        /**
         * Předmět
         */
        let textSubject = $('<p>Předmět: </p>');
        list.push(textSubject);

        let areaSubject = $('<textarea>').addClass('area areaSubject');
        list.push(areaSubject);

        /**
         * Text e-mailu
         */
        let textEmail = $('<p>Text e-mailu: </p>');
        list.push(textEmail);

        let areaEmail = $('<textarea>').addClass('area areaEmail');
        list.push(areaEmail);

        /**
         * Tlačítko
         */
        let buttonSendEmail = $('<button>Odeslat E-mail</button>');
        list.push(buttonSendEmail);

        /** Loader */
        let loader = $('<div>').addClass('loader');
        //list.push(loader); //smazat

        main.append(list);

        if (prefill === true) {
            areaTO.val(response.data[index].email[0].value);
            areaSubject.val('Reakce na vyplněný formulář');
            areaEmail.val(`Zdravíme ${response.data[index].name},\n\n\n\nPřeji pěkný den,\nPetr Klepetko`);
        }

        buttonSendEmail.click(function () {
            /** Schovat odesílací tlačítko */
            buttonSendEmail.addClass('hide');
            main.append(loader);

            let urlMail = 'https://hook.integromat.com/k3fbw3fqncf7364fwv52uju8qs13p399';

            let email = areaTO.val();
            let addressIsOk = email.match(/.+@.+\..+/);
            email = encodeURI(email);

            let subject = areaSubject.val();
            let subjectIsOk = subject.match(/.+?/);
            subject = encodeURI(subject);

            let content = areaEmail.val();
            let contentIsOk = content.match(/.+?/);
            content = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
            content = encodeURI(content);

            urlMail += `?to=${email}&subject=${subject}&content=${content}`;

            if (addressIsOk && subjectIsOk && contentIsOk) {
                $(document).load(urlMail, function (data, status) {
                    let emailResponse = JSON.parse(data);
                    if (emailResponse.response === 'successfull') {
                        $(areaTO).empty();
                        $(areaSubject).empty();
                        $(areaEmail).empty();
                        alert('Váš e-mail byl úspěšně odeslán. ');
                    }
                    else {
                        alert('Stala se chyba, e-mail nebyl odeslán. :(');
                    }
                    buttonSendEmail.removeClass('hide');
                    $('div').remove('.loader');
                }, 'json');
            }
            else {
                if (!addressIsOk) {
                    alert('Zadali jste adresu v nesprávném formátu. ');
                }
                else if (!subjectIsOk) {
                    alert('Není vyplněn předmět. ');
                }
                else if (!contentIsOk) {
                    alert('Není vyplněn text e-mailu. ');
                }
                buttonSendEmail.removeClass('hide');
                $('div').remove('.loader');
            }
        });
    };

    function setDisplayBrowseContacts() {
        let url = 'https://api.pipedrive.com/v1/persons?start=0&api_token=760b711ff687a4f4d60d1442f3b3e106820e4e35';
        $(document).load(url, function (data, status) {
            let response = JSON.parse(data);
            let howMany = response.data.length;
            let blocks = [];
            let containers = [];
            let list = [];
            for (let a = 0; a < howMany; a++) {
                blocks[a] = $('<div>').addClass('block');
                containers[a] = $('<div>').addClass('contactContainer');
                list.push(containers[a]);

                let idNumber = $('<p>').text(a + 1).addClass('idNumber');
                containers[a].append(idNumber);

                let name = $('<p>').text('Jméno: ' + response.data[a].name).addClass('blockLine');
                blocks[a].append(name);

                let email = $('<p>').text('E-mail: ' + response.data[a].email[0].value).addClass('blockLine');

                let mailHRef = $('<a href="mailto:' + response.data[a].email[0].value + '" ></a>');
                mailHRef.append(email);
                blocks[a].append(mailHRef);

                let phone = $('<p>').text('Telefon: ' + response.data[a].phone[0].value).addClass('blockLine');

                let telHRef = $('<a href="tel:' + response.data[a].phone[0].value + '" ></a>');
                telHRef.append(phone);
                blocks[a].append(telHRef);

                containers[a].append(blocks[a]);
            }
            main.append(list);
            setUpRightPanel(response);
        });
    };

    function setUpRightPanel(response) {
        /**
         * Clear right panel
         */
        right.empty();
        let rightItemList = [];
        let rightItem = [];

        let rightItemsContainer = $('<div>').addClass('rightItemsContainer');

        for (let a = 0; a < response.data.length; a++) {
            rightItem[a] = $('<div>').addClass('rightMenuItem');
            rightItem[a].append($('<p>').text(a + 1).addClass('rightMenuItemText'));
            rightItem[a].append($('<p>').text(response.data[a].name).addClass('rightMenuItemText'));

            rightItem[a].click(function () {
                displayOneLead(response, a);
            });

            rightItemsContainer.append(rightItem[a]);
        }

        right.append(rightItemsContainer)
    };

    function setDisplayBrowseLeads(idFromUrl, back) {
        /**
         * Získat persons
         */
        let url = 'https://api.pipedrive.com/v1/persons?start=0&api_token=760b711ff687a4f4d60d1442f3b3e106820e4e35';
        $(document).load(url, function (data, status) {
            let response = JSON.parse(data);
            let index;
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].id == idFromUrl) {
                    index = i;
                    break;
                }
            }
            displayOneLead(response, ifEmpty(index, 0), back);
        });
    };

    function displayOneLead(response, index, back) {
        /**
         * Vyčistit main prostor
         */
        main.empty();
        /** uložit person ID */
        person_id = response.data[index].id;

        /**
         * Získat Notes od person
         */
        let url = 'https://api.pipedrive.com/v1/notes?person_id=' + person_id + '&start=0&api_token=760b711ff687a4f4d60d1442f3b3e106820e4e35';
        $(document).load(url, function (noteData, status) {
            let noteResponse = JSON.parse(noteData);

            /**
             * Nastavit boční panel
             */
            setUpRightPanel(response);


            let list = [];
            let listClientInfo = [];

            let clientInfo = $('<div>').addClass('clientInfo');

            let row = [];

            row[0] = $('<div>').addClass('row');
            row[0].append($('<p>').text('Jméno: ').addClass('label'));
            row[0].append($('<p>').text(response.data[index].name).addClass('value'));
            listClientInfo.push(row[0]);

            row[1] = $('<div>').addClass('row');
            row[1].append($('<p>').text('E-mail: ').addClass('label'));
            row[1].append($('<p>').text(response.data[index].email[0].value));
            listClientInfo.push(row[1]);

            row[2] = $('<div>').addClass('row');
            row[2].append($('<p>').text('Telefon: ').addClass('label'));
            row[2].append($('<p>').text(response.data[index].phone[0].value));
            listClientInfo.push(row[2]);

            clientInfo.append(listClientInfo);
            list.push(clientInfo);

            row[3] = $('<div>').addClass('row noteHeader');
            row[3].append($('<p>').text('Info: ').addClass('label'));
            list.push(row[3]);

            row[4] = $('<div>').addClass('note');
            row[4].append($('<p>').html(noteResponse.data[0].content));
            list.push(row[4]);

            let contactHeading = $('<p>').text('Kontaktovat klienta: ').addClass('contactHeading');
            list.push(contactHeading);

            main.append(list);

            appendEmailFields(index, response, true);

            handleHistory(person_id, back);
        });
    };

    function handleHistory(index, back) {

        if (!back) {
            switch (currentMode) {
                case 0:
                    history.pushState({ page: 1 }, "Napsat e-mail", "#writeEmail/");
                    break;
                case 1:
                    if (index) {
                        history.pushState({ page: 2 }, "Náhled leadu", "#leadDetail/" + index);
                    }
                    break;
                case 2:
                    history.pushState({ page: 2 }, "Procházet kontakty", "#searchContacts/");
                    break;
            }
        }
    };

    function ifEmpty(value, replaceValue) {
        if (value) {
            return value;
        }
        else {
            return replaceValue;
        }
    }
    //end document
});