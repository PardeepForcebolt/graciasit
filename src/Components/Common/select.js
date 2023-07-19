import { useState } from "react";

const Select = ({
  dropdownItems = [],
  value = "",
  onChange = () => {},
  name = "",
  disabled = false,
  position = -1,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const onValueChange = (e) => {
    setSelectedValue(e?.target.value);
    onChange({
      name: e?.target.name,
      value: e?.target.value,
      id: name,
      nodeType: "select",
      position,
    });
  };

  return (
    <div id="dropdown" className="my-4" style={{ width: "200px" }}>
      <select
        disabled={disabled}
        name={name}
        id={name}
        className="border w-full p-2"
        value={selectedValue}
        onChange={onValueChange}
      >
        <option value=""></option>
        {dropdownItems?.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
