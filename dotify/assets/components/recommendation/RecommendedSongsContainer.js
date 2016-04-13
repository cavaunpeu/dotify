import React from 'react'

import RecommendedSongs from './RecommendedSongs'
import ClearButton from '../ClearButton'

var RecommendedSongsContainer = React.createClass({
  propTypes: {
    songs: React.PropTypes.array.isRequired,
    handleClearButtonOnClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <span id="recommended-songs-container">
        <img src={require("./../../images/ajax-loader.gif")} id="ajax-loader" />
        <RecommendedSongs songs={this.props.songs} />
        {this.props.songs.length > 0 ? <ClearButton handleOnClick={this.props.handleClearButtonOnClick} /> : null}
      </span>
    )
  }
})

module.exports = RecommendedSongsContainer;
