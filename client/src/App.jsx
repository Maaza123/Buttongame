import React from 'react';
import Myform from './givename.jsx';
import './App.css';
import Gamewindow from './gamewindow';



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
