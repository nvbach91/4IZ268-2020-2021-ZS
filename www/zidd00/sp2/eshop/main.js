const eshopContainer = $('#eshop-container');


const renderEshop = () => {

    eshopContainer.empty();
    
    //tady se budou nacitat produkty z databaze

    const eshopCart = $(`<div class="cart">
        <div class="cart-text">
            <i class="fas fa-shopping-cart cart-icon"></i>Nákupní košík (5999 CZK)
        </div>
    </div>`);

    const eshopCartBuyButton = $(`<div class="cart-button">
        Otevřít
    </div>`);
    eshopCartBuyButton.click(() => {
        renderCart();
    });
    eshopCart.append(eshopCartBuyButton);

    const eshopContent = $(`<div class="merch-section">
        <h2>Oblečení</h2>
        <div class="merch-container">
            <div class="merch">
                <img src="img/tee_white.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Bílé tričko CzechWave
                </div>
                <div class="merch-price">
                    599 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
            <div class="merch">
                <img src="img/tee_black.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Černé tričko CzechWave
                </div>
                <div class="merch-price">
                    599 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
            <div class="merch">
                <img src="img/hoodie_white.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Bílá mikina CzechWave
                </div>
                <div class="merch-price">
                    899 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
            <div class="merch">
                <img src="img/hoodie_black.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Černá mikina CzechWave
                </div>
                <div class="merch-price">
                    899 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
            <div class="merch">
                <img src="img/pin.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Pin CzechWave
                </div>
                <div class="merch-price">
                    50 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
        </div>
    </div>

    <div class="merch-section">
        <h2>Hudební nosiče</h2>
        <div class="merch-container">
            <div class="merch">
                <img src="img/album.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Největší synthwave hity, vinyl
                </div>
                <div class="merch-price">
                    959 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
            <div class="merch">
                <img src="img/tape.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Největší synthwave hity, kazeta
                </div>
                <div class="merch-price">
                    799 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
            <div class="merch">
                <img src="img/cd.png" alt="Zboži" class="merch-picture">
                <div class="merch-name">
                    Největší synthwave hity, CD
                </div>
                <div class="merch-price">
                    199 CZK
                </div>
                <div class="merch-buy">
                    Do košíku
                </div>
            </div>
        </div>
    </div>`);
    eshopContainer.append(eshopCart);
    eshopContainer.append(eshopContent);
};


const renderCart = () => {
    
    eshopContainer.empty();

    //tady se budou nacitat produkty z kosiku

    const eshopCartButtonBack = $(`
    <div class="cart-heading-button-back">
        Zpět
    </div>`);
    eshopCartButtonBack.click(() => {
        renderEshop();
    });

    const eshopCartButtonPay = $(`
    <div class="cart-heading-button-pay">
        Zaplatit
    </div>`);
    eshopCartButtonPay.click(() => {
        renderForm();
    });

    const eshopCartButtonsHeading = $(`<div class="cart-heading-buttons"></div>`);
    eshopCartButtonsHeading.append(eshopCartButtonBack);
    eshopCartButtonsHeading.append(eshopCartButtonPay);

    const eshopCartHeading = $(`<div class="cart-heading"></div>`);
    eshopCartHeading.append(`<h2>Košík</h2>`);
    eshopCartHeading.append(eshopCartButtonsHeading);

    const eshopMerchSection = $(`<div class="merch-section"></div>`);
    eshopMerchSection.append(eshopCartHeading);
    eshopMerchSection.append(`<div class="merch-container">
        <div class="merch">
            <img src="img/tee_white.png" alt="Zboži" class="merch-picture">
            <div class="merch-name">
                Bílé tričko CzechWave
            </div>
            <div class="merch-price">
                599 CZK
            </div>
            <div class="merch-buy">
                Odebrat
            </div>
        </div>
        <div class="merch">
            <img src="img/tee_black.png" alt="Zboži" class="merch-picture">
            <div class="merch-name">
                Černé tričko CzechWave
            </div>
            <div class="merch-price">
                599 CZK
            </div>
            <div class="merch-buy">
                Odebrat
            </div>
        </div>
        <div class="merch">
            <img src="img/hoodie_white.png" alt="Zboži" class="merch-picture">
            <div class="merch-name">
                Bílá mikina CzechWave
            </div>
            <div class="merch-price">
                899 CZK
            </div>
            <div class="merch-buy">
                Odebrat
            </div>
        </div>
        <div class="merch">
            <img src="img/hoodie_black.png" alt="Zboži" class="merch-picture">
            <div class="merch-name">
                Černá mikina CzechWave
            </div>
            <div class="merch-price">
                899 CZK
            </div>
            <div class="merch-buy">
                Odebrat
            </div>
        </div>
        <div class="merch">
            <img src="img/pin.png" alt="Zboži" class="merch-picture">
            <div class="merch-name">
                Pin CzechWave
            </div>
            <div class="merch-price">
                50 CZK
            </div>
            <div class="merch-buy">
                Odebrat
            </div>
        </div>
    </div>`);

    eshopContainer.append(eshopMerchSection);
};


const renderForm = () => {

    eshopContainer.empty();

    const eshopFormInner = $(`
    <div class="form-container-inner">
        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                Jméno a příjmení: <div class="form-detail-star">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                Firma: <div class="form-detail-star-hidden">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                Ulice a číslo: <div class="form-detail-star">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                Město: <div class="form-detail-star">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                PSČ: <div class="form-detail-star">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                IČ: <div class="form-detail-star-hidden">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                DIČ: <div class="form-detail-star-hidden">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                E-mail: <div class="form-detail-star">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <input class="form-input">
            <div class="form-detail-text">
                Telefon: <div class="form-detail-star">*</div>
            </div>
        </div>
        <div class="form-error">
            Špatně zadaná hodnota!
        </div>

        <div class="form-detail">
            <select class="form-input">
                <option>Dobírka</option>
                <option>Karta</option>
                <option>Převod</option>
                <option>PayPal</option>
            </select>
            <div class="form-detail-text">
                Způsob platby: <div class="form-detail-star-hidden">*</div>
            </div>
        </div>
    </div>`);

    const eshopFormButtonBuy = $(`
    <div class="form-button-buy">
        Koupit
    </div>`);
    eshopFormButtonBuy.click(() => {
        renderConfirmation();
        //tady se budou posilat informace o objednavce do databaze (pokud uzivatel zadal validni udaje)
    });

    const eshopFormButtonBack = $(`
    <div class="form-button-back">
        Zpět
    </div>`);
    eshopFormButtonBack.click(() => {
        renderCart();
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

    eshopContainer.append(eshopMerchSection);
};

const renderConfirmation = () => {

    eshopContainer.empty();

    eshopContainer.append(`<div class="merch-section">
        <div class="cart-heading">
            <h2>Hotovo</h2>
        </div>
        <div class="payment-done">
            <i class="fas fa-check-circle payment-done-icon"></i>
            <div class="payment-done-text">Objednávka dokončena, děkujeme!</div>
        </div>
    </div>`);
};


renderEshop(); //pri prvnim zobrazeni se vykresli produkty