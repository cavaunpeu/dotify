import React from 'react'
import SelectCountry from '../components/SelectCountry'

class App extends React.Component {
    render() {
        return (
            <div>
                <span id="i-want-music-like">
                    I want music like:
                </span>
                <div id="equation-builder">
                    <SelectCountry />
                </div>
            </div>
        );
    }
}

export default App
