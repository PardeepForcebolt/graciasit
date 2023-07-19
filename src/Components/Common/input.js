import { useState } from "react";

const Input = ({
  value = "",
  onChange = (data) => {},
  name = "",
  disabled = false,
  position = -1,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const onValueChange = (e) => {
    setInputValue(e?.target.value);
    onChange({
      name: e?.target.name,
      value: e?.target.value,
      id: name,
      nodeType: "input",
      position,
    });
  };
  return (
    <div id="input" className="my-4" style={{ width: "200px" }}>
      <input
        disabled={disabled}
        value={inputValue}
        onChange={onValueChange}
        name={name}
        id={name}
        className="border p-2 w-full"
      />
    </div>
  );
};

export default Input;
