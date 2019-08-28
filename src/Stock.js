import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StockSymbol: 'AMZN',
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  changeStockSymbol = (e) => {
    this.setState({
      StockSymbol: e.target.value
    });
  }

  fetchStockFunction = (event) => {
    event.preventDefault();
    const pointerToThis = this;
    pointerToThis.fetchStock();
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock = () => {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${pointerToThis.state.StockSymbol}&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var key in data['Weekly Adjusted Time Series']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Weekly Adjusted Time Series'][key]['1. open']);
          }

          // console.log(stockChartYValuesFunction);
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div>
        <h1>Stock Market</h1>

        <form action="">
          <input type="text" value={this.state.StockSymbol} onChange={this.changeStockSymbol} placeholder='Enter stock symbol here...' />
          <button onClick={this.fetchStockFunction}>Lookup Stock</button>
        </form>

        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
          ]}
          layout={{width: 720, height: 440, title: 'Stock Market Data for ' + this.state.StockSymbol}}
        />
      </div>
    )
  }
}

export default Stock;