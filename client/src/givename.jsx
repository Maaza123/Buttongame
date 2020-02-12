import React from 'react';

class Myform extends React.Component  {

    constructor(props){
        super(props);
        this.state={
            value : 'give name'
        }
    }
    clearInput = () =>{
        this.setState({value : ''})
    }
    sendName =() => {
        fetch('/makeplayer', {
            method : 'post',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({playername : this.state.value})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.changeAuth(data.auth);
        });
    }
    changeInput = (event) =>{
        this.setState({value : event.target.value});
    }
    render(){
        return (

                <form className='Myform'>
                    <h1 className='nappulaPeli'>NAPPULAPELI</h1>
                    <input type='Text' className='textfield' value={this.state.value} onFocus={this.clearInput} onInput={this.changeInput} />
                    <input type='Button' className='button' value = 'Submit' onClick={this.sendName} />     
                </form> 
                      
        );    
    }
} 
    

export default Myform;