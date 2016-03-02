import React from 'react'

import RecommendationForm from '../components/RecommendationForm'

class HowsThisWork extends React.Component {
    render() {
        return (
            <div id="hows-this-work">
                <p id="info-title">
                    When you enter an arithmetic expression, dotify will return the 5 songs most similar to your composite locale. These songs are discovered as follows:
                </p>
                <ol>
                    <li>
                        Download <a href="https://spotifycharts.com/regional/">Spotify Charts</a> data nightly. This data include the Top 200 ranked songs for each country, as well as how many times it was streamed.
                    </li>
                    <li>
                        Perform Implicit Matrix Factorization nightly, a la <a href="http://yifanhu.net/PUB/cf.pdf">Hu, Koren and Volinsky.</a> Implicit feedback units are counted in total historical streams for a given song in a given country. While $C_ui$ is usually defined as $1 + \alpha (1 + R_ui)$, we modified this expression to $1 + \alpha log(1 + R_ui)$, which performed better empirically. This is likely due to a skewed distribution of total historical streams.
                    </li>
                    <li>
                        With each song and country represented as an $f=30$ dimensional latent vector, compute the compsite vector for the composite local. For example, "Colombia + Mexico - Turkey" = $v_Colombia + v_Mexico - v_Turkey$.
                    </li>
                    <li>
                        Take dot products of our composite country vector and every song vector. Sort dot products in decreasing order, and return the 5 songs that yield the highest values.
                    </li>
                </ol>
            </div>
        );
    }
}

export default HowsThisWork;
