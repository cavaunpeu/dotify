import React from 'react';

var Dropdown = React.createClass({
  propTypes: {
    dropdownElements: React.PropTypes.array.isRequired,
    focusedDropdownElementIndex: React.PropTypes.number.isRequired,
    handleOnClick: React.PropTypes.func.isRequired
  },
  render: function() {
    var dropdownElements = this.props.dropdownElements.map(function(element, index) {
      return (
        <li key={element.props.id} onClick={this.props.handleOnClick}>{element.props.name}</li>
      );
    }.bind(this));
    return (
      <div className="Dropdown">
        <ul>
          {dropdownElements}
        </ul>
      </div>
    );
  }
});

module.exports = Dropdown;
