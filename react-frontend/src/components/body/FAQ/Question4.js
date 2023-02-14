import React from "react";
import ReactDOM from "react-dom";

export class Question4 extends React.Component {
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
          Is it ok if I need to sign many transactions in my wallet?
          </button>
        </div>
      );
    } else {
      return (
        <div className="div1">
          <button className="q-Button" onClick={this.showText}>
            Is it ok if I need to sign many transactions in my wallet?
          </button>
          <h1 className="text">Yes, all wallet pop-ups are only required to allow bridges and DEXes to operate with your chosen assets</h1>
        </div>
      );
    }
  }
}
