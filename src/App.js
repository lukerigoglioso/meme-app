import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.css';
import axios from 'axios'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      response: [],
      gifs: [],
      loaded: false,
      urlArr: []
    };
    this.getSubreddit = this.getSubreddit.bind(this);
    this.getGifs = this.getGifs.bind(this);
    this.updateMemeUrl = this.updateMemeUrl.bind(this);

  }

  componentDidMount() {
    this.getSubreddit()
    this.getGifs()
  }

  getSubreddit() {
    //images
    var memeDivs = axios.get('https://www.reddit.com/r/meme/new/.json').then(apiResponse => this.setState({response: apiResponse.data.data.children, loaded: true}))
  }

  getGifs(){
    //gifs
    var gifDivs = axios.get('https://www.reddit.com/r/meme/new/.json').then(apiResponse => this.setState({gifs: apiResponse, loaded: true}))
  }


  updateMemeUrl() {
    const stateResp = this.state.response
    const arr = []
    const divArr = []

    console.log(this.state.loaded)
    if (this.state.loaded === true) {
      for (var i = 0; i < stateResp.length; i++) {
        arr.push(stateResp[i].data.url)
      }
      console.log(arr)
      //add to div array
      for (var j = 0; j < arr.length; j++) {
        var temp = arr[j]
        var validateBool1 = temp.includes(".jpg") ;
        var validateBool2 = temp.includes(".jpeg");
        var validateBool3 = temp.includes(".png");
        var validateBool = validateBool1 || validateBool2 || validateBool3
        console.log(j + " " + validateBool1)
        console.log(j + " " + validateBool2)
        console.log(j + " " + validateBool3)
        console.log(j + " " + validateBool)
        if (validateBool){
          console.log(temp)
          divArr.push(<div class="column is-one-third">
            <div class="card wrapper">
                  <div class="card-image">
                    <figure class="image">
                      <img src={arr[j]} alt="Image"/>
                    </figure>
                </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Save</a>
                <a href="#" class="card-footer-item">Share</a>
                <a href="#" class="card-footer-item">Something else</a>
              </footer>
            </div>
          </div>)

        } else {
          var urlConcatJPG = temp + ".png"
          console.log(urlConcatJPG)
          divArr.push(
            <div class="column is-one-third">
            <div class="card">
              <div class="card-content">
              <div class="content">
              <div class="card-image">
                <figure class="image">
                  <img src={urlConcatJPG} alt="Image"/>
                </figure>
              </div>
            </div>
          </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Save</a>
                <a href="#" class="card-footer-item">Share</a>
                <a href="#" class="card-footer-item">Something else</a>
              </footer>
            </div>
          </div>)
        }
        console.log(arr[j])
      }
    }

    return <div class="row columns is-multiline wrapper">{divArr}</div>
  }

  render() {
    console.log(this.state)
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">
          MommaMemes
        </h1>
        <div>Freshest Memes daily... Just How Momma Use to Make!</div>
      </header>
      <div>{this.updateMemeUrl()}</div>
    </div>);

  }

}

export default App;
