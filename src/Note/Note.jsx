import React, { Component } from 'react';
import './Note.css';
import PropTypes from 'prop-types';

class Note extends Component{

    constructor(props){
        super(props)
        this.noteContent = props.noteContent
        this.noteName = props.noteName
        this.noteDate = props.noteDate
        this.noteId = props.noteId
        this.logined = props.logined
        this.handleRemoveNote = this.handleRemoveNote.bind(this)
    }

    handleRemoveNote(id){
        this.props.removeNote(id)
    }

    render(){
        let createDateStr = new Date(this.noteDate)
        let crDt = createDateStr.toUTCString()
        let dateNow = new Date().getTime()
        let difDate = dateNow - createDateStr
        
        return(
            <div className="note fade-in">       
                <span className="closebtn" 
                    onClick={() => this.handleRemoveNote(this.noteId)}>
                    &times;
                </span>
                <p className="noteContent">Title:{ this.noteName }</p><br/>
                <p className="noteContent">Create date:{ crDt }</p><br/>
                <p className="noteContent">Time after create - 
                d:{Math.floor((difDate/(1000*60*60*24)),1)}
                ,h:{Math.floor((difDate/(1000*60*60)),1) - Math.floor((difDate/(1000*60*60*24)),1)*24}
                ,m:{Math.floor((difDate/(1000*60)),1) - Math.floor((difDate/(1000*60*60)),1)*60}
                ,s:{Math.floor((difDate/1000),1) - Math.floor((difDate/(1000*60)),1)*60}</p> <br/>
                <p className="noteContent">Note:{ this.noteContent }</p>
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string,
    noteName: PropTypes.string
}

export default Note;
