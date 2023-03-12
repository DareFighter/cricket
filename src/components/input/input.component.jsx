const Input = ({ name, changeHandler, value, placeholderName, type }) => {
  return (
    <>
      <div className="form-group">
        <input
          type={`type`}
          className="form-control"
          onChange={changeHandler}
          value={value}
          placeholder={placeholderName}
          name={name}
        />
      </div>
    </>
  );
};

export default Input;
