import React from 'react';
import Song from './Song.jsx';


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

export default RecommendedSongs;
