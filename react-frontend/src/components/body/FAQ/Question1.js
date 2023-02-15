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
            How does Diffuse work?
          </button>
        </div>
      ) : (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            How does Diffuse work?
          </button>
          <p className="text">
            Diffuse helps to deposit preffered assets to lending protocols with
            the best rate(APY) in several clicks
          </p>
        </div>
      )}
    </>
  );
}

export default Question1;
