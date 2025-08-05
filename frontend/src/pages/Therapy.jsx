import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Exercise from '../components/Exercise';

const Therapy = ({ userId }) => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [difficulty, setDifficulty] = useState('beginner');
  const [completedExercises, setCompletedExercises] = useState([]);
  
  const getNewExercise = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/exercise', {
        params: { user_id: userId, difficulty }
      });
      setCurrentExercise(response.data);
    } catch (error) {
      console.error('Error fetching exercise:', error);
    }
  };
  
  const handleExerciseComplete = (evaluation) => {
    setCompletedExercises([...completedExercises, {
      exercise: currentExercise,
      evaluation
    }]);
    getNewExercise();
  };
  
  useEffect(() => {
    getNewExercise();
  }, [difficulty]);
  
  return (
    <div className="therapy">
      <h2>Speech Therapy Session</h2>
      
      <div className="difficulty-selector">
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>
        </label>
      </div>
      
      {currentExercise && (
        <Exercise 
          exercise={currentExercise} 
          userId={userId}
          onComplete={handleExerciseComplete}
        />
      )}
      
      <div className="completed-exercises">
        <h3>Completed Exercises</h3>
        {completedExercises.length > 0 ? (
          <ul>
            {completedExercises.map((item, index) => (
              <li key={index}>
                <p>{item.exercise.text}</p>
                <p>Score: {item.evaluation.score.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises completed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Therapy;