import React from 'react'
var $ = require('jquery');
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
  fetchRecommendedSongs: function() {
    $.ajax({
      url: "/songs",
      type: "POST",
      data: JSON.stringify({"dropdownElementNames": this.enteredDropdownElementNames()}, null, '\t'),
      contentType: "application/json",
      success: function(data) {
        // parse recommended songs here
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleValidDropdownElementName: function (flexOrder, inputValue) {
    if (flexOrder == this.state.componentObjectsToRender.length) {
      this.setState(
        (state) => { componentObjectsToRender: state.componentObjectsToRender[flexOrder - 1]["enteredDropdownElementName"] = inputValue },
        () => {
          if (inputValue != "=") {
            this.setState((state) => { componentObjectsToRender: state.componentObjectsToRender.push(this.buildNextComponentObject(flexOrder)) });
          } else {
            this.fetchRecommendedSongs();
          }
        }
      );
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
