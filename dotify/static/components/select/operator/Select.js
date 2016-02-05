import React from 'react'
import Select from '../Select'
import Operator from './Operator'

var OperatorSelect = React.createClass({
  getDefaultProps: function () {
    return {
      placeholder: "+"
    }
  },
  fetchDropdownElements: function () {
    return (
      [
        <Operator id={0} name="&#8722;" value="-" />,
        <Operator id={1} name="&#215;"  value="*" />,
        <Operator id={2} name="&#247;"  value="/" />,
        <Operator id={3} name="&#61;"   value="=" />,
      ]
    );
  },
  render: function () {
    return (
      <div className="operator-select">
        <Select dropdownElements={this.fetchDropdownElements()} flexOrder={this.props.flexOrder} handleValidDropdownElement={this.props.handleValidDropdownElement} placeholder={this.props.placeholder}/>
      </div>
    );
  }
});

module.exports = OperatorSelect;
