import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import budget_function from './budget_function_2018.json'

class App extends Component {

  constructor(props) {
    super(props)

    // categories should not contain duplicate items
    // however, aren't I populating this from the budget function?
    this.categories = this.populateCategories(budget_function);
    // this.categories = new Set();

    this.state = {
      target: 1000,
      amount_raised: 0,
    }
  }

  populateCategories(json) {
    let categories = []

    for (let index in json.results) {
      let new_category = {
        name: json.results[index].name,
        spending: json.results[index].amount,
        // the problem is that we are keeping track of amount cut in two places, since we actually have to keep track of it in the other place we should probably not keep track of it here
        amount_cut: 0,
      }
      categories.push(new_category);
    }
    // console.log(categories)
    return categories;
  }

  // goes through the categories and subtracts their values from the initial amount
  // called every time a slider is adjusted
  calculateTotal(name, new_amount_cut) {
    let total = 0;
    this.categories.forEach((category) => {
      // const val = index;
      if (category.name === name) {
        category.amount_cut = new_amount_cut;
        console.log("the new amount cut for", category.name,"is", category.amount_cut, "because I was passed", new_amount_cut);
      }
      console.log(new_amount_cut);
      // console.log("amount cut: ", this.categories[index].amount_cut);
      // total += category.amount_cut;
    })

    // console.log(this);
    this.setState({ amount_raised: new_amount_cut }, () => {
      console.log("I ran: ", this.state);
    });
  }

  render() {

    // TODO: move into its own function
    let sliders = [];
    for (let index in this.categories) {
      let category = this.categories[index];
      // OH!! this will always be zero because we're getting it from categories. We should be getting it from the AdjustmentSlider's form value
      console.log(category.amount_cut);
      let slider = (
        <AdjustmentSlider
          key={category.name}
          name={category.name}
          spending={category.spending}
          amount_cut={category.amount_cut}
          calculate={() => {
              this.calculateTotal(category.name, category.amount_cut);
              console.log("I was passed", category.amount_cut);
            }
          }
        />
      )
      sliders.push(slider);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {sliders}
          <ProgressTracker
            title="aww yea"
            default_value={this.state.target}
            new={this.state.amount_raised}
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
      key: props.name,
      spending: props.spending,
      amount_cut: props.amount_cut,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      { amount_cut: event.target.value },
      () => {
        console.log("I am", this.state.key, "and just set my state to:", this.state.amount_cut);
        this.props.calculate();
      }
    );
  }

  render() {
    const { key, spending, amount_cut } = this.state;
    return (
      <div className="category">
        <hr></hr>
        <h3>{key}</h3>
        <input
          type="text"
          size="4"
          value={amount_cut}
          onChange={this.handleChange}
        ></input>
        <label> cut out of {spending}</label>
        <hr></hr>
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
