import { useState } from "react";
import CoinSelect from "./CoinSelect";
import ValueInput from "./ValueInput";
function Body({ chainId }) {
  const [value, setValue] = useState("");
  const [token, setToken] = useState("");
  const addUserTokenHandler = (coin) => {
    setToken(coin);
  };
  const addUserValueHandler = (userValue) => {
    setValue(userValue);
  };
  console.log(value);
  console.log(token);
  return (
    <>
      <CoinSelect chainId={chainId} addUserToken={addUserTokenHandler} />
      <ValueInput addUserValue={addUserValueHandler} />
    </>
  );
}

export default Body;
