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
            How does it work?

          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            How does it work?

          </button>
          <p className="text">
            Diffuse.Space scans protocols across all chains to find the most favourable APY rate for selected asset, bridging assets to the necessary chain, exchanges assets if required, and deposits them into the protocol offering the highest APY rates.
            <br></br>
            <br></br>
            <b>In less than 3-5 clicks</b> users can make a deposit, no more multiple tabs, no more complex dashboards, no more terminologies. 

          </p>
        </div>
      )}
    </>
  );
}

export default Question2;
