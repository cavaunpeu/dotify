"use strict";

import React from 'react';


var CountryDropdown = React.createClass({
    render: function() {
        var countries = this.props.countries.map(function(country) {
            return (
                <li key={country.id}>
                    <a href="#">{country.name}</a>
                </li>
            );
        });
        return (
            <div className="dropdown">
              <button className="btn btn-default dropdown-toggle dropdown-country" data-toggle="dropdown">
                country
                <b className="caret"></b>
              </button>
              <ul className="dropdown-menu">
                {countries}
              </ul>
            </div>
        );
    }
});

export default CountryDropdown;
