import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import budget_function from './budget_function_2018.json'

var HRNNum = require('human-readable-numbers');
var toHumanNumber = HRNNum.toHumanString;

class App extends Component {

  constructor(props) {
    super(props)
 
    this.categories = this.populateCategories(budget_function);

    this.state = {
      target: 1000,
      amount_raised: 0,

      // set the program we're raising money for
      program_name: "Go to Mars",
      program_target: 220000000000,
    }
  }

  populateCategories(json) {
    let categories = []

    for (let index in json.results) {
      let new_category = {
        name: json.results[index].name,
        spending: json.results[index].amount,
        amount_cut: 0,
      }
      categories.push(new_category);
    }
    // console.log(categories)
    return categories;
  }

  updateCategory(name, amount) {
    for (let index in this.categories) {
      let category = this.categories[index];
      if (category.name === name) {
        let new_category = {
          name: name,
          spending: category.spending,
          amount_cut: Number(amount),
        }
        // set the category at index to the new category
        this.categories[index] = new_category;

        console.log("the new amount cut for", category.name, "is", this.categories[index].amount_cut, "because I was passed", amount);
      }
    }
    console.log(this.categories)
  }

  // goes through the categories and subtracts their values from the initial amount
  // called every time a slider is adjusted
  calculateTotal() {
    let new_amount_cut = 0;

    this.categories.forEach( (category) => {
      new_amount_cut += category.amount_cut;
    });

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
      // console.log(category.amount_cut);
      let slider = (
        <AdjustmentSlider
          key={category.name}
          name={category.name}
          spending={category.spending}
          amount_cut={category.amount_cut}
          // TODO rename name and cat: misleading
          updateCategory={ (name, cat) => {
            this.updateCategory(name, cat)
            }}
          calculate={() => {
            this.calculateTotal(category.name, category.amount_cut);
          }}
        />
      )
      sliders.push(slider);
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="sliders">
            {sliders}
          </div>
          <ProgressTracker
            title={this.state.program_name}
            default_value={ this.state.program_target }
            new={this.state.amount_raised}
          />
          <br></br>
          <br></br>
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
    console.log(this.props)

    this.props.updateCategory(this.state.key, event.target.value);

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
        <label> cut out of {toHumanNumber( true, spending )}</label>
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
        <p>{ toHumanNumber( true, this.props.new )}  out of { toHumanNumber( true, this.props.default_value )}</p>

        <meter value={this.props.new} min="0" max={this.props.default_value}></meter>
      </div>
    );
  }
}



export default App;
