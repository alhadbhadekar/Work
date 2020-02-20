import React, { Component } from 'react';

const TITLES = [
    'a passionate Software Developer',
    'a music lover',
    'an enthusiastic learner',
    'an adventure seeker'
];

class Title extends Component{
    state = { titleIndex: 0, fadeIn: true};

    componentDidMount() {

        this.timeout = setTimeout(() => this.setState({ fadeIn: false }), 2000);
        console.log('Title component has mounted');
        
        this.animateTitles();
    }

    componentWillUnmount(){
        console.log('Title component will unmount');
        clearInterval(this.titleInterval);
        clearTimeout(this.timeout);
    }

    animateTitles = () => {
        this.titleInterval = setInterval(() => {
            const titleIndex = (this.state.titleIndex + 1) % TITLES.length;

            /* this.setState({ titleIndex: titleIndex }); */

            /* You can write above statement as following as well as index and key are same*/
            this.setState({ titleIndex , fadeIn: true });
            this.timeout = setTimeout(() => this.setState({ fadeIn: false }), 2000);
        }, 4000);

        console.log('this.titleInterval', this.titleInterval)
    }


    render(){
        const { fadeIn, titleIndex } = this.state;
        
        const title = TITLES[titleIndex];

        return (
            <p className = {fadeIn ? 'title-fade-in' : 'title-fade-out'}><strong>I am {title}</strong></p>
        )
    }
}

export default Title;