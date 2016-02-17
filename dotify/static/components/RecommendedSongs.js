import React from 'react'

var RecommendedSongs = React.createClass({
  propTypes: {
    songs: React.PropTypes.array
  },
  render: function() {
    let songs = this.props.songs.map((song) => {
      return (
        <li key={song.props.id}>
          <span>{song.props.title}: {song.props.artist}</span>
        </li>
      )
    });
    return (
      <span id="recommended-songs">
        <ol>
          {songs}
        </ol>
      </span>
    )
  }
})

module.exports = RecommendedSongs;
