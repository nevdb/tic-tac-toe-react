import Player from './components/Player';
import Review from './components/Review';
import './App.css';
import { useState } from "react";
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './components/winning-combinantion';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};


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

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;

}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highligh-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        GAME BOARD
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
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
    </main >
  );
}

export default App;
