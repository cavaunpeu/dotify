import React from 'react';

var NaturalLanguageFormElement = React.createClass({
  propTypes: {
    selectComponent: React.PropTypes.object.isRequired,
    dropdownElement: React.PropTypes.object,
  },
  setDropdownElement: function (dropdownElement) {
    this.setState({dropdownElement: dropdownElement});
  },
  render: function () {
    return false
  }
});

module.exports = NaturalLanguageFormElement;
