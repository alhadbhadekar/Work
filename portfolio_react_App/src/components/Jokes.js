import React, { Component } from 'react';
/* import Header from './Header'; */

const Joke = ({ joke: { setup, punchline } }) => {
    /* const { setup, punchline } = joke; Instead of defining here, you can define in above line*/
    return <p style={{ margin: 20 }}>{setup} <em>{punchline}</em></p>
}

/* const Joke = ({ props }) => {
    const { setup, punchline } = props.joke;
    return <p key={id}>{setup} <em>{punchline}</em></p>
} */

class Jokes extends Component {
    state = { joke: {}, jokes: [] };

    componentDidMount() {
        fetch('https://official-joke-api.appspot.com/random_joke')
            .then(response => response.json())
            .then(json => this.setState({ joke: json }))
            .catch(error => alert(error.message));
    }

    fetchJokes = () => {
        fetch('https://official-joke-api.appspot.com/random_ten')
            .then(response => response.json())
            .then(json => this.setState({ jokes: json }))
            .catch(error => alert(error.message));
    }

    render() {
        /* const { setup , punchline } = this.state.joke; */
        return(
            <div>
                {/* <Header /> */}
                <h2>Highlighted Joke</h2>
                {/* <p>{setup} <em>{punchline}</em></p> */}
                <Joke joke={this.state.joke}/>
                <hr />
                <h3>Want ten new Jokes?</h3>
                <button onClick={this.fetchJokes}>Click me!</button>
                {
                    this.state.jokes.map(joke => {
                        /* const { id, setup, punchline } = joke; */

                        return <Joke key={joke.id} joke={joke} />
                    })
                }
            </div>
        )
    }
}

export default Jokes;