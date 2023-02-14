import { useState } from "react";

function Question2() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            What specific steps does Diffuse take?
          </button>
        </div>
      ) : (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            What specific steps does Diffuse take?
          </button>
          <h1 className="text">
            Diffuse scans different protocols across all chains to find the best
            rate(APY) for your chosen asset. Then the app bridges your assets to
            required chain, swap assets to required and make a deposit into a
            protocol with the best interest rate.
          </h1>
        </div>
      )}
    </>
  );
}

export default Question2;
