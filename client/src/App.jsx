import React from 'react';
import Myform from './givename.jsx';
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {apiResponse: ''};
  }

  callAPI() {
    fetch('http://localhost:5000')
    .then(response => response.json())
    .then(data => {
      this.setState({apiResponse: data.homma})
    });
  }

  componentWillMount() {
    this.callAPI();
  }
  render(){
    return (
      <div className='App'>
        <p>state: {this.state.apiResponse}</p>
      </div>
    );
  }
  
}

export default App
