import React from 'react'
import CountrySelect from './select/country/Select'
import OperatorSelect from './select/operator/Select'

var NaturalLanguageForm = React.createClass({
  getInitialState: function () {
    return {
      componentObjectsToRender: [
        {
          "component": <CountrySelect flexOrder={1} handleValidDropdownElementName={this.handleValidDropdownElementName}/>,
          "enteredDropdownElementName": ""
        }
      ]
    }
  },
  buildNextComponentObject: function (flexOrder) {
    return {
      "component": this.determineNextComponent(flexOrder),
      "enteredDropdownElementName": ""
    };
  },
  determineNextComponent: function (flexOrder) {
    return this.isEven(flexOrder) ?
        <CountrySelect flexOrder={flexOrder + 1} handleValidDropdownElementName={this.handleValidDropdownElementName}/>
      :<OperatorSelect flexOrder={flexOrder + 1} handleValidDropdownElementName={this.handleValidDropdownElementName}/>;
  },
  enteredDropdownElementNames: function () {
    return this.state.componentObjectsToRender.map(function(componentObject) {
      return componentObject["enteredDropdownElementName"];
    });
  },
  handleValidDropdownElementName: function (flexOrder, inputValue) {
    if (flexOrder == this.state.componentObjectsToRender.length) {
      this.setState((state) => { componentObjectsToRender: state.componentObjectsToRender[flexOrder - 1]["enteredDropdownElementName"] = inputValue })
      if (inputValue != "=") {
        this.setState((state) => { componentObjectsToRender: state.componentObjectsToRender.push(this.buildNextComponentObject(flexOrder)) })
      }
    }
  },
  isEven: function(integer) {
    return integer % 2 == 0;
  },
  render: function () {
    let componentsToRender = this.state.componentObjectsToRender.map(function(componentObject) {
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
