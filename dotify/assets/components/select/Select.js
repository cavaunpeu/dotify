import React from 'react';
import Input from '../Input';
import Dropdown from '../Dropdown';

var Select = React.createClass({

  initialfocusedDropdownElementIndex: -1,

  propTypes: {
    dropdownElements: React.PropTypes.array.isRequired,
    elementNameMatchesDropdownValue: React.PropTypes.func.isRequired,
    handleValidDropdownElement: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  componentDidUpdate: function () {
    let enteredDropdownElement = this.getEnteredDropdownElement(this.state.inputName);
    if (enteredDropdownElement) {
      this.props.handleValidDropdownElement(this.props.flexOrder, enteredDropdownElement);
    }
  },
  getInitialState: function () {
    return {
      dropdownShouldBeOpen: this.props.openDropdownOnRender,
      eligibleDropdownElements: this.props.dropdownElements,
      focusedDropdownElementIndex: this.initialfocusedDropdownElementIndex,
      inputName: ""
    }
  },
  getEligibleDropdownElements: function (inputName) {
    let elementNameMatchesDropdownValue = element => {
      return this.props.elementNameMatchesDropdownValue(element, inputName);
    }
    return this.props.dropdownElements.filter(elementNameMatchesDropdownValue);
  },
  getEnteredDropdownElement: function (inputName) {
    function elementIsEligible(element) {
      return element.props.name == inputName;
    }
    return this.props.dropdownElements.filter(elementIsEligible)[0];
  },
  getFocusedDropdownElement: function () {
    return this.state.eligibleDropdownElements[this.state.focusedDropdownElementIndex];
  },
  handleInputNameChange: function (event) {
    let inputName = event.target.value;
    this.setState({
      dropdownShouldBeOpen: Boolean(inputName.length),
      eligibleDropdownElements: this.getEligibleDropdownElements(inputName),
      focusedDropdownElementIndex: this.initialfocusedDropdownElementIndex,
      inputName: inputName
    });
  },
  handleOnClick: function (event) {
    this.setInputName(event.target.innerText);
  },
  handleOnKeyDown: function (event) {
    switch (event.keyCode) {
      case 13: // enter
        let enteredName = this.state.focusedDropdownElementIndex != this.initialfocusedDropdownElementIndex ? this.getFocusedDropdownElement().props.name : this.state.inputName;
        if (this.getEnteredDropdownElement(enteredName)) {
          this.setInputName(enteredName);
        };
      break;
      case 38: // up
        this.setState({
          dropdownShouldBeOpen: this.state.focusedDropdownElementIndex > 0,
          focusedDropdownElementIndex: Math.max(this.initialfocusedDropdownElementIndex, this.state.focusedDropdownElementIndex - 1)
        });
      break;
      case 40: // down
        if (this.state.focusedDropdownElementIndex == this.initialfocusedDropdownElementIndex) {
          this.setState({
            eligibleDropdownElements: this.getEligibleDropdownElements(this.state.inputName)
          });
        }
        this.setState({
          dropdownShouldBeOpen: true,
          focusedDropdownElementIndex: Math.min(this.state.eligibleDropdownElements.length - 1, this.state.focusedDropdownElementIndex + 1)
        });
      break;
    }
  },
  setInputName: function (name) {
    this.setState({
      dropdownShouldBeOpen: false,
      focusedDropdownElementIndex: this.initialfocusedDropdownElementIndex,
      inputName: name
    });
  },
  render: function () {
    return (
      <div className="Select">
        <Input inputName={this.state.inputName} placeholder={this.props.placeholder} handleInputNameChange={this.handleInputNameChange} handleOnKeyDown={this.handleOnKeyDown}/>
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown dropdownElements={this.state.eligibleDropdownElements} handleOnClick={this.handleOnClick} focusedDropdownElement={this.getFocusedDropdownElement()}/>
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
