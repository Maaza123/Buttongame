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
        let NewArray = this.state.PointsWon;
            NewArray.unshift(PointsWon);
            this.setState({
                PointsWon : NewArray
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
                <div id='PLayerContainer'>
                    <div className='HeaderContainer'>
                        <p>Connected Players</p>
                    </div>
                    {this.state.connectedPlayers.map((player, index) => (
                        <li className='WindowList'key={index}>{player.player_name} : {player.points}</li>
                    ))}
                    </div>
                    <div id='PointsWonContainer'>
                        <div className='HeaderContainer'>
                            <p>Points Won</p>
                        </div>                            
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