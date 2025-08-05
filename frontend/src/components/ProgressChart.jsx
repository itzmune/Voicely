import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ userId }) => {
  const [progressData, setProgressData] = useState([]);
  
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/progress', {
          params: { user_id: userId }
        });
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };
    
    fetchProgress();
  }, [userId]);
  
  // Transform data for chart
  const chartData = progressData.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    clarity: item.metrics.clarity,
    fluency: item.metrics.fluency.articulation_rate,
    pitch: item.metrics.pitch.mean
  }));
  
  return (
    <div className="progress-chart" style={{ height: '300px' }}>
      <h3>Your Progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clarity" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="fluency" stroke="#82ca9d" />
          <Line type="monotone" dataKey="pitch" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;