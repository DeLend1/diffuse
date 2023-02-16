import { useState } from "react";

function Question1() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            What is Diffuse.Space?

          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            What is Diffuse.Space?

          </button>
          <p className="text">
          Diffuse.Space is an aggregator built to simplify depositing experience for end users enabling them to benefit from <b>the highest APY rates</b> available.

          </p>
        </div>
      )}
    </>
  );
}

export default Question1;
