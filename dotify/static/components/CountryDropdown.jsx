"use strict";

import React from 'react';


var CountryDropdown = React.createClass({
    render: function() {
        var countries = this.props.countries.map(function(country) {
            return (
                <option value={country.id}>{country.name}</option>
            )
        })
        return (
            <select value="1">
                {countries}
            </select>
        );
    }
});

export default CountryDropdown;
