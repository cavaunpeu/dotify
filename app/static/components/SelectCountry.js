import React from 'react';

var SelectCountry = React.createClass({
  renderMenu: function() {
    var countryMenu = function() {
      return (
        <ul>
          <li>"hey"</li>
          <li>"dude"</li>
        </ul>
      );
    };
    return (
      <div className="country-menu">
        {countryMenu()}
      </div>
    );
  },
  render: function() {
    return (
      <div className="select-country">
        <form>
          <input type="text" />
        </form>
        {this.renderMenu()}
      </div>
    );
  }
});

module.exports = SelectCountry;
