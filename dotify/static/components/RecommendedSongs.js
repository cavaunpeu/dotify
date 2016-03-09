import React from 'react'

var RecommendedSongs = React.createClass({
  propTypes: {
    songs: React.PropTypes.array
  },
  render: function() {
    let songs = this.props.songs.map((song) => {
      return (
        <li className="recommended-song" key={song.props.id}>
          <a href={song.props.url}>
            <div className="recommended-song-title">{song.props.title}</div>
            <div>{song.props.artist}</div>
          </a>
        </li>
      )
    });
    return (
      <ol>
        {songs}
      </ol>
    )
  }
})

module.exports = RecommendedSongs;
