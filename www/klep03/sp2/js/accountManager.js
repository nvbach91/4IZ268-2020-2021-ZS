let mode = ['writeEmail', 'browseLeads', 'browseContacts'];
let currentMode = 1;

const regexContactMethod = new RegExp('(?<=Přeje si být kontaktován: ).+(?=<br)')

let main = document.querySelector('main');
function getMode() {
    return (mode[currentMode]);
};

$('#writeEmailMode').click(function () {
    if (currentMode !== 0) {
        $('main').empty();
        currentMode = 0;
        initialize();
    }
});

$('#browseLeadsMode').click(function () {
    if (currentMode !== 1) {
        $('main').empty();
        currentMode = 1;
        initialize();
    }
});

$('#browseContactsMode').click(function () {
    if (currentMode !== 2) {
        $('main').empty();
        currentMode = 2;
        initialize();
    }
});


initialize();

function initialize() {
    $('#right').empty();

    if (currentMode === 0) {
        appendEmailFields(null, null, false);
    }
    else if (currentMode === 1) {
        setDisplayBrowseLeads();

    }
    else if (currentMode === 2) {
        setDisplayBrowseContacts()
    }

};

function appendEmailFields(index, response, prefill) {
    let list = [];

    /**
     * KOMU
     */
    let textTO = $('<p></p>').text('Komu: ');
    list.push(textTO);

    let areaTO = $('<textArea></textArea>').addClass('areaTO area');
    list.push(areaTO);

    /**
     * Předmět
     */
    let textSubject = $('<p></p>').text('Předmět: ');
    list.push(textSubject);

    let areaSubject = $('<textArea></textArea>').addClass('area areaSubject');
    list.push(areaSubject);

    /**
     * Text e-mailu
     */
    let textEmail = $('<p></p>').text('Text e-mailu: ');
    list.push(textEmail);

    let areaEmail = $('<textArea></textArea>').addClass('area areaEmail');
    list.push(areaEmail);

    /**
     * Tlačítko
     */
    let buttonSendEmail = $('<button></button>').text('Odeslat E-mail');
    list.push(buttonSendEmail);

    /** Loader */
    let loader = $('<div></div>').addClass('loader');
    //list.push(loader); //smazat

    $('main').append(list);

    if (prefill === true) {
        areaTO.val(response.data[index].email[0].value);
        areaSubject.val('Reakce na vyplněný formulář');
        areaEmail.val(`Zdravíme ${response.data[index].name},\n\n\n\nPřeji pěkný den,\nPetr Klepetko`);
    }

    $(buttonSendEmail).click(function () {
        /** Schovat odesílací tlačítko */
        buttonSendEmail.addClass('hide');
        $('main').append(loader);

        let urlMail = 'https://hook.integromat.com/k3fbw3fqncf7364fwv52uju8qs13p399';

        let email = $(areaTO).val();
        let addressIsOk = email.match(/.+@.+\..+/);
        email = encodeURI(email);

        let subject = $(areaSubject).val();
        let subjectIsOk = subject.match(/.+?/);
        subject = encodeURI(subject);

        let content = $(areaEmail).val();
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
            blocks[a] = $('<div></div>').addClass('block');
            containers[a] = $('<div></div>').addClass('contactContainer');
            list.push(containers[a]);

            let idNumber = $('<p></p>').text(a + 1).addClass('idNumber');
            containers[a].append(idNumber);

            let name = $('<p></p>').text('Jméno: ' + response.data[a].name).addClass('blockLine');
            blocks[a].append(name);

            let email = $('<p></p>').text('E-mail: ' + response.data[a].email[0].value).addClass('blockLine');

            let mailHRef = $('<a href="mailto:' + response.data[a].email[0].value + '" ></a>');
            mailHRef.append(email);
            blocks[a].append(mailHRef);

            let phone = $('<p></p>').text('Telefon: ' + response.data[a].phone[0].value).addClass('blockLine');

            let telHRef = $('<a href="tel:' + response.data[a].phone[0].value + '" ></a>');
            telHRef.append(phone);
            blocks[a].append(telHRef);

            containers[a].append(blocks[a]);
        }
        $(main).append(list);
        setUpRightPanel(response);
    });
};

function setUpRightPanel(response) {
    /**
     * Clear right panel
     */
    $('#right').empty();
    let rightItemList = [];
    let rightItem = [];

    let rightItemsContainer = $('<div></div>').addClass('rightItemsContainer');

    for (let a = 0; a < response.data.length; a++) {
        rightItem[a] = $('<div></div>').addClass('rightMenuItem');
        rightItem[a].append($('<p></p>').text(a + 1).addClass('rightMenuItemText'));
        rightItem[a].append($('<p></p>').text(response.data[a].name).addClass('rightMenuItemText'));

        $(rightItem[a]).click(function () {
            displayOneLead(response, a);
        });

        rightItemsContainer.append(rightItem[a]);
    }

    $('#right').append(rightItemsContainer)
};

function setDisplayBrowseLeads() {
    /**
     * Získat persons
     */
    let url = 'https://api.pipedrive.com/v1/persons?start=0&api_token=760b711ff687a4f4d60d1442f3b3e106820e4e35';
    $(document).load(url, function (data, status) {
        let response = JSON.parse(data);

        displayOneLead(response, 0);

    });
};

function displayOneLead(response, index) {
    /**
     * Vyčistit main prostor
     */
    $('main').empty();

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

        let clientInfo = $('<div></div>').addClass('clientInfo');

        let row = [];

        row[0] = $('<div></div>').addClass('row');
        row[0].append($('<p></p>').text('Jméno: ').addClass('label'));
        row[0].append($('<p></p>').text(response.data[index].name).addClass('value'));
        listClientInfo.push(row[0]);

        row[1] = $('<div></div>').addClass('row');
        row[1].append($('<p></p>').text('E-mail: ').addClass('label'));
        row[1].append($('<p></p>').text(response.data[index].email[0].value));
        listClientInfo.push(row[1]);

        row[2] = $('<div></div>').addClass('row');
        row[2].append($('<p></p>').text('Telefon: ').addClass('label'));
        row[2].append($('<p></p>').text(response.data[index].phone[0].value));
        listClientInfo.push(row[2]);

        clientInfo.append(listClientInfo);
        list.push(clientInfo);

        row[3] = $('<div></div>').addClass('row noteHeader');
        row[3].append($('<p></p>').text('Info: ').addClass('label'));
        list.push(row[3]);

        row[4] = $('<div></div>').addClass('note');
        row[4].append($('<p></p>').html(noteResponse.data[0].content));
        list.push(row[4]);

        let contactHeading = $('<p></p>').text('Kontaktovat klienta: ').addClass('contactHeading');
        list.push(contactHeading);

        $('main').append(list);

        appendEmailFields(index, response, true);
    });
};
