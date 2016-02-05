import React from 'react';

var NaturalLanguageFormElement = React.createClass({
  propTypes: {
    selectComponent: React.PropTypes.object.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  setValue: function (value) {
    this.setState({value: value});
  },
  render: function () {
    return false
  }
});

module.exports = NaturalLanguageFormElement;
