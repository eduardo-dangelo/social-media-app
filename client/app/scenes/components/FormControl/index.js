import React from 'react';

class FormControl extends React.Component {
  renderField() {
    const { type, name, placeholder, value, onChange } = this.props;

    if (type === 'text') {
      return (
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )
    }

    if (type === 'password') {
      return (
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          type="password"
          onChange={onChange}
        />
      )
    }
  }

  render() {
    return (
      <div className="field-container">
        {this.renderField()}
      </div>
    )
  }
}

export default FormControl