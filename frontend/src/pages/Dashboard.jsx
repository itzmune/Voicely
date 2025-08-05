import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressChart from '../components/ProgressChart';

const Dashboard = ({ userId }) => {
  const [exercises, setExercises] = useState([]);
  
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/exercise', {
          params: { user_id: userId }
        });
        setExercises([...exercises, response.data]);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
    
    fetchExercises();
  }, [userId]);
  
  return (
    <div className="dashboard">
      <h2>Your Speech Therapy Dashboard</h2>
      
      <div className="dashboard-content">
        <div className="progress-section">
          <ProgressChart userId={userId} />
        </div>
        
        <div className="recent-exercises">
          <h3>Recent Exercises</h3>
          {exercises.length > 0 ? (
            <ul>
              {exercises.map((ex, index) => (
                <li key={index}>
                  <p>{ex.text}</p>
                  <small>{new Date(ex.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No exercises completed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;