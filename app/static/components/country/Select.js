import React from 'react';
import Input from './Input';
import Dropdown from './Dropdown';

var Select = React.createClass({
  getInitialState: function() {
    return {
      inputValue: "country",
      dropdownShouldBeOpen: false
    }
  },
  render: function() {
    console.log(this.state.inputValue);
    console.log(this.state.dropdownShouldBeOpen);
    return (
      <div className="country-select">
        <Input inputValue={this.state.inputValue} />
        {this.state.dropdownShouldBeOpen ? (
          <Dropdown inputValue={this.state.inputValue} />
        ) : null}
      </div>
    );
  }
});

module.exports = Select;
