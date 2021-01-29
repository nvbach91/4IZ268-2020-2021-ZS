import React, { useEffect, useState } from 'react';
import './App.css';
import Logo from './Img/exchange.png';
import Equal from './Img/equals.png';
import CurrencyRow from './CurrencyRow';
import FavCurrencyRow from './FavCurrencyRow';


const BASE_URL = 'https://api.exchangeratesapi.io/latest'


function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  const [favCurrencyOptions, setFavCurrencyOptions] = useState([])
  const [fromFavCurrency, setFromFavCurrency] = useState()
  const [toFavCurrency, setToFavCurrency] = useState()
  const [favExchangeRate, setFavExchangeRate] = useState()

  let [favourite, setFavourite] = useState(() => {
    const localData = localStorage.getItem('favourite');
    return localStorage ? JSON.parse(localData) : [];
  });



  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }
  useEffect(async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    const firstCurrency = Object.keys(data.rates)[0]
    setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(firstCurrency)
    setExchangeRate(data.rates[firstCurrency])

  }, [])

  useEffect(async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    const firstFavCurrency = Object.keys(data.rates)[0]
    setFavCurrencyOptions([data.base, ...Object.keys(data.rates)])
    setFromFavCurrency(data.base)
    setToFavCurrency(firstFavCurrency)
    setFavExchangeRate(data.rates[firstFavCurrency])

  }, [])


  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true)
  }

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false)
  }

  const fetchConvertedCurrency = () => {
    fetch(`${BASE_URL}?base=${fromFavCurrency}&symbols=${toFavCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.rates[toFavCurrency])
        setFavourite([
          ...favourite,
          { id: `${fromFavCurrency}_${toFavCurrency}`, pocatecniMena: fromFavCurrency, kurz: (data.rates[toFavCurrency]).toFixed(2), druhaVybranaMena: toFavCurrency },
        ])
      })
  }


  const handleAddFavourite = () => {
    if (fromFavCurrency === toFavCurrency) {
      return;
    }
    if (favourite.length === 0) {
      fetchConvertedCurrency();
      return;
    }
    let x = 0
    favourite.forEach((currencyRow) => {
      if ((currencyRow.pocatecniMena === fromFavCurrency && currencyRow.druhaVybranaMena === toFavCurrency)) {
        return x = + 1;
      }
    })
    if (x === 0) {
      fetchConvertedCurrency();
    }
    // nacist to co je ulozene v localstorage (  {''EUR_CZK': true,'EUR_CAD': true, }  )
    // zparsovat do objektu v JS
    // zkontrolovat jestli zaznam uz existuje
    // jestli ano tak skoncit funkci
    // jestli ne tak pridame novy zaznam (dvojice men) do toho objektu
    // objekty sparsovat do stringu a ulozit do localstorage pod klicem favoriteConversions
    // const existingFavs = {
    //     'EUR_CZK': true,
    //     'EUR_CAD': true,
    //   };

    // const existingFavs = {
    //   'EUR_CZK': true,
    //   'EUR_CAD': true,
    // };
    // if (!existingFavs['EUR_CZK']) {

    // }

    // delete existingFavs['EUR_CZK'] // odebrat existujici zaznam
    // existingFavs['EUR_FRA'] = true; // pridat novy zaznam
  }

  const deleteRow = (id) => {
    const values = [...favourite];
    values.splice(values.findIndex(value => value.id === id), 1);
    setFavourite(values);

  }
  const transferCurrency = (from, to) => {
    setFromCurrency(from)
    setToCurrency(to)

  }
  useEffect(() => {
    localStorage.setItem('favourite', JSON.stringify(favourite))
  }, [favourite]);


  return (
    <div className="App">
      <header className="main-head">
        <span className="logo"><img src={Logo} alt="logo" width="60" />Kurzy</span>
      </header>
      <div className="body">


        <div>
          <article className="main-body">
            <h1>Vítejte na stránce Kurzy</h1>
            <p>
              Na této stránce si můžete uložit oblíbené kurzy a rychle vypočítat hodnotu jednotlivých měn.
        </p>
          </article>


          <h2>Oblíbené kurzy</h2>
          <div className="favourites">
            <div className="convertor-header">
              <h3>Vyberte počáteční měnu</h3>
              <FavCurrencyRow
                favCurrencyOptions={favCurrencyOptions}
                selectedFavCurrency={fromFavCurrency}
                onChangeFavCurrency={e => setFromFavCurrency(e.target.value)}

              />
            </div>


            <button type="button" id="addFavouriteButton" className="favourite-button" onClick={handleAddFavourite} > Přidat</button>
            <div className="favouriteAdd">
              <h3>Vyberte druhou měnu</h3>
              <FavCurrencyRow
                favCurrencyOptions={favCurrencyOptions}
                selectedFavCurrency={toFavCurrency}
                onChangeFavCurrency={e => setToFavCurrency(e.target.value)}

              />


            </div>
          </div>
          <div className="favouriteTable">
            <table id="tableOfCurrency" className="favourite-table">
              <tbody>
                <tr>
                  <td>1. Počáteční měna</td>
                  <td>Kurz</td>
                  <td>2. Vybraná měna</td>
                  <td></td>
                  <td></td>

                </tr>

                {favourite.map((objektFavourite) => (
                  <tr key={objektFavourite.id}>
                    <td>{objektFavourite.pocatecniMena}</td>
                    <td>{objektFavourite.kurz}</td>
                    <td>{objektFavourite.druhaVybranaMena}</td>
                    <td><button type="button" id="deleteButton" className="delete-button" onClick={(e) => { deleteRow(objektFavourite.id) }}> Odebrat</button></td>
                    <td><button type="button" id="convertFavourite" className="convert-button" onClick={() => { transferCurrency(objektFavourite.pocatecniMena, objektFavourite.druhaVybranaMena) }}> Předat</button></td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>

          <h2>Výpočet hodnoty měn</h2>
          <div className="convertor">
            <div className="convertor-header">
            </div>
            <div className="convertor-from">

              <h3>Vyberte měnu a zadejte počáteční hodnotu</h3>
              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
              />


            </div>
            <img src={Equal} className="equal" alt="euqal" width="60" />
            <div className="convertor-to">
              <h3>Vyberte na jakou měnu chcete hodnotu přepočítat</h3>


              <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={toCurrency}
                onChangeCurrency={e => setToCurrency(e.target.value)}
                onChangeAmount={handleToAmountChange}
                amount={toAmount}
              />

            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="copyright"> &copy; 2020 To Hoang Viet(tento web je in progress)</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
