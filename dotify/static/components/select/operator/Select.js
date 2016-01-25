import React from 'react'
import Select from '../Select'
import Operator from './Operator'

var OperatorSelect = React.createClass({
  getDefaultProps: function () {
    return {
      placeholder: "+"
    }
  },
  fetchOperators: function () {
    return (
      [
        <Operator id={0} name="&#8722;" />, // -
        <Operator id={1} name="&#215;" />,  // x
        <Operator id={2} name="&#247;" />,  // /
        <Operator id={3} name="&#61;" />,   // =
      ]
    );
  },
  render: function () {
    return (
      <div className="operator-select">
        <Select dropdownElements={this.fetchOperators()} flexOrder={this.props.flexOrder} placeholder={this.props.placeholder} handleValidInput={this.props.handleValidInput}/>
      </div>
    );
  }
});

module.exports = OperatorSelect;
