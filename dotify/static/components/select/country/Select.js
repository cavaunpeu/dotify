import React from 'react'
import Select from '../Select'

var CountrySelect = React.createClass({
  render: function () {
    return (
      <div className="country-select">
        <Select />
      </div>
    );
  }
});

module.exports = CountrySelect;
