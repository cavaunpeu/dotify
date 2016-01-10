import React from 'react'
import CountrySelect from './select/country/Select'

var NaturalLanguageForm = React.createClass({
  render: function () {
    return (
      <div className="natural-language-form">
        <CountrySelect />
      </div>
    );
  }
});

module.exports = NaturalLanguageForm;
