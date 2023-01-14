import { useState, useEffect } from "react";
import Select from "react-select";

import options from "../../../utils/coinsData.json";

function CoinSelect({ chainId, addUserToken }) {
  const [value, setValue] = useState("");

  const handleChange = (selectedOption) => {
    addUserToken(selectedOption);
    setValue(selectedOption);
  };
  useEffect(() => {
    const resetValue = {
      value: "",
      label: "",
      contractAddress: "",
    };
    addUserToken(resetValue);
    setValue(resetValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <Select options={options[chainId]} onChange={handleChange} value={value} />
  );
}

export default CoinSelect;
