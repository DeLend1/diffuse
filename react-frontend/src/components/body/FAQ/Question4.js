import { useState } from "react";

function Question4() {
  const [text, setText] = useState(false);

  function showText() {
    setText(!text);
  }
  return (
    <>
      {!text ? (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            Is it ok if I need to sign many transactions in my wallet?
          </button>
        </div>
      ) : (
        <div className="div1">
          <button className="q-Button" onClick={showText}>
            Is it ok if I need to sign many transactions in my wallet?
          </button>
          <h1 className="text">
            Yes, all wallet pop-ups are only required to allow bridges and DEXes
            to operate with your chosen assets
          </h1>
        </div>
      )}
    </>
  );
}

export default Question4;
