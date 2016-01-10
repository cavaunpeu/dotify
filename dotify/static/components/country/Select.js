import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

var Select = React.createClass({
  getInitialState: function () {
    return {
      inputValue: "country",
      dropdownShouldBeOpen: false,
    }
  },
  handleInputChange: function (event) {
    let inputValue = event.target.value;
    this.setState({
      inputValue: inputValue,
      dropdownShouldBeOpen: inputValue.length ? true : false,
    });
  },
  handleOnClick: function (event) {
    let inputValue = event.target.innerText;
    this.setState({
      inputValue: inputValue,
      dropdownShouldBeOpen: false
    });
    document.querySelector(".country-input input").value = inputValue;
  },
  render: function () {
    return (
      <div className="country-select">
        <Input handleInputChange={this.handleInputChange} />
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown inputValue={this.state.inputValue} handleOnClick={this.handleOnClick} />
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
