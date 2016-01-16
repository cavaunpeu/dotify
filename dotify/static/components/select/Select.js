import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

var Select = React.createClass({
  getInitialState: function () {
    return {
      inputValue: "",
      inputPlaceholder: "country",
      dropdownShouldBeOpen: false,
      focusedDropdownOptionIndex: -2
    }
  },
  handleInputChange: function (event) {
    let inputValue = event.target.value;
    this.setState({
      inputValue: inputValue,
      dropdownShouldBeOpen: inputValue.length ? true : false,
    });
  },
  handleOnKeyDown: function (event) {
    this.setState({
      dropdownShouldBeOpen: true,
      focusedDropdownOptionIndex: this.state.focusedDropdownOptionIndex + 1,
    });
  },
  handleOnClick: function (event) {
    let inputValue = event.target.innerText;
    this.setState({
      inputValue: inputValue,
      dropdownShouldBeOpen: false
    });
    document.querySelector(".Input input").value = inputValue;
  },
  render: function () {
    return (
      <div className="Select">
        <Input placeholder={this.state.inputPlaceholder} handleInputChange={this.handleInputChange} handleOnKeyDown={this.handleOnKeyDown}/>
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown inputValue={this.state.inputValue} handleOnClick={this.handleOnClick} focusedDropdownOptionIndex={this.state.focusedDropdownOptionIndex}/>
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
