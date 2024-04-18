import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/login';
import Navbar from './Navbar';
import Reg from './Reg/reg';
import Profile from './Profile/profile';
import EightQueensGame from './Training/EigthQueen';
import MemoryGame from './Training/memorygame';
// import Jigsaw from './Training/jigsaw';
import TowerOfHanoi from './Training/hanoi';
import Game from './Training/15puzzle/Game';
import NumberPuzzle from './Training/arrange';
import Training from './Training/training';
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
          <Route path='eightQueen' element = {<EightQueensGame />} />
          {/* <Route path='jigsaw' element = {<Jigsaw/>} /> */}
          <Route path='memorygame' element = {<MemoryGame/>} />
          <Route path='hanoi' element = {<TowerOfHanoi/>} />
          <Route path='/game' element = {<Game />} />
          <Route path='/numberpuzzle' element = {<NumberPuzzle />} />
          <Route path='/training' element = {<Training />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
