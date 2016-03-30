import React from 'react'

import RecommendationForm from '../components/recommendation/RecommendationForm'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div id="i-want-music-like">
                    I want music like:
                </div>
                <RecommendationForm />
            </div>
        );
    }
}

export default App;
