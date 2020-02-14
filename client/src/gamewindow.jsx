import React from 'react';
import Gamebutton from './gamebutton.jsx';
import socketIOclient from 'socket.io-client';
import OutOfPointsPopup from './outofpointspopup.jsx'
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
            PointsWon : [],
            OutOfPoints : false
        })
        this.ClosePopUp = this.ClosePopUp.bind(this);
        socket
            .on('playerdata', (players) =>{
            this.setState({connectedPlayers : players});
            console.log('players', players);
        })
            .on('pushesLeft', (pushesLeft) =>{
            this.HandlePushesLeft(pushesLeft);
        })
            .on('outofpoints', () => {
                this.OpenPopup();
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
    OpenPopup =() =>{
        this.setState({OutOfPoints : true});
    }
    ClosePopUp(){
        this.setState({OutOfPoints : false});
    }
    componentDidMount(){
        socket.emit('init', document.cookie);
    }          
    render(){
        return (
            <div>

                <div className='HeaderContainer topright BorderLeft'>
                    <p className='Header'>Connected Players</p>
                </div>
                <div className='ListContainer bottomright BorderLeft'>
                    {this.state.connectedPlayers.map((player, index) => (
                        <li className='WindowList'key={index}>{player.player_name} : {player.points}</li>
                    ))}
                </div>
                <div className='HeaderContainer topleft BorderRight'>
                    <p className='Header'>Points Won</p>
                </div>
                <div className='ListContainer bottomleft BorderRight'>                            
                    {this.state.PointsWon.map((player, index) => (
                        <li className='WindowList'key={index}>Player {player.player_name} won {player.pointsWon} points</li>
                    ))}                                                
                </div>                   
                <Gamebutton socket ={socket} {...this.state}/>
                {this.state.OutOfPoints ? <OutOfPointsPopup socket = {socket} ClosePopUp={this.ClosePopUp}/>
                : null}
            </div>
        )
    }   
}
export default GameWindow;