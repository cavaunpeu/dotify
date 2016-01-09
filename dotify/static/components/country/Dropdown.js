import React from 'react';

var Dropdown = React.createClass({
  componentWillMount: function () {
    this.setState({
      countries: [
        {id: 1, name: "Colombia"},
        {id: 2, name: "Puerto Rico"},
        {id: 3, name: "Mexico"},
        {id: 4, name: "Venezuela"},
        {id: 5, name: "Chile"},
        {id: 6, name: "Cuba"},
        {id: 7, name: "Guatemala"},
        {id: 8, name: "Brazil"},
      ]
    });
  },
  render: function() {
    var countriesToList = this.state.countries.map(function(country) {
      if (country.name.includes(this.props.inputValue)) {
        return (
          <li key={country.id}>{country.name}</li>
        );
      }
    }.bind(this));
    return (
      <div className="country-menu">
        <ul>
          {countriesToList}
        </ul>
      </div>
    );
  }
});

module.exports = Dropdown;
