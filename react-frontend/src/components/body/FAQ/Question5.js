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
            Would like to connect or discuss partnership?

          </button>
        </div>
      ) : (
        <div className="faqActive">
          <button className="q-ButtonActive" onClick={showText}>
            Would like to connect or discuss partnership?

          </button>
          <p className="text">
            Ping us at <b>hello@diffuse.space</b>

          </p>
        </div>
      )}
    </>
  );
}

export default Question4;
