import React from 'react';

var Dropdown = React.createClass({
  render: function() {
    var menu = function() {
      return (
        <ul>
          <li>"pa mexico"</li>
          <li>"tal vez"</li>
        </ul>
      );
    }
    return (
      <div className="country-menu">
        {menu()}
      </div>
    );
  }
});

module.exports = Dropdown;
