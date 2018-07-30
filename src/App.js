import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import MemeCard from './components/MemeCard'
import 'bulma/css/bulma.css';
import axios from 'axios'
import validator from 'validate-image-url'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
      gifs: [],
      loaded: false,
      urlArr: [],
      finalUrlArr: []
    };
  }

  render() {

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">
          MommaMemes
        </h1>
        <div>Freshest Memes daily... Just How Momma Use to Make!</div>
      </header>

      <MemeCard/>
      
    </div>);

  }

}

export default App;
