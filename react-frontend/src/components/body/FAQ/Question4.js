import { useState } from "react";

function Question4() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            I have to sign many transactions in my wallet, is that ok?
          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            I have to sign many transactions in my wallet, is that ok?
          </button>
          <p className="text">
            Absolutely. All wallet pop-ups are only necessary to enable the bridges, DEXes and protocols to operate with your selected assets to ensure seamless experience of making a deposit. 

          </p>
        </div>
      )}
    </>
  );
}

export default Question4;
