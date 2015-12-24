"use strict";

import React from 'react'


var Song = React.createClass({
    render: function() {
        return (
            <div className="song">
                {this.props.artist}
                {this.props.title}
            </div>
        );
    }
});

export default Song;
