import React from 'react'
import Select from '../Select'
import Operator from './Operator'

var $ = require('jquery');

var OperatorSelect = React.createClass({

  equalsSign: "=",
  placeholder: "+",
  source: "/operators",

  getInitialState: function () {
    return {
      dropdownElements: []
    };
  },
  componentDidMount: function() {
    this.serverRequest = $.get(this.source, response => {
      this.setState({
        dropdownElements: response['operators'].map(operator => {
          return <Operator id={operator.id} name={operator.name} value={operator.value}/>;
        })
      });
    });
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  elementNameMatchesDropdownValue: function(element, inputName) {
    if ([this.minusSign, this.equalsSign, this.placeholder].indexOf(inputName) > -1) {
      return false;
    }
    return element.props.value.includes(inputName);
  },
  render: function () {
    return (
      <div className="operator-select">
        <Select dropdownElements={this.state.dropdownElements} elementNameMatchesDropdownValue={this.elementNameMatchesDropdownValue} flexOrder={this.props.flexOrder} handleValidDropdownElement={this.props.handleValidDropdownElement} placeholder={this.placeholder}/>
      </div>
    );
  }
});

module.exports = OperatorSelect;
