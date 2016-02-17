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
      <ul>
        {songs}
      </ul>
    )
  }
})

module.exports = RecommendedSongs;
