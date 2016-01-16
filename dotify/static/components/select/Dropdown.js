import React from 'react';

var Dropdown = React.createClass({
  propTypes: {
    fetchDropdownElements: React.PropTypes.func.isRequired,
    focusedDropdownOptionIndex: React.PropTypes.number.isRequired,
    handleOnClick: React.PropTypes.func.isRequired,
    inputValue: React.PropTypes.string.isRequired
  },
  componentWillMount: function () {
    this.setState({
      dropdownElements: this.props.fetchDropdownElements()
    });
  },
  render: function() {
    var eligibleElements = this.state.dropdownElements.map(function(element, index) {
      if (element.props.name.includes(this.props.inputValue) && element.props.name != this.props.inputValue) {
        var className = this.props.focusedDropdownOptionIndex == index ? "focused" : null;
        return (
          <li className={className} key={element.props.id} onClick={this.props.handleOnClick}>{element.props.name}</li>
        );
      }
    }.bind(this));
    return (
      <div className="Dropdown">
        <ul>
          {eligibleElements}
        </ul>
      </div>
    );
  }
});

module.exports = Dropdown;
