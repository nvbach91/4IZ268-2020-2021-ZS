import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { CircleLoading } from 'react-loadingg';
import DataError from "./DataError";

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.getactualCryptoPrice = this.getactualCryptoPrice.bind(this);   
        this.transformData = this.transformData.bind(this); 
        this.changeGraph = this.changeGraph.bind(this);
        let cryptoFromStorage = [];
        let state = {
            crypto: [],
            loading: true,
            error: null,
            dailyPrices: [],
            monthlyPrices: [],
            actualCryptoPrice: 0,
            graphDataX: [],
            graphDataY: []
        }; 

        try {
            if (localStorage.getItem('crypto')) {
                cryptoFromStorage = localStorage.getItem('crypto');
                cryptoFromStorage = JSON.parse(cryptoFromStorage);
                state.crypto = cryptoFromStorage;             
            }
        } catch (error) {
            this.props.onClearCrypto();
            state.error = error; 
        }

        this.state = state;
    }

    async componentDidMount() {
        const querys = [
            "function=DIGITAL_CURRENCY_DAILY",
            "function=DIGITAL_CURRENCY_MONTHLY"
        ];
        const keys = [
            "f233f136c3msha0abaf5baff99b8p1d1402jsnc0aa9a91d65c",
            "10e5563c3fmsh1d36f54e9bf4926p1c7c1bjsn73a7e24b8f06"
        ];
        
        for (let index = 0; index < querys.length; index++) {
          try {
              let response = await fetch("https://alpha-vantage.p.rapidapi.com/query?" + querys[index] + "&symbol=" + this.state.crypto[1] + "&market=USD&datatype=json&output_size=compact", {
                  "method": "GET",
                  "headers": {
                    "x-rapidapi-key": keys[index],
                    "x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
                  }
              });
              if (!response.ok) {
                  this.setState({error: "WS is broken or there is too many requests. Wait please one minute and then reload page."});
              }
              else {
                  let json = await response.json();
                  if (index===0) {
                      this.setState({dailyPrices: json});
                      //console.log(this.state.dailyPrices);                    
                  } else if(index===1) {
                      this.setState({monthlyPrices: json});
                      //console.log(this.state.monthlyPrices);  
                  }
              }
          } catch (error) {
              alert('Error occured while getting data ' + error);
              this.setState({error: error});
          }                    
        }
      
        if (this.state.error == null) {
            try {
                const actualCryptoPriceResponse = await fetch("https://alpha-vantage.p.rapidapi.com/query?&from_currency=" + this.state.crypto[1] + "&function=CURRENCY_EXCHANGE_RATE&to_currency=USD", {
                  "method": "GET",
                  "headers": {
                    "x-rapidapi-key": "758ab267b4msh2f1ec960692042fp115c33jsn47e83ebd35d1",
                    "x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
                  }
                });
                if (!actualCryptoPriceResponse.ok) {
                  this.setState({error: "WS is broken or there is too many requests. Wait please one minute and then reload page."});
                }
                const actualCryptoPrice = await actualCryptoPriceResponse.json();
                this.setState({actualCryptoPrice: this.getactualCryptoPrice(actualCryptoPrice)});            
            } catch (error) {
                alert('Error occured while getting data ' + error);
                this.setState({error: error});
            }
    
            this.setState({loading: false});
            this.changeGraph(); //Nastavení defultních hodnot do grafu
        }        
    }

    //Vrátí poslední cenu z dneška
    getactualCryptoPrice(json) {
        json = Object.values(json);
        json = Object.values(json[0]);
        console.log(json[8]);
        const priceToReturn = json[8];
        return priceToReturn;
    }

    //Změní data grafu na základě vyrenderování nebo stisknutí tlačítka
    changeGraph(key) {
        
        let json = [];
        switch (key) {

            case "monthly":
                json = Object.values(this.state.monthlyPrices);  
                console.log(json[1]);
                this.transformData(json[1]);             
                break;
        
            default:
                json = Object.values(this.state.dailyPrices);
                console.log(json[1]);
                this.transformData(json[1]);
                break;
        }
        
    }

    transformData(objects) {
      
        let labels = [];
        let closedPrices = [];

        for (let index = Object.values(objects).length - 1; index >= 0; index--) {
            labels.push(Object.keys(objects)[index]);
            let priceObject = Object.values(objects)[index];
            closedPrices.push(Object.values(priceObject)[3]);
        }
        this.setState({graphDataX: labels});
        this.setState({graphDataY: closedPrices});
    
    }

    render() {
        if(this.state.error != null) {
            return <DataError errorMessage={this.state.error}/>;
        } else if (this.state.loading) {
            return <CircleLoading />;
        } else {
        
            const data = canvas => {
                var ctx = canvas.getContext("2d");
                ctx.canvas.parentNode.style.width = "65%";
                ctx.canvas.parentNode.style.height = "100%";
                ctx.canvas.parentNode.style.margin = "auto";
                const gradient = ctx.createLinearGradient(0, 200, 500, 0);
        
                return {
                backgroundColor: gradient,
                labels: this.state.graphDataX,
                datasets: [
                    {
                        label: "Price in USD",
                        data: this.state.graphDataY,//[12, 19, 3, 5, 2, 3],
                        borderWidth: 3,
                        fill: false,
                        borderColor: '#007bff'
                    }
                ]
                };
            };
              
            const options = {
                title:{
                    display:false,
                    fontSize:20
                },
                legend:{
                    display:false,
                    position:'right'
                },
                responsive: true,
            };          
    
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="container rounded p-3 my-3 bg-dark text-white">
                                <div className="row">
                                    <div className="col">
                                        <h3 className="text-left">{this.state.crypto[0]} - {this.state.crypto[1]}</h3>
                                    </div>
                                    <div className="col">
                                        <h3 className="font-weight-bold text-right">{this.state.actualCryptoPrice} $</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <Line data={data} options={options}/>
                                </div>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-primary" onClick={() => this.changeGraph()}>Daily</button>
                                        <button type="button" className="btn btn-primary" onClick={() => this.changeGraph("monthly")}>Monthly</button>
                                    </div>
                                    <div className="col-sm-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <button type="button" className="btn btn-danger" onClick={() => this.props.onClearCrypto()}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            );
        }      
    }
}
export default Crypto;  