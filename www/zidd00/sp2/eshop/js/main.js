const App = {};

App.eshopContainer = $(`#eshop-container`);
App.loading = false;
App.verifyingEmail = false;
App.currentPage = `products`;

App.cartProductsAll = new Array;
console.log("len: " + App.cartProductsAll.length);

//kdyz se zmeni historie
window.onpopstate = (event) => {
    try {
        const page = event.state.page;
        if (page == `cart`) { //kosik
            App.renderCart();
        }
        else if (page == `form`) { //fakturacni udaje
            App.renderForm();
        }
        else if (page == `confirmation`) { //potvrzeni
            App.renderConfirmation();
        }
        else {
            App.renderEshop();
        }
    }
    catch {
        window.history.back();
    }
}

App.renderEshop = () => {

    App.currentPage = `products`;
    App.eshopContainer.empty();
    App.loading = true;

    const eshopCart = $(`<div class="cart">
        <div class="cart-text">
            <i class="fas fa-shopping-cart cart-icon"></i><div id="cart-balance">Nákupní košík (5999 CZK)</div>
        </div>
    </div>`);

    const eshopCartBuyButton = $(`<div class="cart-button">
        Otevřít
    </div>`);
    eshopCartBuyButton.click(() => {
        App.renderCart();
    });
    eshopCart.append(eshopCartBuyButton);
    App.eshopContainer.append(eshopCart);
    const loadingScreen = $(`<div class="merch-section"><h2>Načítání...</h2><div class="merch-container"></div>
    <div class="lds-container"><div class="lds-dual-ring"></div></div>
    </div>`);
    App.eshopContainer.append(loadingScreen);
    App.refreshCartBalance();

    //nacist data o produktech z db kolekce 'product'
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://czechwave-cc15.restdb.io/rest/product",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "5fef70b9823229477922c645",
            "cache-control": "no-cache"
        }
    }

    $.ajax(settings).done((data) => {

        if (App.currentPage == `products`) {
            App.loading = false;
            loadingScreen.remove();
            const productsWearable = [];
            const productsMusic = [];
            const numberOfProducts = data.length;
            for (let i = 0; i < numberOfProducts; i++) {
                const newProduct = $(`
                <div class="merch">
                    <img src="img/${data[i].file_image}" alt="Zboži" class="merch-picture">
                    <div class="merch-name">
                        ${data[i].name}
                    </div>
                    <div class="merch-price">
                        ${data[i].price} CZK
                    </div>
                    <div class="merch-buy" id="buy-button${i}">
                        Do košíku
                    </div>
                </div>
                `);

                if (data[i].section === 0) productsWearable.push(newProduct);
                else if (data[i].section === 1) productsMusic.push(newProduct);
            }

            const merchContainerWearable = $(`<div class="merch-container"></div>`);
            merchContainerWearable.append(productsWearable);
            const eshopContentWearable = $(`<div class="merch-section"><h2>Oblečení</h2></div>`);
            eshopContentWearable.append(merchContainerWearable);

            const merchContainerMusic = $(`<div class="merch-container"></div>`);
            merchContainerMusic.append(productsMusic);
            const eshopContentMusic = $(`<div class="merch-section"><h2>Hudební nosiče</h2></div>`);
            eshopContentMusic.append(merchContainerMusic);

            App.eshopContainer.append(eshopContentWearable);
            App.eshopContainer.append(eshopContentMusic);

            //click event listener pro všechny předtím vytvořené buttony
            for (let i = 0; i < numberOfProducts; i++) {
                const buyButton = $(`#buy-button${i}`);
                buyButton.click(() => {
                    const key = Date.now().toString();
                    const cartProduct = {
                        productName: data[i].name,
                        productPrice: data[i].price,
                        productFileName: data[i].file_image,
                        productKey: key,
                    }
                    
                    App.cartProductsAll.push(cartProduct);
                    window.localStorage.setItem(`cartProducts`, JSON.stringify(App.cartProductsAll));
                    App.refreshCartBalance();

                    swal({
                        title: `Zboží vloženo do košíku!`,
                        text: `Vložil jste ${data[i].name} do košíku.`,
                        buttons: {
                            confirm: { text: `Zavřít`, className: `warning-message` }
                        }
                    });
                });
            }
        }

    }).fail(() => {

        if (App.currentPage == `products`) {
            App.loading = false;
            loadingScreen.remove();
            App.eshopContainer.append(`<div class="merch-section"><h2>Chyba</h2><div class="merch-container"></div>
            <div class="eshop-error-message">E-shop se nepodařilo načíst.</div>
            </div>`);
        }
    });

    App.updateHistory(``);
};

App.refreshCartBalance = () => {
    const cartText = $(`#cart-balance`);
    let totalPrice = 0;
    for (let i = 0; i < App.cartProductsAll.length; i++) {
        totalPrice += App.cartProductsAll[i].productPrice;
    }
    cartText.text(`Nákupní košík (${totalPrice} CZK)`);
};

App.renderCart = () => {

    App.currentPage = `cart`;
    App.eshopContainer.empty();

    const eshopCartButtonBack = $(`
    <div class="cart-heading-button-back">
        Zpět
    </div>`);
    eshopCartButtonBack.click(() => {
        window.history.back();
        /*App.renderEshop();*/
    });

    const eshopCartButtonPay = $(`
    <div class="cart-heading-button-pay">
        Zaplatit
    </div>`);
    eshopCartButtonPay.click(() => {

        if (App.cartProductsAll.length == 0) {
            swal({
                title: `Košík je prázdný`,
                text: `Nejdříve vyberte produkty, které chcete koupit!`,
                buttons: {
                    confirm: { text: `Zavřít`, className: `warning-message` }
                }
            });
        }
        else {
            App.renderForm();
        }
    });

    const eshopCartButtonsHeading = $(`<div class="cart-heading-buttons"></div>`);
    eshopCartButtonsHeading.append(eshopCartButtonBack);
    eshopCartButtonsHeading.append(eshopCartButtonPay);

    const eshopCartHeading = $(`<div class="cart-heading"></div>`);
    eshopCartHeading.append(`<h2>Košík</h2>`);
    eshopCartHeading.append(eshopCartButtonsHeading);

    const eshopMerchSection = $(`<div class="merch-section"></div>`);
    eshopMerchSection.append(eshopCartHeading);

    const productsCart = [];
    let productsInCart = 0;
    for (let i = 0; i < App.cartProductsAll.length; i++) {
        productsInCart++;
        const newProduct = $(`
        <div class="merch">
            <img src="img/${App.cartProductsAll[i].productFileName}" alt="Zboži" class="merch-picture">
            <div class="merch-name">
                ${App.cartProductsAll[i].productName}
            </div>
            <div class="merch-price">
                ${App.cartProductsAll[i].productPrice} CZK
            </div>
            <div class="merch-buy" id="remove-button${App.cartProductsAll[i].productKey}">
                Odebrat
            </div>
        </div>
        `);
        productsCart.push(newProduct);
    }
    const eshopMerchContainer = $(`<div class="merch-container"></div>`);
    eshopMerchContainer.append(productsCart);
    eshopMerchSection.append(eshopMerchContainer);

    App.eshopContainer.append(eshopMerchSection);

    //click event listener pro všechny předtím vytvořené buttony
    for (let i = 0; i < App.cartProductsAll.length; i++) {
        const removeButton = $(`#remove-button${App.cartProductsAll[i].productKey}`);
        removeButton.click(() => {
            removeButton.parent().remove();
            App.cartProductsAll.splice(i, 1);
            window.localStorage.setItem(`cartProducts`, JSON.stringify(App.cartProductsAll));
            if (eshopMerchContainer.children().length == 0) eshopMerchSection.append(`<div class="eshop-error-message">Váš košík je prázdný.</div>`);
        });
    }

    if (productsInCart == 0) eshopMerchSection.append(`<div class="eshop-error-message">Váš košík je prázdný.</div>`);

    App.updateHistory(`cart`);
};


App.renderForm = () => {

    App.currentPage = `form`;
    App.eshopContainer.empty();
    if (App.cartProductsAll.length == 0) {

        const eshopFormButtonBack = $(`
        <div class="cart-heading-button-back">
            Zpět
        </div>`);
        eshopFormButtonBack.click(() => {

            if (!App.verifyingEmail) {
                window.history.back();
                /*App.renderCart();*/
            }
        });

        const eshopFormButtonsHeading = $(`<div class="cart-heading-buttons"></div>`);
        eshopFormButtonsHeading.append(eshopFormButtonBack);

        const eshopFormHeading = $(`<div class="cart-heading"></div>`);
        eshopFormHeading.append(`<h2>Chyba</h2>`);
        eshopFormHeading.append(eshopFormButtonsHeading);

        const eshopMerchSection = $(`<div class="merch-section"></div>`);
        eshopMerchSection.append(eshopFormHeading);

        eshopMerchSection.append(`<div class="eshop-error-message">Nemáte nic v košíku.</div>`);

        App.eshopContainer.append(eshopMerchSection);
    }
    else {

        const eshopFormInner = $(`
        <form>
            <div class="form-detail">
                <input class="form-input" id="input-name">
                <div class="form-detail-text">
                    Jméno a příjmení: <div class="form-detail-star">*</div>
                </div>
            </div>
            <div class="form-error" id="error-name">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-company">
                <div class="form-detail-text">
                    Firma: <div class="form-detail-star-hidden">*</div>
                </div>
            </div>
            <div class="form-error" id="error-company">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-street">
                <div class="form-detail-text">
                    Ulice a číslo: <div class="form-detail-star">*</div>
                </div>
            </div>
            <div class="form-error" id="error-street">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-town">
                <div class="form-detail-text">
                    Město: <div class="form-detail-star">*</div>
                </div>
            </div>
            <div class="form-error" id="error-town">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-zipcode">
                <div class="form-detail-text">
                    PSČ: <div class="form-detail-star">*</div>
                </div>
            </div>
            <div class="form-error" id="error-zipcode">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-ic">
                <div class="form-detail-text">
                    IČ: <div class="form-detail-star-hidden">*</div>
                </div>
            </div>
            <div class="form-error" id="error-ic">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-dic">
                <div class="form-detail-text">
                    DIČ: <div class="form-detail-star-hidden">*</div>
                </div>
            </div>
            <div class="form-error" id="error-dic">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-email">
                <div class="form-detail-text">
                    E-mail: <div class="form-detail-star">*</div>
                </div>
            </div>
            <div class="form-error" id="error-email">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <input class="form-input" id="input-phone">
                <div class="form-detail-text">
                    Telefon: <div class="form-detail-star">*</div>
                </div>
            </div>
            <div class="form-error" id="error-phone">
                Špatně zadaná hodnota!
            </div>

            <div class="form-detail">
                <select class="form-input" id="input-payment">
                    <option>Dobírka</option>
                    <option>Karta</option>
                    <option>Převod</option>
                    <option>PayPal</option>
                </select>
                <div class="form-detail-text">
                    Způsob platby: <div class="form-detail-star-hidden">*</div>
                </div>
            </div>
        </form>`);

        const eshopFormButtonBuy = $(`
        <div class="form-button-buy">
            Koupit
        </div>`);

        const eshopFormButtonBack = $(`
        <div class="form-button-back">
            Zpět
        </div>`);
        eshopFormButtonBack.click(() => {

            if (!App.verifyingEmail) {
                window.history.back();
                /*App.renderCart();*/
            }
        });

        eshopFormInner.append(eshopFormButtonBuy);
        eshopFormInner.append(eshopFormButtonBack);

        const eshopFormContainer = $(`<div class="form-container"></div>`);
        eshopFormContainer.append(eshopFormInner);

        const eshopMerchSection = $(`<div class="merch-section"></div>`);
        eshopMerchSection.append(`<div class="cart-heading">
            <h2>Fakturační údaje</h2>
        </div>`);
        eshopMerchSection.append(eshopFormContainer);

        App.eshopContainer.append(eshopMerchSection);

        const inputName = $(`#input-name`);
        const inputCompany = $(`#input-company`);
        const inputStreet = $(`#input-street`);
        const inputTown = $(`#input-town`);
        const inputZipCode = $(`#input-zipcode`);
        const inputIC = $(`#input-ic`);
        const inputDIC = $(`#input-dic`);
        const inputEmail = $(`#input-email`);
        const inputPhone = $(`#input-phone`);
        const inputPayment = $(`#input-payment`);

        const errorName = $(`#error-name`).hide();
        const errorCompany = $(`#error-company`).hide();
        const errorStreet = $(`#error-street`).hide();
        const errorTown = $(`#error-town`).hide();
        const errorZipCode = $(`#error-zipcode`).hide();
        const errorIC = $(`#error-ic`).hide();
        const errorDIC = $(`#error-dic`).hide();
        const errorEmail = $(`#error-email`).hide();
        const errorPhone = $(`#error-phone`).hide();

        eshopFormButtonBuy.click(() => {

            if (!App.verifyingEmail) {
                errorName.hide();
                errorCompany.hide();
                errorStreet.hide();
                errorTown.hide();
                errorZipCode.hide();
                errorIC.hide();
                errorDIC.hide();
                errorEmail.hide();
                errorPhone.hide();

                let valid = true;
                let regex;
                //jmeno a prijmeni, povinne
                if (inputName.val().length < 5) {
                    if (inputName.val().length == 0) errorName.text(`Tento atribut je povinný!`);
                    else errorName.text(`Jméno je příliš krátké!`);
                    errorName.show();
                    valid = false;
                }
                //nazev firmy, nepovinne
                if (inputCompany.val().length >= 1 && inputCompany.val().length <= 3) {
                    errorCompany.text(`Název firmy je příliš krátký!`);
                    errorCompany.show();
                    valid = false;
                }
                //ulice a cislo, povinne
                regex = new RegExp(`^[a-zA-ZěščřžýáíéĚŠČŘŽÝÁÍÉ]+( \\d+(\\/\\d+)?)?$`);
                if (inputStreet.val().length == 0) {
                    errorStreet.text(`Tento atribut je povinný!`);
                    errorStreet.show();
                    valid = false;
                }
                else if (!regex.test(inputStreet.val())) {
                    errorStreet.text(`Tato adresa je neplatná!`);
                    errorStreet.show();
                    valid = false;
                }
                //mesto, povinne
                if (inputTown.val().length == 0) {
                    errorTown.text(`Tento atribut je povinný!`);
                    errorTown.show();
                    valid = false;
                }
                //psc, povinne
                regex = new RegExp(`^\\d+$`);
                if (inputZipCode.val().length == 0) {
                    errorZipCode.text(`Tento atribut je povinný!`);
                    errorZipCode.show();
                    valid = false;
                }
                else if (!regex.test(inputZipCode.val())) {
                    errorZipCode.text(`Toto PSČ je neplatné! (nezadávejte mezery)`);
                    errorZipCode.show();
                    valid = false;
                }
                //ic, nepovinne
                regex = new RegExp(`^\\d{8}$`);
                if (inputIC.val().length >= 1 && !regex.test(inputIC.val())) {
                    errorIC.text(`Toto IČ není platné!`);
                    errorIC.show();
                    valid = false;
                }
                //dic, nepovinne
                regex = new RegExp(`^[A-Z]{2}\\d{8,12}$`);
                if (inputDIC.val().length >= 1 && !regex.test(inputDIC.val())) {
                    errorDIC.text(`Toto DIČ není platné!`);
                    errorDIC.show();
                    valid = false;
                }
                //email, povinne
                regex = new RegExp(`^\\S+@\\S+$`);
                if (inputEmail.val().length == 0) {
                    errorEmail.text(`Tento atribut je povinný!`);
                    errorEmail.show();
                    valid = false;
                }
                else if (!regex.test(inputEmail.val())) {
                    errorEmail.text(`Tento e-mail je neplatný!`);
                    errorEmail.show();
                    valid = false;
                }
                //tel cislo, povinne
                regex = new RegExp(`^\\+?\\d+$`);
                if (inputPhone.val().length == 0) {
                    errorPhone.text(`Tento atribut je povinný!`);
                    errorPhone.show();
                    valid = false;
                }
                else if (!regex.test(inputPhone.val())) {
                    errorPhone.text(`Toto číslo je neplatné!`);
                    errorPhone.show();
                    valid = false;
                }

                if (valid) {
                    errorEmail.css(`color`, `orange`);
                    errorEmail.text(`Ověřuji e-mail...`);
                    errorEmail.show();

                    const apiKey = `EtKLJCH0vO06xENnXYx2rrZp4tWygV4P0qgRbMLOLz0oeuSqPm`;
                    const url = `https://app.verify-email.org/api/v1/${apiKey}/verify/${inputEmail.val()}`;
                    App.verifyingEmail = true;
                    $.getJSON(url).done((info) => {

                        App.verifyingEmail = false;
                        if (App.currentPage == `form`) {
                            if (info.status == 1) {
                                App.renderConfirmation(inputName.val(), inputCompany.val(), inputStreet.val(), inputTown.val(), inputZipCode.val(), inputIC.val(), inputDIC.val(), inputEmail.val(), inputPhone.val(), inputPayment.val());
                            }
                            else {
                                errorEmail.css(`color`, `red`);
                                errorEmail.text(`Tento e-mail je neplatný!`);
                            }
                        }

                    }).fail(() => {

                        App.verifyingEmail = false;
                        if (App.currentPage == `form`) {
                            errorEmail.css(`color`, `red`);
                            errorEmail.text(`E-mail se nepodařilo ověřit.`);
                        }

                    });
                }
            }
        });
    }

    App.updateHistory(`form`);
};

App.renderConfirmation = (name, company, street, town, zipcode, ic, dic, email, phone, payment) => {

    App.currentPage = `confirmation`;
    App.eshopContainer.empty();

    if (App.cartProductsAll.length == 0) {
        App.eshopContainer.append(`<div class="merch-section">
            <div class="cart-heading">
                <h2>Chyba</h2>
            </div>
            <div class="payment-done">
                <i class="fas fa-times-circle payment-done-icon"></i>
                <div class="payment-done-text">Něco se pokazilo, zkuste to později</div>
            </div>
        </div>`);
    }
    else {

        const loadingScreen = $(`<div class="merch-section"><h2>Zpracovávání...</h2><div class="merch-container"></div>
        <div class="lds-container"><div class="lds-dual-ring"></div></div>
        </div>`);
        App.eshopContainer.append(loadingScreen);

        //poslat data o objednavce do kolekce 'order'
        let jsonItems = [];
        for (let i = 0; i < App.cartProductsAll.length; i++) {

            let item = {};
            item[`name`] = App.cartProductsAll[i].productName;
            item[`price`] = App.cartProductsAll[i].productPrice;
            jsonItems.push(item);
        }

        let jsonData = { "name": name, "company": company, "street": street, "town": town, "zipcode": zipcode, "ic": ic, "dic": dic, "email": email, "phone": phone, "payment": payment };
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://czechwave-cc15.restdb.io/rest/order",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5fef70b9823229477922c645",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsonData)
        }
        $.ajax(settings).done((response) => {

            let settingsItems = {
                "async": true,
                "crossDomain": true,
                "url": `https://czechwave-cc15.restdb.io/rest/order/${response._id}/items`,
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": "5fef70b9823229477922c645",
                    "cache-control": "no-cache"
                },
                "processData": false,
                "data": JSON.stringify(jsonItems)
            }

            $.ajax(settingsItems).done((responseItems) => {

                if (App.currentPage == `confirmation`) {
                    loadingScreen.remove();
                    App.eshopContainer.append(`<div class="merch-section">
                        <div class="cart-heading">
                            <h2>Hotovo</h2>
                        </div>
                        <div class="payment-done">
                            <i class="fas fa-check-circle payment-done-icon"></i>
                            <div class="payment-done-text">Objednávka dokončena, děkujeme!</div>
                        </div>
                    </div>`);
                }

                while (App.cartProductsAll.length) {
                    App.cartProductsAll.pop();
                }
            }).fail(() => {

                if (App.currentPage == `confirmation`) {
                    loadingScreen.remove();
                    App.eshopContainer.append(`<div class="merch-section">
                        <div class="cart-heading">
                            <h2>Chyba</h2>
                        </div>
                        <div class="payment-done">
                            <i class="fas fa-times-circle payment-done-icon"></i>
                            <div class="payment-done-text">Něco se pokazilo, zkuste to později</div>
                        </div>
                    </div>`);
                }
            });
        }).fail(() => {

            if (App.currentPage == `confirmation`) {
                loadingScreen.remove();
                App.eshopContainer.append(`<div class="merch-section">
                    <div class="cart-heading">
                        <h2>Chyba</h2>
                    </div>
                    <div class="payment-done">
                        <i class="fas fa-times-circle payment-done-icon"></i>
                        <div class="payment-done-text">Něco se pokazilo, zkuste to později</div>
                    </div>
                </div>`);
            }

        });
    }

    App.updateHistory(`confirmation`);
};

App.updateHistory = (url) => {
    if (!history.state || history.state.page != url) {
        history.pushState({ "page": url }, '', url);
    }
};

$(document).ready(() => {
    
    if(localStorage.getItem('cartProducts') != null) App.cartProductsAll = JSON.parse(localStorage.getItem('cartProducts'));
    App.renderEshop();
});