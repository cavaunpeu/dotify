import React from 'react';
import ReactDOM from 'react-dom'

var Input = React.createClass({
  propTypes: {
    handleInputChange: React.PropTypes.func.isRequired,
    handleOnKeyDown: React.PropTypes.func.isRequired,
    inputValue: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  inputSize: function () {
    return this.props.inputValue ? this.props.inputValue.length: this.props.placeholder.length
  },
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs['input-form']).focus(); 
  },
  render: function() {
    return (
      <div className="Input">
        <input ref="input-form" size={this.inputSize()} placeholder={this.props.placeholder} onChange={this.props.handleInputChange} onKeyDown={this.props.handleOnKeyDown}/>
      </div>
    )
  }
});

module.exports = Input;
