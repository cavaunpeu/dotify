import React from 'react';

var Input = React.createClass({
  onChange: function() {
    console.log("poopies")
  },
  render: function() {
    return (
      <div className="country-input">
        <input placeholder="hello, world!" onChange={this.onChange}/>
      </div>
    )
  }
});

module.exports = Input;
