import React from 'react';
import ReactDOM from 'react-dom'

var Input = React.createClass({
  propTypes: {
    handleInputNameChange: React.PropTypes.func.isRequired,
    handleOnKeyDown: React.PropTypes.func.isRequired,
    inputName: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  inputSize: function () {
    return this.props.inputName ? this.props.inputName.length: this.props.placeholder.length
  },
  componentDidMount: function () {
    ReactDOM.findDOMNode(this.refs['input-form']).focus(); 
  },
  render: function() {
    return (
      <div className="Input">
        <input ref="input-form" value={this.props.inputName} size={this.inputSize() + 1} placeholder={this.props.placeholder} onChange={this.props.handleInputNameChange} onKeyDown={this.props.handleOnKeyDown}/>
      </div>
    );
  }
});

module.exports = Input;
