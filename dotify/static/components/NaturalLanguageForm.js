import React from 'react'

import CountrySelect from './select/country/Select'
import OperatorSelect from './select/operator/Select'
import NaturalLanguageFormElement from './NaturalLanguageFormElement'

var $ = require('jquery');

var NaturalLanguageForm = React.createClass({
  getInitialState: function () {
    return {
      elementsToRender: [
        <NaturalLanguageFormElement selectComponent={<CountrySelect flexOrder={1} handleValidDropdownElement={this.handleValidDropdownElement}/>} dropdownElement={null}/>
      ]
    }
  },
  buildFormElement: function (selectComponent, dropdownElement = null) {
    return <NaturalLanguageFormElement selectComponent={selectComponent} dropdownElement={dropdownElement}/>;
  },
  determineNextSelectComponent: function (flexOrder) {
    return this.isEven(flexOrder) ?
        <CountrySelect flexOrder={flexOrder + 1} handleValidDropdownElement={this.handleValidDropdownElement}/>
      :<OperatorSelect flexOrder={flexOrder + 1} handleValidDropdownElement={this.handleValidDropdownElement}/>;
  },
  formElementValues: function () {
    return this.state.elementsToRender.map(function(element) {
      return element.props.dropdownElement ? element.props.dropdownElement.value : "";
    });
  },
  fetchRecommendedSongs: function() {
    $.ajax({
      url: "/songs",
      type: "POST",
      data: JSON.stringify({
        "operators": this.getOperators(),
        "countries": this.getOperands()
      }, null, '\t'),
      contentType: "application/json",
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getOperands: function() {
    return this.formElementValues().filter((value, index) => this.isEven(index));
  },
  getOperators: function() {
    return this.formElementValues().filter((value, index) => !this.isEven(index) && value != "=");
  },
  handleValidDropdownElement: function (flexOrder, dropdownElement) {
    if (flexOrder == this.state.elementsToRender.length) {
      this.setState(
        (state) => { elementsToRender: state.elementsToRender[flexOrder - 1] = this.buildFormElement(state.elementsToRender[flexOrder - 1].props.selectComponent, dropdownElement) },
        () => {
          if (dropdownElement.props.value != "=") {
            this.setState((state) => { elementsToRender: state.elementsToRender.push(this.buildFormElement(this.determineNextSelectComponent(flexOrder))) });
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
    let elementsToRender = this.state.elementsToRender.map(function(element) {
      return (
        <span className="natural-language-form-element" key={element.props.selectComponent.props.flexOrder}>
          {element.props.selectComponent}
        </span>
      );
    });
    return (
      <div id="natural-language-form">
        {elementsToRender}
      </div>
    );
  }
});

module.exports = NaturalLanguageForm;
