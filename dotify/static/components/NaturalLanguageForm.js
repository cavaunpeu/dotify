import React from 'react'

var NaturalLanguageForm = React.createClass({
  propTypes: {
    elements: React.PropTypes.array.isRequired,
  },
  render: function() {
    return (
      <div id="natural-language-form">
          {this.props.elements}
      </div>
    )
  }
})

module.exports = NaturalLanguageForm;
