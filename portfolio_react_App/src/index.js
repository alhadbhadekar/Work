import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import App from './components/App';
import './index.css';
import Header from './components/Header'
import Jokes from './components/Jokes';
import MusicMaster from './projects/music-master'



//ReactDOM.render(<div>React Element</div>, document.getElementById('root'));
/* ReactDOM.render(<App />, document.getElementById('root')); */

/* const history = createBrowserHistory(); */

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Switch>
            {/* <Route exact={true} path='/' component={App} /> You can remove true from exact={true} */}
            {/* <Route exact path='/' render = {() => <Header Component={App} />}  /> */}
            <Route exact path='/' render = {() => <Header><App /></Header>}  />
            <Route path='/jokes' render = {() => <Header><Jokes /></Header>} />
            <Route path='/music-master' render = {() => <Header><MusicMaster /></Header>}/>
        </Switch>
    </Router>, 
    document.getElementById('root')
);



/* Promises Explanation */

/* new Promise(resolve => {
    setTimeout(() => {
    console.log('Bears');
    resolve();
},2000);
})
.then(() => {
    console.log('Beets');
    console.log('Battlestar Galactica');
}); */

/* new Promise((resolve,reject) => {
    return reject(new Error('No Bears'));

    setTimeout(() => {
    resolve('Bears , Beats, Battlestar Galactica');
},2000);
})
.then(quote => {
    console.log(quote);
})
.catch(error => console.log('error', error)); */



/* class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    speak() {
        console.log('I am', this.name, 'and I am', this.age, 'years old'
        )
    }
}

const animal1 = new Animal('Simba', 3);
animal1.speak();

console.log(animal1);

class Lion extends Animal {
    constructor(name,age, furColor, speed){
        super(name,age);
        this.furColor = furColor;
        this.speed = speed;
    }

    roar(){
        console.log(
            'ROOOAR! I have',
            this.furColor,
            'fur, and I can run',
            this.speed,
            'miles an hour!'
        );
    }
}

const lion1 = new Lion('Mufasa', 20, 'golden', 25);
lion1.speak();
lion1.roar();
console.log(lion1); */
