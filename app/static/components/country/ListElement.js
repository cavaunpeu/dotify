import React from 'react';

var ListElement = React.createClass({
  propTypes: {
    // make this required
    inputValue: React.propTypes.string,
  }
  render: function () {
    return (
      <li className="country-list-element">this.props.inputValue</li>
    );
  }
});

module.exports = ListElement;
