import React from 'react'
import Select from '../../Select'
import Country from './Country'

var CountrySelect = React.createClass({

  placeholder: "country",

  fetchCountries: function () {
		return (
			[
        <Country id={0} name="Colombia"    value="Colombia" />,
        <Country id={1} name="Puerto Rico" value="Puerto Rico"/>,
        <Country id={2} name="Mexico"      value="Mexico"/>,
        <Country id={3} name="Venezuela"   value="Venezuela"/>,
        <Country id={4} name="Chile"       value="Chile"/>,
        <Country id={5} name="Cuba"        value="Cuba"/>,
        <Country id={6} name="Guatemala"   value="Guatemala"/>,
        <Country id={7} name="Brazil"      value="Brazil"/>,
      ]
    );
	},
  render: function () {
    return (
      <div className="country-select">
        <Select dropdownElements={this.fetchCountries()} flexOrder={this.props.flexOrder} handleValidDropdownElement={this.props.handleValidDropdownElement} placeholder={this.placeholder}/>
      </div>
    );
  }
});

module.exports = CountrySelect;
