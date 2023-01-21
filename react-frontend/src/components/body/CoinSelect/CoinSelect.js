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
      };
    }
    addUserToken(resetValue);
    setValue(resetValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);
  return (
    <Select options={options[chainId]} onChange={handleChange} value={value} />
  );
}

export default CoinSelect;

/*
const countries = [
  { value: 'me', label: 'Montenegro', image: '…' },
  { value:'rs', label: 'Serbia', image: '…' }
];

<ReactSelect
  value={passenger.nationality}
  options={countries}
  formatOptionLabel={country => (
    <div className="country-option">
      <img src={country.image} alt="country-image" />
      <span>{country.label}</span>
    </div>
  )}
/>  
 */
