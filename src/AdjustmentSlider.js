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
          <label> {toHumanNumber( true, amount_cut)} cut out of ${toHumanNumber( true, spending )}</label>
          <br></br>
          <input
            className="slider"
            type="range"
            size="4"
            value={amount_cut}
            min="0"
            max={spending}
            onChange={this.handleChange}
          ></input>
          <hr></hr>
        </div>
      )
    }
  }
  
  export default AdjustmentSlider;