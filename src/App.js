import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Route } from 'react-router-dom';
import {SongsList} from './components/song/SongsList'
import SongDisplay from './components/song/SongDisplay'
import SongEdit from './components/song/SongEdit'
import BookDisplay from './components/book/BookDisplay'
import {BookEdit} from './components/book/BookEdit'
import {BookPrinter} from './components/printer/BookPrinter'
import {PrinterList} from './components/printer/PrinterList'
import {BookPrinterPage} from './components/printer/BookPrinterPage'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import LoginModal from "./components/LoginModal";

import NewBookModal from './components/NewBookModal'
import SideNav from './components/SideNav'
import './App.css';

import AuthService from './AuthService'
const authService = new AuthService();

class App extends Component {  
  
  constructor(props){
    super(props);

    this.state = {
      showLogin: false,
      userLoggedIn: false,
      showNewBook: false,
    }

    this.toggleLogin = this.toggleLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleShowNewBook = this.toggleShowNewBook.bind(this);
  


    document.title = "Song Book"
  }

  componentDidMount() {
    //Attempt login
    authService.relogin().then( res => {
      if(res) this.setState({userLoggedIn:true})
    })
  }

  toggleShowNewBook() {
    this.setState({
      showNewBook: !this.state.showNewBook
    })
  }

  toggleLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  handleLogin(username, password){
    authService.login(username, password).then( r => {
      this.setState({
        showLogin: false,
        userLoggedIn: true
      })
      this.setState({

      })
    }).catch(e => {
      alert("Error logging in")
      console.log("Error logging in")
    })

  }
  handleLogout(){
    authService.logout();
    this.setState({
      userLoggedIn: false,
      showLogin: false,
    })
    alert('User Logged Out');

  }
  render() {

    return (
      <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
      <div className="main" onScroll={()=>{console.log("scroll")}}>
      
        <SideNav 
          toggleLogin={this.toggleLogin} 
          handleLogout={this.handleLogout} 
          userLoggedIn={this.state.userLoggedIn} 
          newBook={this.toggleShowNewBook}/>
        <div className="app" >
          <h1 className="title"><Link to="/">Song Book</Link></h1>

          <div className="content">
            <Switch>
            <Route exact path="/song/:id/edit" component={SongEdit} />
            <Route exact path="/book/:id/edit"  component={BookEdit} />
            <Route exact path="/add/song"  component={SongEdit} />
            <Route exact path="/printer/:id"  component={BookPrinter} />
            <Route exact path="/printer/"  render={(props) => <PrinterList {...props} userLoggedIn={this.state.userLoggedIn} />} />
            <Route exact path="/print/:id"  component={BookPrinterPage} />
            <Route exact path="/song/:id"  render={(props) => <SongDisplay {...props} userLoggedIn={this.state.userLoggedIn} />} />
            <Route exact path="/book/:id" render={(props) => <BookDisplay {...props} userLoggedIn={this.state.userLoggedIn} />} />
            <Route exact path="/"  render={(props) => <SongsList {...props} mode={'SONG_LIST'} />} /> 
            </Switch>
          </div>
        </div>
      </div>
    
      <LoginModal show={this.state.showLogin}
          handleLogin={this.handleLogin}
        />
      <NewBookModal show={this.state.showNewBook} toggleShow={this.toggleShowNewBook}/> 
      </BrowserRouter>
      </DndProvider>
    )
  }
}




export default App;