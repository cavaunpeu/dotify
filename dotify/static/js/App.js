import React from 'react'
import NaturalLanguageForm from '../components/NaturalLanguageForm'

class App extends React.Component {
    render() {
        return (
            <div>
                <span id="i-want-music-like">
                    I want music like:
                </span>
                <div id="equation-builder">
                    <NaturalLanguageForm />
                </div>
            </div>
        );
    }
}

export default App
