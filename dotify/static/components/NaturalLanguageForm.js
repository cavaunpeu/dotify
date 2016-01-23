import React from 'react'
import CountrySelect from './select/country/Select'
import OperatorSelect from './select/operator/Select'

var NaturalLanguageForm = React.createClass({
  render: function () {
    return (
      <div id="natural-language-form">
        <CountrySelect />
        <span>
          <OperatorSelect />
        </span>
      </div>
    );
  }
});

module.exports = NaturalLanguageForm;
