function ValueInput({ addUserValue }) {
  return (
    <label>
      Value:
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          addUserValue(e.target.value);
        }}
      />
    </label>
  );
}

export default ValueInput;
