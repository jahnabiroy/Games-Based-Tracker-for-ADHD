import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/login';
import Navbar from './Navbar';
import Reg from './Reg/reg';
import Profile from './Profile/profile';
import TicTacToe from './Training/Tictactoe';
import EightQueensGame from './Training/EigthQueen';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element = {<Landing/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/register" element = {<Reg/>}/>
          <Route path='/profile' element = {<Profile />}/>
          <Route path='tictactoe' element = {<TicTacToe />} />
          <Route path='eightQueen' element = {<EightQueensGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
