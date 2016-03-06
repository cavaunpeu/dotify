import React from 'react';

var Dropdown = React.createClass({
  propTypes: {
    dropdownElements: React.PropTypes.array.isRequired,
    focusedDropdownElement: React.PropTypes.object
  },
  render: function() {
    var dropdownElements = this.props.dropdownElements.map(element => {
      let className = this.props.focusedDropdownElement && (element.props.id == this.props.focusedDropdownElement.props.id) ? "focused" : null;
      let id = (element.type.displayName == "Operator") && (element.props.id == 4) ? "equals-sign" : null;
      return (
        <li id={id} className={className} key={element.props.id} onClick={this.props.handleOnClick}>{element.props.name}</li>
      );
    });
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
