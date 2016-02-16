import React from 'react'

import CountrySelect from './select/country/Select'
import OperatorSelect from './select/operator/Select'
import NaturalLanguageFormElement from './NaturalLanguageFormElement'

var $ = require('jquery');

var NaturalLanguageForm = React.createClass({
  getInitialState: function () {
    return {
      formElementsToRender: [
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
  formElementIds: function () {
    return this.state.formElementsToRender.map(function(formElement) {
      return formElement.props.dropdownElement.props.id;
    });
  },
  fetchRecommendedSongs: function() {
    $.ajax({
      url: "/songs",
      type: "POST",
      data: JSON.stringify({
        "operator_ids": this.getOperatorIds().filter((id) => id != 4), // 4 is the id of `=`
        "country_ids": this.getCountryIds()
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
  getCountryIds: function() {
    return this.formElementIds().filter((formElement, index) => this.isEven(index));
  },
  getOperatorIds: function() {
    return this.formElementIds().filter((formElement, index) => !this.isEven(index));
  },
  handleValidDropdownElement: function (flexOrder, dropdownElement) {
    if (flexOrder == this.state.formElementsToRender.length) {
      this.setState(
        (state) => { formElementsToRender: state.formElementsToRender[flexOrder - 1] = this.buildFormElement(state.formElementsToRender[flexOrder - 1].props.selectComponent, dropdownElement) },
        () => {
          if (dropdownElement.props.value != "=") {
            this.setState((state) => { formElementsToRender: state.formElementsToRender.push(this.buildFormElement(this.determineNextSelectComponent(flexOrder))) });
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
    let formElementsToRender = this.state.formElementsToRender.map(function(formElement) {
      return (
        <span className="natural-language-form-element" key={formElement.props.selectComponent.props.flexOrder}>
          {formElement.props.selectComponent}
        </span>
      );
    });
    return (
      <div id="natural-language-form">
        {formElementsToRender}
      </div>
    );
  }
});

module.exports = NaturalLanguageForm;
