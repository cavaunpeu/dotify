import React from 'react'
import Select from '../../Select'
import Country from './Country'

var $ = require('jquery');

var CountrySelect = React.createClass({

  placeholder: "country",
  source: "/countries",

  getInitialState: function () {
    return {
      dropdownElements: []
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.get(this.source, response => {
      this.setState({
        dropdownElements: response['countries'].map(country => {
          return <Country id={country.id} name={country.name} value={country.value}/>;
        })
      });
    });
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function () {
    return (
      <div className="country-select">
        <Select dropdownElements={this.state.dropdownElements} flexOrder={this.props.flexOrder} handleValidDropdownElement={this.props.handleValidDropdownElement} placeholder={this.placeholder}/>
      </div>
    );
  }
});

module.exports = CountrySelect;
