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
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            How does Diffuse work?
          </button>
          <p className="text">
          Essentially, Diffuse streamlines the process of depositing your preferred assets into lending protocols that offer the highest APY rates, all with just a few clicks.
          </p>
        </div>
      )}
    </>
  );
}

export default Question1;
