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
import Login from './login/login';
import Training from './training/training';
import Register from './registration/register';
import Footer from './footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div><Navbar /></div>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/training' element={<Training />}></Route>  
          <Route path='/register' element={<Register />}></Route> 
        </Routes>
        <div><Footer /></div>
      </Router>
    );
  }
}

export default App;

