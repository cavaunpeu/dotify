import React from 'react'

var Operator = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
  },
  render: function () {
    return false
  }
});

module.exports = Operator;
