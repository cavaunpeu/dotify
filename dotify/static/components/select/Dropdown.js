import React from 'react';

var Dropdown = React.createClass({
  propTypes: {
    dropdownElements: React.PropTypes.array.isRequired,
    focusedDropdownElement: React.PropTypes.object,
    handleOnClick: React.PropTypes.func.isRequired
  },
  render: function() {
    var dropdownElements = this.props.dropdownElements.map(function(element, index) {
      let className = this.props.focusedDropdownElement &&
        (element.props.id == this.props.focusedDropdownElement.props.id) ? "focused" : null;
      return (
        <li className={className} key={element.props.id} onClick={this.props.handleOnClick}>{element.props.name}</li>
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
