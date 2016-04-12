import React from 'react'
import Select from '../Select'
import Operator from './Operator'

var $ = require('jquery');

var OperatorSelect = React.createClass({

  placeholder: "",
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
    return (element.props.value.indexOf(inputName) > -1) && (element.props.name != inputName);
  },
  generateUniqueId: function() {
    return (new Date).getTime();
  },
  render: function () {
    return (
      <div className="operator-select">
        <Select key={this.generateUniqueId()} dropdownElements={this.state.dropdownElements} elementNameMatchesDropdownValue={this.elementNameMatchesDropdownValue} flexOrder={this.props.flexOrder} handleValidDropdownElement={this.props.handleValidDropdownElement} openDropdownOnRender={true} placeholder={this.placeholder}/>
      </div>
    );
  }
});

module.exports = OperatorSelect;
