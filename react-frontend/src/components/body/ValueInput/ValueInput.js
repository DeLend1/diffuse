function ValueInput({ addUserValue }) {
  return (
    <label className="value">
      <span className="amount">
      <input className="inputAmount"
        type="text"
        placeholder="Enter Amount"
        onChange={(e) => {
          e.preventDefault();
          addUserValue(e.target.value);
        }}
      />
      </span>
    </label>
  );
}

export default ValueInput;
