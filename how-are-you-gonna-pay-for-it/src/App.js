import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import budget_function from './budget_function_2018.json'

class App extends Component {

  constructor(props) {
    super(props)

    this.categories = [
      {
        name: "education",
        spending: 90
      },
      {
        name: "military",
        spending: 70
      },
    ]

    this.state = {
      initial_total: 999, 
      total: 999,
    }
  }

  // goes through the categories and subtracts their values from the initial amount
  calculateTotal (category, value) {

    let total = parseInt(this.state.initial_total);
    // this.categories[category] = parseInt(value);

    this.categories.forEach( (item) => {
      // const val = index;
      console.log(item.spending);
      total -= item.spending;
    })
    
    this.setState({ total }, () => {
      console.log("I ran: ", this.state);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React, asshole
          </a> */}
          <AdjustmentSlider 
            category="military" 
            title="military"
            calculate={(value) => {
              this.calculateTotal('military', value)
            }}
            />
          <ProgressTracker
            title="aww yea"
            default_value={this.state.initial_total}
            new={this.state.total}
          />
        </header>

      </div>
    );
  }
}

class AdjustmentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      initial_amount: props.initial_amount,
      amount: 0,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({amount: event.target.value});
    // this IS running
    this.props.calculate(this.state.amount);
    // make sure it's a number
  }

  render() {
    const {title, amount, initial_amount} = this.state;
    return (
      <div>
        <p>{title}</p>
        <input 
          type="text" 
          size="4"
          value={amount} 
          onChange={this.handleChange}
        ></input>
        <label> cut out of {initial_amount}</label>
      </div>
    )
  }
}

class SpendingByFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false, //temp
    }
  }

  render() {
    return (
      <div className="BudgetFunction">
        <AdjustmentSlider
          title="Military"
          initial_amount="20"
        />
      </div>
    )
  }
}

class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      default_value: props.default_value,
      new_value: props.new,
    }
  }
  render() {
    return (
      <div className="ProgressTracker">
        <h3>{this.state.title}</h3>
        <p>{this.props.new} out of {this.props.default_value}</p>
        <p>placeholder for the progress bar</p>
      </div>
    );
  }
}



export default App;
