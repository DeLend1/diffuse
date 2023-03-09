import { useSelector, useDispatch } from "react-redux";
import { loadValue } from "../../../store/interactions";

function ValueInput() {
  const provider = useSelector((state) => state.provider.connection);
  const userToken = useSelector((state) => state.userChoice.userToken);
  const dispatch = useDispatch();

  const userValueHandler = async (e) => {
    e.preventDefault();
    await loadValue(provider, e.target.value, userToken, dispatch);
  };

  return (
    <label className="value">
      <span className="amount">
        <input
          className="inputAmount"
          type="text"
          placeholder="Enter Amount"
          onChange={userValueHandler}
        />
      </span>
    </label>
  );
}

export default ValueInput;
