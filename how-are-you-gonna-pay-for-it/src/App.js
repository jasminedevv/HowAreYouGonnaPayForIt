import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import budget_function from './budget_function_2018.json'

console.log(budget_function.total);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React, asshole
          </a>
        </header>
        <SpendingByFunction />
        <ProgressTracker
          title="aww yea"
          default_value="0"
          new="0"
        />
      </div>
    );
  }
}

class AdjustmentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      amount: props.amount,
    }
  }
  render() {
    return <p>placeholder</p>
  }
}

class SpendingByFunction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    }
  }
  
  render() {
    const budget = budget_function;
    return (
      <div className="BudgetFunction">
        <AdjustmentSlider 
          title={budget.title}
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
        <p>{this.state.new_value} out of {this.props.default_value}</p>
        <p>placeholder for the progress bar</p>
      </div>
    );
  }
}



export default App;
