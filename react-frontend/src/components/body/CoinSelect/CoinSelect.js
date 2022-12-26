import Select from "react-select";
import options from "../../../utils/coinsData.json";
function CoinSelect({ chainId, addUserToken }) {
  const handleChange = (selectedOption) => {
    addUserToken(selectedOption);
  };
  return <Select options={options[chainId]} onChange={handleChange} />;
}

export default CoinSelect;
