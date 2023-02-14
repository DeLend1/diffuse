import React from "react";
import ReactDOM from "react-dom";

export class Question3 extends React.Component {
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
            Is it safe?
          </button>
        </div>
      );
    } else {
      return (
        <div className="div1">
          <button className="q-Button" onClick={this.showText}>
            Is it safe?
          </button>
          <h1 className="text">As Diffuse provides only highly efficient aggregation service, it`s absolutely save to use Diffuse as the app doesnt store any assets.
           Risks are only related to DeFi protocols which are being aggregated by Diffuse. </h1>
        </div>
      );
    }
  }
}
