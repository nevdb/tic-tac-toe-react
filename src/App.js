import Player from './components/Player';
import Review from './components/Review';
import './App.css';
import { useState } from "react";

function App() {
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
        <ol id='players'>
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>
        GAME BOARD
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
