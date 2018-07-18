import React, { Component } from 'react';
import '../NoteForm/NoteForm.css';

class UserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newUsersName: '',
            newUsersPass: ''
        };
        this.handleNewUsersName = this.handleNewUsersName.bind(this);
        this.handleNewUsersPass = this.handleNewUsersPass.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    handleNewUsersName(e){
        this.setState({
            newUsersName: e.target.value
        })
    }
    handleNewUsersPass(e){
        this.setState({
            newUsersPass: e.target.value
        })
    }
    checkUser(){
        this.props.isLogIn(this.state.newUsersName+this.state.newUsersPass);

        this.setState({
            newUsersName: '',
            newUsersPass: ''
        })
    }
    addNewUser(){

        this.props.addUser(this.state.newUsersName,this.state.newUsersPass);

        this.setState({
            newUsersName: '',
            newUsersPass: ''
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="userInput" placeholder="user name"
                value={this.state.newUsersName} onChange={this.handleNewUsersName} />

                <input className="userInput" placeholder="password"
                value={this.state.newUsersPass} onChange={this.handleNewUsersPass} />

                <button className="noteButton" onClick={this.checkUser}>Log in</button> or 
                <button className="noteButton" onClick={this.addNewUser}>Add User</button>
            </div>
        )
    }
}

export default UserForm;