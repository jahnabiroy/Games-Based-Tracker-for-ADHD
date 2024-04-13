import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/login';
import Navbar from './Navbar';
import Reg from './Reg/reg';
import Profile from './Profile/profile';
import TicTacToe from './Training/Tictactoe';
import EightQueensGame from './Training/EigthQueen';
import BetterAim from './Training/betterAim';
import MemoryGame from './Training/memorygame';
import ThreeCupSortingGame from './Training/cup';
import Jigsaw from './Training/jigsaw';
import TowerOfHanoi from './Training/hanoi';
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
          <Route path='betterAim' element = {<BetterAim />} />
          <Route path='jigsaw' element = {<Jigsaw/>} />
          <Route path='memorygame' element = {<MemoryGame/>} />
          <Route path='cupgame' element = {<ThreeCupSortingGame/>} />
          <Route path='hanoi' element = {<TowerOfHanoi/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
