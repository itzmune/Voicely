import React, { useState } from 'react';
import axios from 'axios';
import VoiceRecorder from './VoiceRecorder';

const Exercise = ({ exercise, userId, onComplete }) => {
  const [evaluation, setEvaluation] = useState(null);
  
  const handleResponse = async (analysis) => {
    try {
      const response = await axios.post('http://localhost:5000/api/evaluate', {
        user_id: userId,
        exercise_id: exercise.id,
        response: analysis
      });
      setEvaluation(response.data);
      onComplete(response.data);
    } catch (error) {
      console.error('Error evaluating exercise:', error);
    }
  };
  
  return (
    <div className="exercise">
      <h3>{exercise.type} Exercise</h3>
      <p>{exercise.text}</p>
      
      <div className="exercise-content">
        <VoiceRecorder 
          userId={userId} 
          onAnalysisComplete={handleResponse}
        />
      </div>
      
      {evaluation && (
        <div className="evaluation">
          <h4>Feedback</h4>
          <p>Score: {evaluation.score.toFixed(2)}</p>
          <p>{evaluation.feedback}</p>
        </div>
      )}
    </div>
  );
};

export default Exercise;