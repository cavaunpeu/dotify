"use strict";

import React from 'react';


var CountryDropdown = React.createClass({
    render: function() {
        return (
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle country" type="button" data-toggle="dropdown">country</button>
              <ul className="dropdown-menu">
                <li><a href="#">HTML</a></li>
                <li><a href="#">CSS</a></li>
                <li><a href="#">JavaScript</a></li>
              </ul>
            </div>
        );
    }
});

export default CountryDropdown;
