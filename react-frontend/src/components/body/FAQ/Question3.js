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
            Is Diffuse.Space secure and safe to use?

          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            Is Diffuse.Space secure and safe to use?

          </button>
          <p className="text">
            Diffuse.Space is a middleman (AKA:aggregator) connecting all protocols, bridges and DEXs and doesn`t store any assets making it secure and safe to use.
            <br></br>
            <br></br>
            The only risks involved are related to the DeFi protocols that Diffuse.Space aggregates.
            <br></br>
            <br></br>
            <b>For example: </b>If a user made a deposit to XYZ DeFI protocol using Diffuse.Space and XYZ protocol is exploited by bad actors resulting in a loss of capital.



          </p>
        </div>
      )}
    </>
  );
}

export default Question3;
