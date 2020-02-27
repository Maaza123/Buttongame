import React from 'react';
import song from './piu.mp3';
import {Howl} from 'howler';

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
      }
    render(){
        return(
        <button id='gamebutton' onClick={() =>this.HandleButtonClick()}>{this.props.PushesLeft}</button>
        )
    }    
}
export default Gamebutton;