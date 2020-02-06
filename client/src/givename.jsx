import React from 'react';

class Myform extends React.Component  {

    constructor(props){
        super(props);
        this.state={
            value : 'give name'
        }
    }
    handleClick = () =>{
        this.setState({value : ''})
    }
    changeInput = (event) =>{
        this.setState({value : event.target.value});
    }
    render(){
        return (

                <form className='Myform'>
                    <h1 className='nappulaPeli'>NAPPULAPELI</h1>
                    <input type='Text' className='textfield' value={this.state.value} onFocus={this.handleClick} onInput={this.changeInput} />
                    <input type='Button' className='button' value = 'Submit' />     
                </form> 
                      
        );    
    }
    
    } 
    

export default Myform;