import React from 'react';

class Myform extends React.Component  {

    constructor(props){
        super(props);
        this.state={
            name : 'give name'
        }
    }
    clearInput = () =>{
        this.setState({name : ''})
    }
    HandleSubmit =(event) => {
        fetch('/makeplayer', {
            method : 'post',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({playername : this.state.name})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.changeAuth(data.auth);
        });
        event.preventDefault();
    }
    HandleChange = (event) =>{
        this.setState({name : event.target.value});
    }
    render(){
        return (

                <form className='Myform' onSubmit={this.HandleSubmit}>
                    <h1 className='nappulaPeli'>NAPPULAPELI</h1>
                    <label for='namefield' style={{visibility: 'hidden'}}>playername</label>
                    <input type='Text' className='textfield' name='namefield' placeholder={this.state.name} onFocus={this.clearInput} onChange={this.HandleChange} />
                    <input type='Button' className='button' onClick={this.HandleSubmit} defaultValue = 'Submit'/>     
                </form> 
                      
        );    
    }
} 
    

export default Myform;