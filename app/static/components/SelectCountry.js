import React from 'react';

var SelectCountry = React.createClass({
  render: function() {
    return (
      <div className="select-country">
        <form>
          <input type="text" />
        </form>
      </div>
    );
  }
});

module.exports = SelectCountry;
