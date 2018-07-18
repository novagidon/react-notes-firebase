import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import UserForm from './Users/UserForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.addNote = this.addNote.bind(this)
    this.addUser = this.addUser.bind(this)
    this.isLogIn = this.isLogIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.removeNote = this.removeNote.bind(this)

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes')
    this.userbase = this.app.database().ref().child('users')

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
      users: [],
      logIn: false
    }
  }

 

  componentWillMount(){
    const previousNotes = this.state.notes
    const previousUsers = this.state.users

    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
        noteName: snap.val().noteName,
        noteDate: snap.val().noteDate
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.userbase.on('child_added', snap => {
      previousUsers.push({
        id: snap.key,
        nameAndPass: snap.val().nameAndPass
      })

      this.setState({
        users: previousUsers
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1)
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote(note,title,date){
    this.database.push().set({ noteContent: note, noteName: title, noteDate: date})
  }
  addUser(user,pass){
    this.userbase.push().set({ nameAndPass: user+pass})
  }
  isLogIn(uspass){
    this.state.users.forEach((el=> {
      if (el.nameAndPass===uspass) 
      this.setState({
        logIn: !this.state.logIn
      })
    })) 
  }

  logOut(){
      this.setState({
        logIn: !this.state.logIn
      })
  }

  removeNote(noteId){
   this.state.logIn ? this.database.child(noteId).remove() : alert ("login for delete note!")
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          {this.state.logIn?<button className="noteButton" onClick={this.logOut}>Log out</button>: 
          <UserForm addUser={this.addUser} isLogIn={this.isLogIn}/> }
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Note noteContent={note.noteContent} 
                noteName={note.noteName}
                noteDate={note.noteDate}
                noteId={note.id} 
                key={note.id} 
                removeNote ={this.removeNote}
                logined = {this.state.logIn}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
        {this.state.logIn? <NoteForm addNote={this.addNote} /> : "Log In for whrite new note"}
        </div>
      </div>
    );
  }
}

export default App;
