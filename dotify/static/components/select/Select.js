import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

var Select = React.createClass({
  propTypes: {
    fetchDropdownElements: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      dropdownElements: this.props.fetchDropdownElements().length,
      dropdownShouldBeOpen: false,
      focusedDropdownOptionIndex: -1,
      inputValue: "",
      inputPlaceholder: this.props.placeholder
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
    switch (event.keyCode) {
      case 38: // up
        this.setState({
          dropdownShouldBeOpen: this.state.focusedDropdownOptionIndex > 0,
          focusedDropdownOptionIndex: Math.max(-1, this.state.focusedDropdownOptionIndex - 1)
        })
      break;
      case 40: // down
        this.setState({
          dropdownShouldBeOpen: true,
          focusedDropdownOptionIndex: Math.min(this.state.dropdownElements - 1, this.state.focusedDropdownOptionIndex + 1),
        });
      break;
    }
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
    console.log(this.state.focusedDropdownOptionIndex, this.state.dropdownShouldBeOpen)
    return (
      <div className="Select">
        <Input placeholder={this.state.inputPlaceholder} handleInputChange={this.handleInputChange} handleOnKeyDown={this.handleOnKeyDown}/>
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown inputValue={this.state.inputValue} handleOnClick={this.handleOnClick} focusedDropdownOptionIndex={this.state.focusedDropdownOptionIndex} fetchDropdownElements={this.props.fetchDropdownElements}/>
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
