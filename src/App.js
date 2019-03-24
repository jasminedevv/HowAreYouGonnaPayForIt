import React, { Component } from 'react';
import './App.css';
import ProgressTracker from './ProgressTracker';

import AdjustmentSlider from './AdjustmentSlider';

import budget_function from './budget_function_2018.json';

class App extends Component {

  constructor(props) {
    super(props)

    /** can be passed budget by function or agency (function for now) */
    this.categories = this.populateCategories(budget_function);

    this.state = {
      target: 1000,
      amount_raised: 0,

      // set the program we're raising money for
      program_name: "Example",
      program_target: 20,
    }
  }

  /** Takes the json of categories and adds them to the App's this.categories */
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
    return categories;
  }

  /** should be passed to a component to change what program we are raising money for */
  setProgram(name, target) {
    this.setState({ program_name: name, program_target: target });
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
      }
    }
    console.log(this.categories)
  }

  /** goes through the categories and subtracts their values from the initial amount. Called every time a slider is adjusted */
  calculateTotal() {
    let new_amount_cut = 0;

    this.categories.forEach((category) => {
      new_amount_cut += category.amount_cut;
    });

    // console.log(this);
    this.setState({ amount_raised: new_amount_cut }, () => {
      console.log("I ran: ", this.state);
    });
  }

  render() {
    // TODO: move for loop block into its own function
    let sliders = [];
    for (let index in this.categories) {
      let category = this.categories[index];
      let slider = (
        <AdjustmentSlider
          key={category.name}
          name={category.name}
          spending={category.spending}
          amount_cut={category.amount_cut}
          // TODO rename name and cat: misleading
          updateCategory={(name, cat) => {
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
        <ProgramSetter
          setProgram={(name, dollars) => {
            this.setProgram(name, dollars)
          }}
        ></ProgramSetter>
        <header className="App-header">
          <div className="sliders">
            {sliders}
          </div>
          <ProgressTracker
            title={this.state.program_name}
            default_value={this.state.program_target}
            new={this.state.amount_raised}
          />
          <br></br>
          <br></br>
        </header>

      </div>
    );
  }
}

class ProgramSetter extends React.Component {
  constructor(props) {
    super(props);
    this.presets = [
      {
        name: "Send Humans to Mars",
        dollars: 220000000000,
        proof_source: "https://qz.com/1273644/heres-how-nasa-and-spacex-chart-the-price-of-a-trip-to-mars/",
      },
      {
        name: "Border Wall",
        dollars: 21600000000,
        proof_source: "https://www.reuters.com/article/us-usa-trump-immigration-wall-exclusive-idUSKBN15O2ZN"
      },
      {
        name: "Aircraft Carrier",
        dollars: 12900000000,
        proof_source: "https://fas.org/sgp/crs/weapons/RS20643.pdf",
      }
    ]
    /** TODO: rename target and value to dollars where it refers to dollar amounts */
    this.state = {
      name: this.props.name,
      dollars: this.props.dollars,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        name: this.presets[event.target.value].name,
        dollars: this.presets[event.target.value].dollars
      },
      () => {
        console.log(this.state.name, this.state.dollars);
        this.props.setProgram(this.state.name, this.state.dollars);
      }
    )

    console.log(event.target.value);
    // console.log("change handled:", event.target);
  }

  render() {
    let presets = [];
    for (let index in this.presets) {
      let item = (<option
        key={index}
        dollars={this.presets[index].dollars}
        value={index}>{this.presets[index].name}</option>)
      presets.push(item);
    }
    return (
      <div className="TargetUpdater">
        <h1>Presets</h1>
        <select onChange={this.handleChange} className="presets">
          {presets}
        </select>
        <br></br>
      </div>
    )
  }
}


export default App;
