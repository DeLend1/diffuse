import { useState } from "react";

function Question3() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            Is it safe?
          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            Is it safe?
          </button>
          <p className="text">
          Because Diffuse is solely an efficient aggregation service, it is entirely safe to use, as it doesn't store any assets.
           The only risks involved are related to the DeFi protocols that Diffuse aggregates.
          </p>
        </div>
      )}
    </>
  );
}

export default Question3;
