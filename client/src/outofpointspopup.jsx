import React from 'react';

class OutOfPointsPopup extends React.Component{
    constructor(props){
        super(props)
    }
    
    ResetPoints = () => {
        this.props.socket.emit('resetpoints');
        this.props.ClosePopUp();
    }
    ChangeName = () =>{
        this.props.socket.emit('changeName');
    }
    render(){
        return(
            <div id='OutOfPointsContainer'>
                <p>You are out of points</p>
                <button className='button PopupButton' onClick={this.ResetPoints}>Reset Points</button>
                <button className='button PopupButton' onClick={this.ChangeName}>Change Name</button>
            </div>
        )
    }
}
export default OutOfPointsPopup;