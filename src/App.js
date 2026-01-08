import Player from './components/Player';
import Review from './components/Review';
import './App.css';
import { useState } from "react";
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './components/winning-combinantion';

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = '0';
  }

  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {


      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
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
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
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
