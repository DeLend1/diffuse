import React from "react";
import ReactDOM from "react-dom";

export class Question2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: false };
    this.showText = this.showText.bind(this);
  }
  showText() {
    if (this.state.text == false) {
      this.setState({ text: true });
    } else {
      this.setState({ text: false });
    }
  }
  render() {
    if (this.state.text == false) {
      return (
        <div className="div1">
          <button className="q-Button" onClick={this.showText}>
          What specific steps does Diffuse take? 
          </button>
        </div>
      );
    } else {
      return (
        <div className="div1">
          <button className="q-Button" onClick={this.showText}>
          What specific steps does Diffuse take? 
          </button>
          <h1 className="text">Diffuse scans different protocols across all chains to find the best rate(APY) for your chosen asset.
           Then the app bridges your assets to required chain, swap assets to required and make a deposit into a protocol with the best interest rate.</h1>
        </div>
      );
    }
  }
}
