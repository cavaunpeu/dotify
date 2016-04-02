import React from 'react'

import RecommendationForm from '../components/recommendation/RecommendationForm'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div id="i-want-music-like">
                    I want music like:
                    <div id="example-natural-language-form-input">
                        (e.g. "Colombia x Turkey - Germany =")
                    </div>
                </div>
                <RecommendationForm />
            </div>
        );
    }
}

export default App;
