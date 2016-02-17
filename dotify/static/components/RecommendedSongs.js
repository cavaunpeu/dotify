import React from 'react'

var RecommendedSongs = React.createClass({
  propTypes: {
    songs: React.PropTypes.array
  },
  render: function() {
    let songs = this.props.songs.map((song) => {
      return (
        <li className="recommended-song" key={song.props.id}>
          <div className="title">{song.props.title}</div>
          <div className="artist">{song.props.artist}</div>
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
