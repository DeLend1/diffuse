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
            How to contact you?
          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
          How to contact you?
          </button>
          <p className="text">
            Feel free to ask any questions/share ideas <br></br>
            <b>ilya@diffuse.space</b>

          </p>
        </div>
      )}
    </>
  );
}

export default Question4;
