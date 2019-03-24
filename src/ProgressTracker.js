import React, { Component } from 'react';
var HRNNum = require('human-readable-numbers');
var toHumanNumber = HRNNum.toHumanString;

class ProgressTracker extends Component {
    
    render() {
      return (
        <div className="ProgressTracker">
          <h3>{this.props.title}</h3>
          <p>${ toHumanNumber( true, this.props.new )}  out of ${ toHumanNumber( true, this.props.default_value )}</p>
  
          <meter value={this.props.new} min="0" max={this.props.default_value}></meter>
        </div>
      );
    }
  }
  
  export default ProgressTracker;