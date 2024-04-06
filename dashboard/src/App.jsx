import { useState } from 'react'
import React from 'react'
import {Component} from "react"
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,   
}   
from 'react-router-dom';
import Navbar from './navbar'
import Landing from './home/home'
import Game from './game';

class App extends Component {
  render() {
    return (
      <Router>
        <div><Navbar /></div>
        <Routes>
          <Route path='/' element={<Landing />}></Route>  
          <Route path='/game' element={<Game />}></Route>  
        </Routes>
      </Router>
    );
  }
}

export default App;

