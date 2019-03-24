import React, { Component } from 'react';
var HRNNum = require('human-readable-numbers');
var toHumanNumber = HRNNum.toHumanString;

class AdjustmentSlider extends Component {
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
          // put calculate in the setState callback to avoid weird bugs
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
          <label> cut out of ${toHumanNumber( true, spending )}</label>
          <hr></hr>
        </div>
      )
    }
  }
  
  export default AdjustmentSlider;