import React from 'react';
import ReactDOM from 'react-dom'


var Song = React.createClass({
    render: function () {
        return (
            <div className="song">
                {this.props.artist}
                {this.props.title}
            </div>
        );
    }
});

var RecommendedSongs = React.createClass({
    render: function () {
        var songNodes = this.props.songs.map(function(song) {
            return (
                <Song artist={song.artist} title={song.title} />
            );
        });
        return (
            <div className="recommendedSongs">
                {songNodes}
            </div>
        );
    }
});

var songs = [
    {"artist": "Camron", "title": "Hey Ma"},
    {"arist": "Fauve", "title": "Rub a Dub"}
];

ReactDOM.render(
  <RecommendedSongs songs={ songs } />,
  document.getElementById("content")
);
