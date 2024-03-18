function InputText({ item, value, done, imputeValue, changeInput }) {
  return (
    <>
      {item !== value ? (
        <span className={`text-value ${done}`}>{item}</span>
      ) : (
        <input
          value={imputeValue}
          onChange={changeInput}
          type="text"
          className={"input"}
        ></input>
      )}
    </>
  );
}

export default InputText;
