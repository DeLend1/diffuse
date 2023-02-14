import React from "react";
import ReactDOM from "react-dom";
import { Question1 } from "./Question1";
import { Question2 } from "./Question2";
import { Question3 } from "./Question3";
import { Question4 } from "./Question4";

//сюда импортируй как выше каждый файл с вопросом котоырй по примеру и вставлчй в див по порядке
export class Questions extends React.Component {
  render() {
    return (
      <div>
        <Question1 />
        <Question2 />
        <Question3 />
        <Question4 />
      </div>
    );
  }
}
/* ReactDOM.render(<ProfilePage />, document.getElementById("app")); */
