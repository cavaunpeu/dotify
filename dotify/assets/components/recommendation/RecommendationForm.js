import React from 'react'

import CountrySelect from '../select/country/Select'
import OperatorSelect from '../select/operator/Select'
import NaturalLanguageForm from '../natural_language_form/NaturalLanguageForm'
import NaturalLanguageFormElement from '../natural_language_form/NaturalLanguageFormElement'
import RecommendedSongsContainer from './RecommendedSongsContainer'
import Song from '../Song'

var $ = require('jquery');

var RecommendationForm = React.createClass({

  ajaxLoaderHtmlId: "ajax-loader",

  getInitialState: function () {
    return {
      formElementsToRender: [
        <NaturalLanguageFormElement selectComponent={<CountrySelect flexOrder={1} handleValidDropdownElement={this.handleValidDropdownElement}/>} dropdownElement={null}/>
      ],
      songs: []
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
    return this.state.formElementsToRender.map(formElement => {
      return formElement.props.dropdownElement.props.id;
    });
  },
  fetchRecommendedSongs: function() {
    $("#ajax-loader").show()
    $.ajax({
      url: "/recommended_songs",
      type: "POST",
      data: JSON.stringify({
        "operator_ids": this.getOperatorIds().filter(id => id != 4), // 4 is the id of `=`
        "country_ids": this.getCountryIds()
      }, null, '\t'),
      contentType: "application/json",
      success: response => {
        $("#ajax-loader").hide()
        this.setState({
          songs: response["songs"].map((song, index) => { return <Song id={index} title={song.title} artist={song.artist} url={song.url}/>; })
        });
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  getCountryIds: function() {
    return this.formElementIds().filter((formElement, index) => this.isEven(index));
  },
  getOperatorIds: function() {
    return this.formElementIds().filter((formElement, index) => !this.isEven(index));
  },
  handleClearButtonOnClick: function() {
    this.replaceState(this.getInitialState());
  },
  handleValidDropdownElement: function (flexOrder, dropdownElement) {
    if (flexOrder == this.state.formElementsToRender.length) {
      this.setState(
        state => { formElementsToRender: state.formElementsToRender[flexOrder - 1] = this.buildFormElement(state.formElementsToRender[flexOrder - 1].props.selectComponent, dropdownElement) },
        () => {
          if ( !(dropdownElement.props.value.indexOf("=") > -1) ) {
            this.setState(state => { formElementsToRender: state.formElementsToRender.push(this.buildFormElement(this.determineNextSelectComponent(flexOrder))) });
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
    let formElementsToRender = this.state.formElementsToRender.map(formElement => {
      return (
        <span className="natural-language-form-element" key={formElement.props.selectComponent.props.flexOrder}>
          {formElement.props.selectComponent}
        </span>
      );
    });
    return (
      <div id="recommendation-form">
          <NaturalLanguageForm elements={formElementsToRender} />
          <div id="vertical-line"></div>
          <RecommendedSongsContainer songs={this.state.songs} handleClearButtonOnClick={this.handleClearButtonOnClick} />
      </div>
    );
  }
});

module.exports = RecommendationForm;
