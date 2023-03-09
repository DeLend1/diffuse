import { useDispatch } from "react-redux";
import { loadSelectedChain } from "../../../store/interactions";

const Settings = () => {
  const dispatch = useDispatch();

  const networkHandler = async (e) => {
    e.preventDefault();
    loadSelectedChain(e.target.value, dispatch);
  };

  return (
    <div className="selectedChain">
      <select name="networks" id="networks" onChange={networkHandler}>
        <option value="bestAPY">Chain with best APY</option>
        <option value="ethereumAPY">Best APY on Ethereum</option>
        <option value="optimismAPY">Best APY on Optimism</option>
        <option value="polygonAPY">Best APY on Polygon</option>
      </select>
    </div>
  );
};

export default Settings;
