import React from 'react'
import NaturalLanguageForm from '../components/NaturalLanguageForm'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div id="i-want-music-like">
                    I want music like:
                </div>
                <NaturalLanguageForm />
            </div>
        );
    }
}

export default App
