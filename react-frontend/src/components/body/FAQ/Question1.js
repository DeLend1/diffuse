import React from "react";
import ReactDOM from "react-dom";

export class Question1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: false, gold: "pat" };
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
            How does Diffuse work?
          </button>
        </div>
      );
    } else {
      return (
        <div className="div1">
          <button className="q-Button" onClick={this.showText}>
            How does Diffuse work?
          </button>
          <h1 className="text">
            Diffuse helps to deposit preffered assets to lending protocols with the best rate(APY) in several clicks
          </h1>
        </div>
      );
    }
  }
}
