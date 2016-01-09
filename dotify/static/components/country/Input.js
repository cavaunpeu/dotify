import React from 'react';

var Input = React.createClass({
  propTypes: {
    handleInputChange: React.PropTypes.func,
  },
  render: function() {
    return (
      <div className="country-input">
        <input placeholder="hello, world!" onChange={this.props.handleInputChange}/>
      </div>
    )
  }
});

module.exports = Input;
