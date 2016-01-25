import React from 'react'
import Select from '../Select'
import Country from './Country'

var CountrySelect = React.createClass({
	getDefaultProps: function () {
		return {
			placeholder: "country"
		}
	},
	fetchCountries: function () {
		return (
			[
        <Country id={0} name="Colombia" />,
        <Country id={1} name="Puerto Rico" />,
        <Country id={2} name="Mexico" />,
        <Country id={3} name="Venezuela" />,
        <Country id={4} name="Chile" />,
        <Country id={5} name="Cuba" />,
        <Country id={6} name="Guatemala" />,
        <Country id={7} name="Brazil" />,
      ]
    );
	},
  render: function () {
    return (
      <div className="country-select">
        <Select dropdownElements={this.fetchCountries()} flexOrder={this.props.flexOrder} placeholder={this.props.placeholder} handleValidInput={this.props.handleValidInput}/>
      </div>
    );
  }
});

module.exports = CountrySelect;
