import React, { Component } from 'react';
import './App.css';
import ProgressTracker from './ProgressTracker';

import AdjustmentSlider from './AdjustmentSlider';

import PresetSetter from './PresetSetter';

import budget_function from './budget_function_2018.json';

class App extends Component {

  constructor(props) {
    super(props)

    /** can be passed budget by function or agency (function for now) */
    this.categories = this.populateCategories(budget_function);

    this.state = {
      // target: 1000,
      amount_raised: 0,

      // set the program we're raising money for
      program_name: "Send Humans to Mars",
      program_target: 220000000000,
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
        <PresetSetter
          setProgram={(name, dollars) => {
            this.setProgram(name, dollars)
          }}
        ></PresetSetter>
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
        <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"></link>
        <footer className="socials">
          <a title="Linkedin" href="https://www.linkedin.com/in/jasminehumbert"><i class="fa fa-linkedin"></i></a>
          <a title="Codepen" href="http://codepen.io/lacunahag/"><i class="fa fa-codepen"></i></a>
          <a title="Github" href="https://www.github.com/lacunahag/"><i class="fa fa-github"></i></a>
          <a title="Keybase" href="https://keybase.io/lacunahag"><i class="fa fa-key"></i></a>
        </footer>
      </div>
    );
  }
}


export default App;
