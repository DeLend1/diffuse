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
    let resetValue;
    if (chainId && Object.keys(options).includes(chainId.toString())) {
      resetValue = options[chainId][0];
    } else {
      resetValue = {
        value: "",
        label: "",
        contractAddress: "",
        img: "",
      };
    }
    addUserToken(resetValue);
    setValue(resetValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  return (
    <Select
      options={options[chainId]}
      onChange={handleChange}
      value={value}
      formatOptionLabel={(token) => (
        <div className="tokenOption">
          <img className="iconAsset" src={token.img} alt="" />
          <span>{token.label}</span>
        </div>
      )}
    />
  );
}

export default CoinSelect;
