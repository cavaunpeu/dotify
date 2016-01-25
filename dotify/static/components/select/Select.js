import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

var Select = React.createClass({

  initialfocusedDropdownElementIndex: -1,

  propTypes: {
    dropdownElements: React.PropTypes.array.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  componentDidUpdate: function () {
    if (this.isCompleteDropdownElementName(this.state.inputValue)) {
      this.props.handleValidInput(this.props.flexOrder, this.state.inputValue);
    }
  },
  getInitialState: function () {
    return {
      dropdownShouldBeOpen: false,
      eligibleDropdownElements: this.props.dropdownElements,
      focusedDropdownElementIndex: this.initialfocusedDropdownElementIndex,
      inputValue: ""
    }
  },
  getFocusedDropdownElement: function () {
    return this.state.eligibleDropdownElements[this.state.focusedDropdownElementIndex];
  },
  handleInputChange: function (event) {
    let inputValue = event.target.value;
    this.setState({
      dropdownShouldBeOpen: inputValue.length ? true : false,
      eligibleDropdownElements: this.parseEligibleDropdownElements(inputValue),
      focusedDropdownElementIndex: this.initialfocusedDropdownElementIndex,
      inputValue: inputValue
    });
  },
  handleOnClick: function (event) {
    this.setInputValue(event.target.innerText);
  },
  handleOnKeyDown: function (event) {
    switch (event.keyCode) {
      case 13: // enter
        let enteredValue = this.state.focusedDropdownElementIndex != this.initialfocusedDropdownElementIndex ? this.getFocusedDropdownElement().props.name : this.state.inputValue;
        if (this.isCompleteDropdownElementName(enteredValue)) {
          this.setInputValue(enteredValue);
        };
      break;
      case 38: // up
        this.setState({
          dropdownShouldBeOpen: this.state.focusedDropdownElementIndex > 0,
          focusedDropdownElementIndex: Math.max(this.initialfocusedDropdownElementIndex, this.state.focusedDropdownElementIndex - 1)
        });
      break;
      case 40: // down
        this.setState({
          dropdownShouldBeOpen: true,
          focusedDropdownElementIndex: Math.min(this.state.eligibleDropdownElements.length - 1, this.state.focusedDropdownElementIndex + 1),
        });
      break;
    }
  },
  isCompleteDropdownElementName: function (inputValue) {
    let dropdownElementNames = this.props.dropdownElements.map(function(element) {
      return element.props.name
    });
    return dropdownElementNames.indexOf(inputValue) > -1;
  },
  parseEligibleDropdownElements: function (inputValue) {
    function elementIsEligible(element) {
      return element.props.name.includes(inputValue) && element.props.name != inputValue;
    }
    return this.props.dropdownElements.filter(elementIsEligible);
  },
  setInputValue: function (value) {
    this.setState({
      dropdownShouldBeOpen: false,
      focusedDropdownElementIndex: this.initialfocusedDropdownElementIndex,
      inputValue: value
    });
  },
  render: function () {
    return (
      <div className="Select">
        <Input inputValue={this.state.inputValue} placeholder={this.props.placeholder} handleInputChange={this.handleInputChange} handleOnKeyDown={this.handleOnKeyDown}/>
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown dropdownElements={this.state.eligibleDropdownElements} handleOnClick={this.handleOnClick} focusedDropdownElement={this.getFocusedDropdownElement()}/>
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
