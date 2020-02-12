import React from 'react';
import song from './piu.mp3';
import {Howl, Howler} from 'howler';

const src = song;
class Gamebutton extends React.Component{  
    constructor(props){
        super(props);
    }
    HandleButtonClick = () => {
        this.props.socket.emit('buttonclick');
        console.log('lähti');
      }
    render(){
        return(
            <button id='gamebutton' onClick={() =>this.HandleButtonClick()}>LOL</button>
        )
    }    
}
export default Gamebutton;