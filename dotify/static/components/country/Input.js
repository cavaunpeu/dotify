import React from 'react';

var Input = React.createClass({
  propTypes: {
    handleInputChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="country-input">
        <input placeholder={this.props.placeholder} onChange={this.props.handleInputChange}/>
      </div>
    )
  }
});

module.exports = Input;
