import React from 'react';
import Myform from './givename.jsx';
import './App.css';
import song from './manlet.mp3';
import {Howl} from 'howler';
import Gamewindow from './gamewindow';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const src = song;

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      auth : false
    };
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
          <Gamewindow changeAuth = {this.changeAuth}/>
          {this.playSong()}
        </div>
      )
    }else{
      return (
        <div className='App'>
          <Myform changeAuth = {this.changeAuth}/>
        </div>
      );
    }
  }  
}
export default App
