import React from "react"

const ToolbarOption = ({ label, name, value, type, onChange }) => {
  return (
    <div className="toolbar__option">
      <label className="toolbar__label" htmlFor={name}>
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        className={`toolbar__input--${type}`}
        onChange={(event) => onChange(parseInt(event.target.value, 10))}
      />
    </div>
  )
}

export default ToolbarOption
