import React, { Component } from "react";
import Crypto from "./Crypto";
import cryptoList from './data/crypto-list.json'


class Cryptos extends Component {

  constructor(props) {
    super(props);
    this.clearCrypto = this.clearCrypto.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderCryptoOffer = this.renderCryptoOffer.bind(this);
    this.saveValueToStorage = this.saveValueToStorage.bind(this);
    let cryptoFromStorage = [];
    let state = {
      showCryptoGraph: localStorage.getItem('crypto') ? true : false,
      cryptoOffer: [],
      search: "",
      error: null
    };

    try {
      if (state.showCryptoGraph) {
        cryptoFromStorage = localStorage.getItem('crypto');
        cryptoFromStorage = JSON.parse(cryptoFromStorage);
        //state.stockFromStorage = stockFromStorage;   
        console.log(cryptoFromStorage);     
      }
    } catch (error) {
      localStorage.removeItem('crypto');
      console.log(error);
      state.showCryptoGraph = false;
    }

    this.state = state; // Koukne se jestli je v local storage parametr a když jo, tak nastaví na true a jinak false
  }

  clearCrypto() {
    this.setState({showCryptoGraph: false});
    localStorage.removeItem('crypto');
  }

  onChange(event) {
    event.preventDefault();    
    this.setState({ search: event.target.value });
    /*
    const filteredCryptocurrencies = cryptoList.filter(crypto => {
            return crypto.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    */

    const filteredCryptocurrencies = cryptoList.filter(crypto => {
        return crypto.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
    
    this.setState({cryptoOffer: filteredCryptocurrencies});
  }

  renderCryptoOffer() {
    const array = this.state.cryptoOffer;
    let instruments = [];
    for (let index = 0; index < array.length; index++) {
      let instrument = array[index];
      instrument = Object.values(instrument);
      let formulation = <button key={index} type="button" className="list-group-item list-group-item-action" onClick = {(e) => {this.saveValueToStorage(e, index)}} >{instrument[0]}</button>;
      instruments.push(formulation);
    }
    return instruments;
  }

  saveValueToStorage(event, index) {
      console.log(Object.values(this.state.cryptoOffer[index]));
      const instrument = Object.values(this.state.cryptoOffer[index]);
      localStorage.setItem('crypto', JSON.stringify(instrument));;
      this.setState({showCryptoGraph: true});
  }

  render() {
    if (this.state.showCryptoGraph) {
      return <Crypto onClearCrypto={this.clearCrypto} />;
    }
    else {
      return (
        <section>
          <h2>Crypto</h2>
          <form>
              <div className="row">
                  <div className="col">
                      <input id="text" className="form-control" type="text" ref={this.cryptoName} onChange={this.onChange} placeholder="Find your investment"/>
                      <div className="list-group">
                      {this.renderCryptoOffer()}
                      </div>
                  </div>
              </div>
          </form>
        </section>
      );
    }
  }
}
 
export default Cryptos;