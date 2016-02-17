import React from 'react'

var NaturalLanguageForm = React.createClass({
  propTypes: {
    elements: React.PropTypes.array.isRequired,
  },
  render: function() {
    return (
      <span id="natural-language-form">
          {this.props.elements}
      </span>
    )
  }
})

module.exports = NaturalLanguageForm;
