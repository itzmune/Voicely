import React, { useState, useRef } from 'react';
import axios from 'axios';

const VoiceRecorder = ({ userId, onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [text, setText] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        audioChunksRef.current = [];
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const analyzeSpeech = async () => {
    if (!audioBlob || !text) return;
    
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('text', text);
    formData.append('user_id', userId);
    
    try {
      const response = await axios.post('http://localhost:5000/api/analyze', formData);
      onAnalysisComplete(response.data);
    } catch (error) {
      console.error('Error analyzing speech:', error);
    }
  };

  return (
    <div className="voice-recorder">
      <h3>Speech Recording</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter the text you're speaking..."
        rows={3}
      />
      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
        {audioBlob && (
          <>
            <audio controls src={URL.createObjectURL(audioBlob)} />
            <button onClick={analyzeSpeech}>Analyze Speech</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;