import React from 'react';
import Country from './Country';

var Dropdown = React.createClass({
  // TODO: generalize this to accept a componentWillMount method
  propTypes: {
    inputValue: React.PropTypes.string.isRequired,
    handleOnClick: React.PropTypes.func.isRequired
  },
  componentWillMount: function () {
    this.setState({
      countries: [
        <Country id={1} name="Colombia" />,
        <Country id={2} name="Puerto Rico" />,
        <Country id={3} name="Mexico" />,
        <Country id={4} name="Venezuela" />,
        <Country id={5} name="Chile" />,
        <Country id={6} name="Cuba" />,
        <Country id={7} name="Guatemala" />,
        <Country id={8} name="Brazil" />,
      ]
    });
  },
  render: function() {
    var eligibleCountries = this.state.countries.map(function(country) {
      if (country.props.name.includes(this.props.inputValue) && country.props.name != this.props.inputValue) {
        return (
          <li key={country.props.id} onClick={this.props.handleOnClick}>{country.props.name}</li>
        );
      }
    }.bind(this));
    return (
      <div className="Dropdown">
        <ul>
          {eligibleCountries}
        </ul>
      </div>
    );
  }
});

module.exports = Dropdown;
