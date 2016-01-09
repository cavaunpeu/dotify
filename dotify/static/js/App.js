import React from 'react'
import Select from '../components/country/Select'

class App extends React.Component {
    render() {
        return (
            <div>
                <span id="i-want-music-like">
                    I want music like:
                </span>
                <div id="equation-builder">
                    <Select />
                </div>
            </div>
        );
    }
}

export default App
