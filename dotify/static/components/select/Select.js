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
      eligibleDropdownElements: [],
      focusedDropdownElementIndex: -1,
      inputValue: "",
      inputPlaceholder: this.props.placeholder
    }
  },
  handleInputChange: function (event) {
    let inputValue = event.target.value;
    this.setState({
      dropdownShouldBeOpen: inputValue.length ? true : false,
      eligibleDropdownElements: this.parseEligibleDropdownElements(inputValue),
      inputValue: inputValue
    });
  },
  handleOnKeyDown: function (event) {
    switch (event.keyCode) {
      case 38: // up
        this.setState({
          dropdownShouldBeOpen: this.state.focusedDropdownElementIndex > 0,
          focusedDropdownElementIndex: Math.max(-1, this.state.focusedDropdownElementIndex - 1)
        })
      break;
      case 40: // down
        this.setState({
          dropdownShouldBeOpen: true,
          focusedDropdownElementIndex: Math.min(this.props.dropdownElements - 1, this.state.focusedDropdownElementIndex + 1),
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
  parseEligibleDropdownElements: function (inputValue) {
    function elementIsEligible(element) {
      return element.props.name.includes(inputValue) && element.props.name != inputValue;
    }
    return this.props.dropdownElements.filter(elementIsEligible);
  },
  render: function () {
    return (
      <div className="Select">
        <Input placeholder={this.state.inputPlaceholder} handleInputChange={this.handleInputChange} handleOnKeyDown={this.handleOnKeyDown}/>
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown dropdownElements={this.state.eligibleDropdownElements} handleOnClick={this.handleOnClick} focusedDropdownElementIndex={this.state.focusedDropdownElementIndex}/>
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
