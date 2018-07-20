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
      loaded: false,
      urlArr: []
    };
    this.getSubreddit = this.getSubreddit.bind(this);
    this.updateMemeUrl = this.updateMemeUrl.bind(this);
  }

  componentDidMount() {
    this.getSubreddit()
  }



  getSubreddit() {
    var memeDivs = axios.get('https://www.reddit.com/r/meme/new/.json').then(apiResponse => this.setState({response: apiResponse.data.data.children, loaded: true}))
  }

  updateMemeUrl() {
    const stateResp = this.state.response
    const arr = []
    const divArr = []


    console.log(this.state.loaded)
    if (this.state.loaded===true) {
        for (var i = 0; i < stateResp.length; i++) {
          arr.push(stateResp[i].data.url)
        }
        console.log(arr)
        //add to div array
        for (var j = 0; j < arr.length; j++) {
          var temp = arr[j]

          if (temp.includes("jpg")) {
            console.log(urlConcatJPG)
            divArr.push(
              <div class="column is-one-third">
                      <div class="card small">
                          <div class="card-image">
                              <figure class="image">
                                  <img src={arr[j]} alt="Image" />
                              </figure>
                          </div>
                        </div>
                  </div>
                )
          }
          else{
            var urlConcatJPG = temp + ".jpg"
            console.log(urlConcatJPG)
            divArr.push(
              <div class="column is-one-third">
                      <div class="card small">
                          <div class="card-image">
                              <figure class="image">
                                  <img src={urlConcatJPG} alt="Image" />
                              </figure>
                          </div>
                        </div>
                  </div>
                )
          }
          console.log(arr[j])
        }
      }


      return <div class="row columns is-multiline wrapper">{divArr}</div>
  }

  render(
  ){
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
