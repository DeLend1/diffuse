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
            Is it ok if I need to sign many transactions in my wallet?
          </button>
        </div>
      ) : (
        <div className="faq">
          <button className="q-Button" onClick={showText}>
            Is it ok if I need to sign many transactions in my wallet?
          </button>
          <p className="text">
            Yes, all wallet pop-ups are only required to allow bridges and DEXes
            to operate with your chosen assets
          </p>
        </div>
      )}
    </>
  );
}

export default Question4;
