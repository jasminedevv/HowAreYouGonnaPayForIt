import React, { Component } from 'react';
import { format } from 'url';


class PresetSetter extends Component {
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

// class AddCustomProgram extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       display = false,

//     }
//   }
//   render () {
//     let display;
//     this.display ? display = 0 : display = 1;
//     return (
//       <form>

//       </form>
//     )
//   }
// }

export default PresetSetter;