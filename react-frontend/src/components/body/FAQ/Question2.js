import { useState } from "react";

function Question2() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            What specific steps does Diffuse take?
          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            What specific steps does Diffuse take?
          </button>
          <p className="text">
          First, Diffuse scans various protocols across all chains to find the most favorable APY rate for your selected asset. 
          Next, the app bridges your assets to the necessary chain, exchanges assets if required, and deposits them into the protocol offering the highest interest rate.
          </p>
        </div>
      )}
    </>
  );
}

export default Question2;
