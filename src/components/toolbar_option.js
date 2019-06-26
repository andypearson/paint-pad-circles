import React from "react"

const ToolbarOption = ({ label, name, value, type, onChange, options }) => {
  let input

  if (type === "select") {
    input = (
      <select name={name} id={name} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  } else if (type === "float") {
    input = (
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        step="0.1"
        className={`toolbar__input--number`}
        onChange={(event) => onChange(event.target.value.length > 0 ? parseFloat(event.target.value, 10) : "")}
      />
    )
  } else if (type === "number") {
    input = (
      <input
        id={name}
        name={name}
        type="number"
        value={value}
        className={`toolbar__input--number`}
        onChange={(event) => onChange(event.target.value.length > 0 ? parseInt(event.target.value, 10) : "")}
      />
    )
  }

  return (
    <div className="toolbar__option">
      <label className="toolbar__label" htmlFor={name}>
        {label}
      </label>

      {input}
    </div>
  )
}

export default ToolbarOption
