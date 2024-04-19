import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './Landing/landing';
import Login from './Login/login';
import Navbar from './Navbar';
import Reg from './Reg/reg';
import Profile from './Profile/profile';
import EightQueensGame from './Training/8Queens/EigthQueen';
import MemoryGame from './Training/MemoryGame/memorygame';
import TowerOfHanoi from './Training/Hanoi/hanoi';
import NumberPuzzle from './Training/NumPuzzle/arrange';
import Training from './Training/training';
import Footer from './Footer';

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
          <Route path='/eightQueen' element = {<EightQueensGame />} />
          <Route path='/memorygame' element = {<MemoryGame/>} />
          <Route path='/hanoi' element = {<TowerOfHanoi/>} />
          <Route path='/numberpuzzle' element = {<NumberPuzzle />} />
          <Route path='/training' element = {<Training />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
