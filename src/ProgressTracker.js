import React, { Component } from 'react';
var HRNNum = require('human-readable-numbers');
var toHumanNumber = HRNNum.toHumanString;

class ProgressTracker extends Component {

  render() {
    return (
      <div className="ProgressTracker">
        <meter value={this.props.new} min="0" max={this.props.default_value}></meter>
        <h2>{this.props.title}</h2>
        <p><span className="">${toHumanNumber(true, this.props.new)}</span> out of ${toHumanNumber(true, this.props.default_value)}</p>
      </div>
    );
  }
}

export default ProgressTracker;