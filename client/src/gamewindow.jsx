import React from 'react';
import Gamebutton from './gamebutton.jsx';
import socketIOclient from 'socket.io-client';
import './gamewindow.css';

const socket = socketIOclient({
    reconnection: true,
    multiplex: false
});

class GameWindow extends React.Component{  
    constructor(props){
        super(props);
        this.state = ({
            pushesLeft : '?',
            connectedPlayers : [],
            PointsWon : []
        })
        socket
            .on('playerdata', (players) =>{
            this.setState({connectedPlayers : players});
            console.log('players');
        })
            .on('pushesLeft', (pushesLeft) =>{
            this.HandlePushesLeft(pushesLeft);
        })
            .on('wonPoints', (PointsWon) =>{
                this.HandlePointsWon(PointsWon);
        });
    }
    
    HandlePointsWon(PointsWon){
            this.setState({
                PointsWon : PointsWon
            }); 
    }
    HandlePushesLeft(pushesLeft){
        this.setState({pushesLeft : pushesLeft});    
    }
    componentDidMount(){
        socket.emit('init', document.cookie);
    }          
    render(){
        return (
            <div>
                <div className='HeaderContainer topright'>
                    <p>Connected Players</p>
                </div>
                <div className='ListContainer bottomright'>
                {this.state.connectedPlayers.map((player, index) => (
                    <li className='WindowList'key={index}>{player.player_name} : {player.points}</li>
                ))}
                </div>                
                    <div className='HeadContainer topleft'>
                        <p>Points Won</p>
                    </div>                            
                <div className='ListContainer bottomleft'>
                        {this.state.PointsWon.map((player, index) => (
                        <li className='WindowList'key={index}>Player {player.player_name} won {player.pointsWon} points</li>
                    ))}                                                
                </div>                   
                <Gamebutton socket ={socket} {...this.state}/>
            </div>
        )
    }   
}
export default GameWindow;