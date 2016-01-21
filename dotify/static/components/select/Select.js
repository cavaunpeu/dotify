import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

var Select = React.createClass({
  propTypes: {
    dropdownElements: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      dropdownShouldBeOpen: false,
      eligibleDropdownElements: this.props.dropdownElements,
      focusedDropdownElementIndex: -1,
      inputValue: ""
    }
  },
  handleInputChange: function (event) {
    let inputValue = event.target.value;
    this.setState({
      dropdownShouldBeOpen: inputValue.length ? true : false,
      eligibleDropdownElements: this.parseEligibleDropdownElements(inputValue),
      focusedDropdownElementIndex: -1,
      inputValue: inputValue
    });
  },
  handleOnKeyDown: function (event) {
    switch (event.keyCode) {
      case 13: // enter
        let enteredValue = this.getFocusedDropdownElement().props.name
        this.setInputValue(enteredValue);
      break;
      case 38: // up
        this.setState({
          dropdownShouldBeOpen: this.state.focusedDropdownElementIndex > 0,
          focusedDropdownElementIndex: Math.max(-1, this.state.focusedDropdownElementIndex - 1)
        })
      break;
      case 40: // down
        this.setState({
          dropdownShouldBeOpen: true,
          focusedDropdownElementIndex: Math.min(this.state.eligibleDropdownElements.length - 1, this.state.focusedDropdownElementIndex + 1),
        });
      break;
    }
  },
  handleOnClick: function (event) {
    let clickedValue = event.target.innerText;
    this.setInputValue(clickedValue);
  },
  getFocusedDropdownElement: function () {
    return this.state.eligibleDropdownElements[this.state.focusedDropdownElementIndex];
  },
  parseEligibleDropdownElements: function (inputValue) {
    function elementIsEligible(element) {
      return element.props.name.includes(inputValue) && element.props.name != inputValue;
    }
    return this.props.dropdownElements.filter(elementIsEligible);
  },
  setInputValue: function (value) {
    this.setState({
      inputValue: value,
      dropdownShouldBeOpen: false
    });
    document.querySelector(".Input input").value = value;
  },
  render: function () {
    return (
      <div className="Select">
        <Input placeholder={this.props.placeholder} handleInputChange={this.handleInputChange} handleOnKeyDown={this.handleOnKeyDown}/>
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown dropdownElements={this.state.eligibleDropdownElements} handleOnClick={this.handleOnClick} focusedDropdownElement={this.getFocusedDropdownElement()}/>
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
