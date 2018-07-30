import React from 'react'
import axios from 'axios'

export default class MemeCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      response: [],
      memesIsLoaded: false,
      urlsArr: [],
      urls: [],
      html: null,
      gifs: null,
      gifsIsLoaded: true
    }
    this.getSubreddit = this.getSubreddit.bind(this);
    this.createMemeUrlArray = this.createMemeUrlArray.bind(this);
    this.memeCardsLayout = this.memeCardsLayout.bind(this);
    this.onImageError = this.onImageError.bind(this);

    //api call here because state var response is needed in other methods
    this.getSubreddit()

  }
  //called in constructor
  getSubreddit() {
    axios.get('https://www.reddit.com/r/meme/new/.json').then(apiResponse => this.setState({response: apiResponse.data.data.children, memesIsLoaded: true}))
  }

  //needs response object
  componentDidMount() {
    // this.createMemeUrlArray()
    // this.memeCardsLayout()
  }

  //called in render
  createMemeUrlArray() {
    var stateResp = this.state.response
    var arr = []
    for (var i = 0; i < stateResp.length; i++) {
      var temp = stateResp[i].data.url
      console.log(temp)
      arr.push(temp)
    }
    //this.setState({urlsArr: arr})
    return arr
  }

  // memeCardsLayout called in render
  memeCardsLayout(urlArray){
    //param urlArray is the array of image urls
    //check image urls beforehand

    console.log("state var 'memesIsLoaded ' " + this.state.memesIsLoaded)

    //arra
    let divArr = []
    if (this.state.memesIsLoaded) {
      console.log("memes is loaded")

    }
    for (let i = 0; i < urlArray.length; i++) {

      var itemUrl = urlArray[i]

      var validateBool1 = itemUrl.includes(".jpg") ;
      var validateBool2 = itemUrl.includes(".jpeg");
      var validateBool3 = itemUrl.includes(".png");
      var validateBool4 = itemUrl.includes(".gif");
      var validateBools = validateBool1 || validateBool2 || validateBool3 || validateBool4

      console.log("does this " + itemUrl + " contain jpg " + validateBool1)
      console.log("does this " + itemUrl + " contain jpeg " + validateBool2)
      console.log("does this " + itemUrl + " contain png " + validateBool3)
      console.log("does this " + itemUrl + " contain gif " + validateBool4)
      console.log("validate bools piped - LOGICAL OR " +  itemUrl + " " + validateBools)


      if(validateBools){
        //if the url contains either jpg,jpeg,png,gif then push this div
        divArr.push(
          <div class="column is-one-third">
            <div class="card large wrapper">
              <div class="card-image">
                <figure class="image">
                  <img src={itemUrl} alt="Image"/>
                </figure>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Save</a>
                <a href="#" class="card-footer-item">Share</a>
                <a href="#" class="card-footer-item">
                  Something else
                </a>
              </footer>
            </div>
          </div>
        )
      }
      else {
        //modify the url to have a .png ending
        var correctedItemUrl = itemUrl + ".png"
        divArr.push(
          <div class="column is-one-third">
            <div class="card large wrapper">
              <div class="card-image">
                <figure class="image">
                  <img src={correctedItemUrl} alt="Image" onError={this.onImageError(correctedItemUrl)}/>
                </figure>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item">Save</a>
                <a href="#" class="card-footer-item">Share</a>
                <a href="#" class="card-footer-item">
                  Something else
                </a>
              </footer>
            </div>
          </div>
        )
      }
    }
    //this.setState({html: divArr})
    console.log(divArr)
    return divArr
  }


  getGifs() {
    //get gifs
    var gifDivs = axios.get('https://www.reddit.com/r/meme/new/.json').then(apiResponse => this.setState({gifs: apiResponse, gifsIsLoaded: true}))
  }

  onImageError(url){
    console.log("on Error")

    return "error"
  }



  render()
  {
    //get response obj from state
    var responseObj = this.state.response

    //get meme urls from resopnse object
    var urlArr = this.createMemeUrlArray()

    console.log(urlArr)
    console.log(responseObj)

    //return memeCard layout to render
    var memeCardDivLayout = this.memeCardsLayout(urlArr)

    return (
      <div className="row columns is-multiline wrapper">
        {memeCardDivLayout}
      </div>
    )
  }
}
