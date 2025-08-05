import librosa
import numpy as np
from datetime import datetime

def analyze_speech(audio_path, target_text=""):
    # Load audio file
    y, sr = librosa.load(audio_path, sr=None)
    
    # Basic speech analysis
    duration = librosa.get_duration(y=y, sr=sr)
    
    # Pitch analysis
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    pitch_mean = np.mean(pitches[pitches > 0])
    
    # Speaking rate (words per minute)
    words = len(target_text.split())
    wpm = (words / duration) * 60 if duration > 0 else 0
    
    # Voice activity detection
    energy = librosa.feature.rms(y=y)
    frames = len(energy[0])
    voice_frames = sum(1 for e in energy[0] if e > 0.01)
    voice_activity = (voice_frames / frames) * 100 if frames > 0 else 0
    
    # Fluency - pauses per minute
    pauses = sum(1 for e in energy[0] if e <= 0.01)
    pauses_per_minute = (pauses / duration) * 60 if duration > 0 else 0
    
    return {
        "timestamp": datetime.now().isoformat(),
        "duration": duration,
        "pitch": {
            "mean": float(pitch_mean),
            "stability": float(np.std(pitches[pitches > 0]) if len(pitches[pitches > 0]) > 0 else 0)
        },
        "speaking_rate": wpm,
        "voice_activity": voice_activity,
        "fluency": {
            "pauses_per_minute": pauses_per_minute,
            "articulation_rate": wpm / (duration / 60) if duration > 0 else 0
        },
        "clarity": 0.8  # Placeholder for pronunciation analysis
    }