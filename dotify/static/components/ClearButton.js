import React from 'react'

var ClearButton = React.createClass({
  propTypes: {
    handleOnClick: React.PropTypes.func.isRequired,
  },
  render: function() {
    return (
      <div id="clear-button">
        <button onClick={this.props.handleOnClick}>clear</button>
      </div>
    )
  }
})

module.exports = ClearButton;
