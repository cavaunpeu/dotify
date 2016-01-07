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
  render: function () {
    return (
      <div className="country-select">
        <Input handleInputChange={this.handleInputChange} />
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown inputValue={this.state.inputValue} />
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
