import React from 'react';
import Myform from './givename.jsx';
import './App.css';
import song from './manlet.mp3';
import {Howl, Howler} from 'howler';
import Gamewindow from './gamewindow';
const src = song;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      apiResponse: '',
      auth : false};
    this.changeAuth = this.changeAuth.bind(this);
  }
  callAPI =() => {
    fetch('/auth' , {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      this.setState({auth: data.auth});
    });
  }
  playSong =() => {
    const sound = new Howl({
      src: [src],
      autoplay: true,
      loop: true,
      volume: (0.25)
    });
    sound.play();
  }
  changeAuth = (value) => {
    this.setState({auth : value});
  }
  componentDidMount(){
    this.callAPI();
  } 
  render(){
    if(this.state.auth){
      return(
        <div className='App'>
          <Gamewindow />
          {this.playSong()}
          <p>state: {this.state.apiResponse}</p>
        </div>
      )
    }else{
      return (
        <div className='App'>
          <Myform changeAuth = {this.changeAuth}/>
          <p>state: {this.state.apiResponse}</p>
        </div>
      );
    }
  }  
}
export default App
