import React, { Component } from 'react';
import Projects from './Projects';
import SocialProfiles from './SocialProfiles';
import profile from '../assets/prof_pic.jpg';
import Title from './Title';
/* import Header from './Header'; */
/* import Jokes from './Jokes'; */

//class RegularClass{}
//class ComponentClass extends Component {}
//CompomenetClass extrnds { Component } from React Module

//const regularClassInstance = new RegularClass();
//const compomenetClassInstance = new ComponentClass();

//console.log('regularClassInstance', regularClassInstance);
//console.log('ccompomenetClassInstance', compomenetClassInstance);

class App extends Component {
    state = { displayBio : false };

    toggleDisplayBio = () => {
        this.setState({ displayBio: !this.state.displayBio });
    }

    /* No need to constructor as Claass Properties and Initialzers allow you to assign state and toggleDisplayBio to this object as you had to do in COnstructor */

    /* constructor(){
        super();
        this.state = { displayBio : false };

        console.log('Component this', this);

        this.toggleDisplayBio = this.toggleDisplayBio.bind(this);

    } */

    /* readMore(){
        this.setState({ displayBio: true });
        console.log('readMore this', this);
    }
    
    showLess(){
        this.setState({ displayBio: false });
    } */

    /* Instead of above 2 methods, you can use toggleDisplayBio Method */

    
    /* You ccan also use render menthod to take class property syntax */
    /* render = () =>{

    } 
    */
    render() {
        return(
            <div>
                {/* <Header /> */}
                <img src={profile} alt='profile' className='profile'/>
                <h1>Hello!</h1>
                <p>My name is Alhad</p>
                <Title />
                <p>I'm always looking forward to solve real life problems with software solutions and meaningful projects</p>
                {this.state.displayBio ? (
                    <div>
                        <p>I live in Toronto</p>
                        <p>I code pretty much everyday</p>
                        <p>My favourite language is Python, and I think php is awesome!</p>
                        <p>Learning new programming lanugage is my passion and I am firm beliver of "I can and will do it" attitude</p>
                        <p>Besides coding, I also love music, playing guitar and ramen!</p>
                        <button onClick={this.toggleDisplayBio}>Show Less</button>
                    </div>
                    ) : (
                    <div>
                        <button onClick={this.toggleDisplayBio}>Read More</button>
                    </div>
                    
                )}
                <hr />
                <Projects />
                <hr />
                <div id="wrapper">
                <SocialProfiles />
                {/* <hr />
                <Jokes /> */}
                </div>
            </div>
        )
    }

}

/* const AppWithHeader = () => {
    return(
        <Header Component={App} />
    )
} */

/* export default AppWithHeader; */
export default App