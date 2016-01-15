import React from "react";

var Input = React.createClass({
  propTypes: {
    handleInputChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    function expandInputElement(text) {
      if (!text.trim()) {
          text = $(this).attr("placeholder").trim();
      }
      var $span = $(this).parent().find("span");
      $span.text(text);
      $(this).css("width", $span.width());
    }

    // initialize text element
    $(".Input").find("input").each(function () {
      expandInputElement.call($(this), $(this).val())
    });

    // handle text change
    $(".Input").find("input").keypress(function (e) {
      if (e.which && e.charCode) {
        var c = String.fromCharCode(e.keyCode | e.charCode);
        expandInputElement.call($(this), $(this).val() + c);
      }
    });

    // handle backspaces
    $(".Input").find("input").keyup(function (e) { 
      if (e.keyCode === 8 || e.keyCode === 46) {
        expandInputElement.call($(this), $(this).val());
      }
    });

  },
  render: function() {
    return (
      <div className="Input">
        <input placeholder={this.props.placeholder} onChange={this.props.handleInputChange}/>
        <span></span>
      </div>
    )
  }
});

module.exports = Input;
