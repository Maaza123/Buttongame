import React from 'react';
import song from './piu.mp3';
import {Howl, Howler} from 'howler';

const src = song;
class Gamebutton extends React.Component{  
    constructor(props){
        super(props);
    }
    HandleButtonClick = () => {
        const sound = new Howl({
            src: [src],
            autoplay: false,
            loop: false,
            volume: (1)
          });
          sound.play();
        this.props.socket.emit('buttonclick');
        console.log('lähti');
      }
    render(){
        return(
        <button id='gamebutton' onClick={() =>this.HandleButtonClick()}>{this.props.pushesLeft}</button>
        )
    }    
}
export default Gamebutton;