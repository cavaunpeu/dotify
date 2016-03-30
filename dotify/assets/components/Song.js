import React from 'react'

var Song = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    artist: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired
  },
  render: function() {
    return false;
  }
})

module.exports = Song;
