import React from 'react'
import CountrySelect from './select/country/Select'
import OperatorSelect from './select/operator/Select'

var NaturalLanguageForm = React.createClass({
  getInitialState: function () {
    return {
      componentsToRender: [
        {
          "component": <CountrySelect flexOrder={1} handleValidInput={this.handleValidInput}/>,
          "enteredDropdownElementName": ""
        }
      ]
    }
  },
  determineNextComponent: function (flexOrder) {
    var nextComponent = this.isEven(flexOrder) ?
        <CountrySelect flexOrder={flexOrder + 1} handleValidInput={this.handleValidInput}/>
      :<OperatorSelect flexOrder={flexOrder + 1} handleValidInput={this.handleValidInput}/>;
    return {
      "component": nextComponent,
      "enteredDropdownElementName": ""
    };
  },
  handleValidInput: function (flexOrder, inputValue) {
    if (flexOrder == this.state.componentsToRender.length) {
      this.setState((state) => { componentsToRender: state.componentsToRender[flexOrder - 1]["enteredDropdownElementName"] = inputValue })
      if (inputValue != "=") {
        this.setState((state) => { componentsToRender: state.componentsToRender.push(this.determineNextComponent(flexOrder)) })
      }
    }
  },
  isEven: function(integer) {
    return integer % 2 == 0;
  },
  render: function () {
    var componentsToRender = this.state.componentsToRender.map(function(componentObject) {
      return (
        <span className="nl-form-component" key={componentObject["component"].props.flexOrder}>
          {componentObject["component"]}
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
