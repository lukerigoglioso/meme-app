import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css'


class App extends Component {



//  this.state.response.map((items) => items.data.preview.images.map((memeUrl)=> <li>{memeUrl.source.url}</li>))

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
    };
    this.memesList = this.memesList.bind(this);

  }

  memesList() {
      var listItems = this.state.response.map((items) => items.data.preview.images.map((memeUrl)=>
      <div class="column is-one-third">
                    <div class="card large">
                        <div class="card-image">
                            <figure class="image">
                                <img src={memeUrl.source.url} alt="Image"/>
                            </figure>
                        </div>
                      </div>
                </div>
    ))
      return (
        <div class="columns is-multiline">{listItems}</div>
      );
    }


  componentDidMount() {
    fetch("https://www.reddit.com/r/meme/new/.json")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          response: result.data.children
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {

    var response;
    var memelist
    console.log(this.state.response.map((items) => items.data.preview.images.map((memeUrl)=> memeUrl.source.url)))

    if(this.state.response){
      response = this.state.response
    }




    return (
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">YB Memes</h1>
  </header>

<div class="row columns">
<section class="hero is-info is-medium is-bold">
  {this.memesList()}
</section>
  </div>
</div>
    );
  }
}

export default App;
