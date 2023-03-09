import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import data1 from "../../../utils/coinsData.json";
import data2 from "../../../utils/coinsDataWithdraw.json";
import { loadUserToken } from "../../../store/interactions";

function CoinSelect({ mode }) {
  const userToken = useSelector((state) => state.userChoice.userToken);
  const chainId = useSelector((state) => state.provider.chainId);
  const dispatch = useDispatch();

  let options;
  if (mode) {
    options = data1;
  } else {
    options = data2;
  }

  const [value, setValue] = useState("");

  const handleChange = (selectedOption) => {
    setValue(selectedOption);
    loadUserToken(selectedOption, dispatch);
  };
  useEffect(() => {
    let resetValue;
    if (chainId && Object.keys(options).includes(chainId.toString())) {
      if (userToken) {
        const sameTokenInOtherChain = options[chainId].find(
          (token) => token.label === userToken.label
        );
        if (sameTokenInOtherChain) {
          resetValue = sameTokenInOtherChain;
        } else {
          resetValue = options[chainId][0];
        }
      } else {
        resetValue = options[chainId][0];
      }
    } else {
      resetValue = {
        value: "",
        label: "",
        contractAddress: "",
        img: "",
      };
    }
    setValue(resetValue);
    loadUserToken(resetValue, dispatch);
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
