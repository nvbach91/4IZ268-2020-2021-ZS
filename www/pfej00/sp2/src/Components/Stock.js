import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { CircleLoading } from 'react-loadingg';
import DataError from "./DataError";

class Stock extends Component {
    constructor(props) {
      super(props);
      this.getActualPrice = this.getActualPrice.bind(this);   
      this.transformData = this.transformData.bind(this); 
      this.changeGraph = this.changeGraph.bind(this);
      const stockFromStorage = localStorage.getItem('stock');
      this.state = {
          stock: stockFromStorage.split(","),
          loading: true,
          error: null,
          todayPrices: [],
          dailyPrices: [],
          monthlyPrices: [],
          actualPrice: 0,
          graphDataX: [],
          graphDataY: []
      }; 
    }

    async componentDidMount() {
        const querys = [
            "interval=5min&function=TIME_SERIES_INTRADAY",
            "function=TIME_SERIES_DAILY",
            "function=TIME_SERIES_MONTHLY"
        ];
        
        for (let index = 0; index < querys.length; index++) {
            try {
                let response = await fetch("https://alpha-vantage.p.rapidapi.com/query?" + querys[index] + "&symbol=" + this.state.stock[0] + "&datatype=json&output_size=compact", {
                    "method": "GET",
                    "headers": {
                      "x-rapidapi-key": "f233f136c3msha0abaf5baff99b8p1d1402jsnc0aa9a91d65c",
                      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
                    }
                });
                if (!response.ok) {
                    this.setState({error: "WS is broken or there is too many requests. Wait please one minute and then reload page."});
                }
                else {
                    let json = await response.json();
                    if (index==0) {
                        this.setState({todayPrices: json});                    
                    } else if(index==1) {
                        this.setState({dailyPrices: json});  
                    } else {
                        this.setState({monthlyPrices: json});; 
                    }
                }
            } catch (error) {
                alert('Error occured while getting data ' + error);
                this.setState({error: error});
            }                    
        }
        if (this.state.error == null) {
            try {
                const actualPriceResponse = await fetch("https://financialmodelingprep.com/api/v3/quote-short/" + this.state.stock[0] + "?apikey=4146f9d659748bf4ea23fea71f0722f6");
                const actualPrice = await actualPriceResponse.json();
                this.setState({actualPrice: this.getActualPrice(actualPrice)});            
            } catch (error) {
                alert('Error occured while getting data ' + error);
                this.setState({error: error});
            }
    
            this.setState({loading: false});
            this.changeGraph();
        }
    }

    //Vrátí poslední cenu z dneška
    getActualPrice(json) {
        //json = [json];
        console.log(Object.values(json[0]));
        json = Object.values(json[0]);
        return json[1];
    }

    //Změní data grafu na základě vyrenderování nebo stisknutí tlačítka
    changeGraph(key) {
        let json = [];
        switch (key) {
            case "daily":
                json = [this.state.dailyPrices];;
                json = Object.values(json[0]);
                json = json[1];
                this.transformData(json);
                break;

            case "monthly":
                json = [this.state.monthlyPrices];
                json = json[0]['Monthly Time Series'];
                this.transformData(json);             
                break;
        
            default:
                json = [this.state.todayPrices];
                json = json[0]['Time Series (5min)'];
                this.transformData(json);
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
            let stockName = this.state.stock[1].split(' ')[0];
            stockName = stockName.toLowerCase();
            const stockLogoUrl = "//logo.clearbit.com/" + stockName + ".com";
        
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
                        <div class="col">
                            <div className="container rounded p-3 my-3 bg-dark text-white">
                                <div className="row">
                                    <div class="col-sm-1">
                                        <img id="stock-logo" src={stockLogoUrl}></img>
                                    </div>
                                    <div class="col">
                                        <h3 className="text-left">{this.state.stock[0]}</h3>
                                    </div>
                                    <div class="col">
                                        <h3 className="font-weight-bold text-right">{this.state.actualPrice} $</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <ul>
                                        <li>{this.state.stock[1]}</li>
                                        <li>{this.state.stock[2]}</li>
                                        <li>Market open: {this.state.stock[3]} - {this.state.stock[4]}</li>
                                    </ul>
                                </div>
                                <div className="row">
                                    <Line data={data} options={options}/>
                                </div>
                                <div className="row">
                                    <div className="col"></div>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn btn-primary" onClick={() => this.changeGraph()}>Last records</button>
                                        <button type="button" class="btn btn-primary" onClick={() => this.changeGraph("daily")}>Daily</button>
                                        <button type="button" class="btn btn-primary" onClick={() => this.changeGraph("monthly")}>Monthly</button>
                                    </div>
                                    <div class="col-sm-1"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-1">
                            <button type="button" className="btn btn-danger" onClick={() => this.props.onClear()}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    </div>
                </div>
            )
        }      
    }
}
export default Stock;  