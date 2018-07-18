import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            newNoteContent: '',
            newNoteTitle: '',
            newNoteDate: ''
        }

        this.handleNoteInput = this.handleNoteInput.bind(this)
        this.handleTitleInput = this.handleTitleInput.bind(this)
        this.writeNote = this.writeNote.bind(this)
    }

    handleNoteInput(e){
        let date = new Date()
        this.setState({
            newNoteContent: e.target.value,
            newNoteDate: date.getTime()
        })
    }

    handleTitleInput(e){
        this.setState({
            newNoteTitle: e.target.value
        })
    }

    writeNote(){
        this.props.addNote(this.state.newNoteContent,this.state.newNoteTitle,this.state.newNoteDate);
        this.setState({
            newNoteContent: '',
            newNoteTitle: '',
            newNoteDate: ''
        })
    }

    render(){
        
        return(
            <div className="formWrapper">
                <input className="noteInput" placeholder="Write note title"
                value={this.state.newNoteTitle} onChange={this.handleTitleInput} />

                <input className="noteInput" placeholder="Write a new note..."
                value={this.state.newNoteContent} onChange={this.handleNoteInput} />

                <button className="noteButton"
                onClick={this.writeNote}>Add Note</button>
            </div>
        )
    }
}

export default NoteForm;