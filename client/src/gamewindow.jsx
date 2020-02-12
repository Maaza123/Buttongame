import React from 'react';
import Gamebutton from './gamebutton.jsx';
import socketIOclient from 'socket.io-client';

const socket = socketIOclient({
    reconnection: true,
    multiplex: false
});

class GameWindow extends React.Component{  
    constructor(props){
        super(props);
        this.state = ({
            pushesLeft : '',
            connectedPlayers : [],
            pointsWon : []
        })
        socket
            .on('playerdata', (players) =>{
            this.setState({connectedPlayers : players});
            console.log('players');
        })
            .on('pushesLeft', (pushesLeft) =>{
            this.setState({pushesLeft : pushesLeft});
        })
            .on('wonPoints', (pointsWon, player_name) =>{
            console.log('asd')
        });      
    }
    componentDidMount(){
        socket.emit('init', document.cookie);
    }          
    render(){
        return (
            <div>
                <div id='PLayerWindow'>
                    {this.state.connectedPlayers.map((player, index) => (
                        <li key={index}>{player.player_name} : {player.points}</li>
                    ))}
                </div>
                <div id='Pushesleft'>
                    <p>{this.state.pushesLeft}</p>
                </div>                   
                <Gamebutton socket ={socket}/>
            </div>
        )
    }   
}
export default GameWindow;