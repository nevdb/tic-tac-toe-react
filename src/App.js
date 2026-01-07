import Player from './components/Player';
import Review from './components/Review';
import './App.css';
import { useState } from "react";
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);


  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = '0';
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ]

      return updatedTurns;
    });
  }

  const [feedback, setFeedback] = useState('My feedback');
  const [studentName, setStudentName] = useState('Student Name');

  function handleAddFeedback(event) {
    setFeedback(event.target.value);
  }

  function handleAddStudentFeedback(event) {
    setStudentName(event.target.value);
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highligh-player'>
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        GAME BOARD
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        <Log turns={gameTurns} />
      </div>

      <div id='feedback-container'>
        <section id="feedback">
          <h2>Please share some feedback</h2>
          <p>
            <label>Your Feedback</label>
            <textarea onChange={handleAddFeedback} value={feedback} />
          </p>
          <p>
            <label>Your Name</label>
            <input type="text" onChange={handleAddStudentFeedback} value={studentName} />
          </p>
        </section>
        <section id="draft">
          <h2>Your feedback</h2>

          <Review feedback={feedback} student={studentName} />

          <p>
            <button>Save</button>
          </p>
        </section>
      </div>
    </main>
  );
}

export default App;
