import React from 'react'
import CountrySelect from './select/country/Select'
import OperatorSelect from './select/operator/Select'

var NaturalLanguageForm = React.createClass({
  getInitialState: function () {
    return {
      componentsToRender: [
        <CountrySelect flexOrder={1} handleValidInput={this.handleValidInput}/>
      ]
    }
  },
  determineNextComponent: function (flexOrder) {
    return this.isEven(flexOrder) ?
        <CountrySelect flexOrder={flexOrder + 1} handleValidInput={this.handleValidInput}/>
      :<OperatorSelect flexOrder={flexOrder + 1} handleValidInput={this.handleValidInput}/>
  },
  handleValidInput: function (flexOrder, inputValue) {
    if (flexOrder == this.state.componentsToRender.length) {
      if (inputValue != "=") {
        this.setState({
          componentsToRender: this.state.componentsToRender.concat([this.determineNextComponent(flexOrder)])
        });
      }
    }
  },
  isEven: function(integer) {
    return integer % 2 == 0
  },
  render: function () {
    var componentsToRender = this.state.componentsToRender.map(function(component) {
      return (
        <span className="nl-form-component" key={component.props.flexOrder}>
          {component}
        </span>
      );
    });
    return (
      <div id="natural-language-form">
        {componentsToRender}
      </div>
    );
  }
});

module.exports = NaturalLanguageForm;
