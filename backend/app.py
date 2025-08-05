from flask import Flask, request, jsonify
from flask_cors import CORS
from speech_analysis import analyze_speech
from therapy_engine import generate_exercise, evaluate_response
import datetime

app = Flask(__name__)
CORS(app)

# Mock database
users = {
    "user1": {
        "progress": [],
        "exercises": []
    }
}

@app.route('/api/analyze', methods=['POST'])
def analyze():
    audio_file = request.files.get('audio')
    text = request.form.get('text', '')
    
    if not audio_file:
        return jsonify({"error": "No audio file provided"}), 400
    
    # Save audio temporarily
    audio_path = f"temp_{datetime.datetime.now().timestamp()}.wav"
    audio_file.save(audio_path)
    
    # Analyze speech
    analysis = analyze_speech(audio_path, text)
    
    # Store progress
    user_id = request.form.get('user_id', 'user1')
    if user_id in users:
        users[user_id]['progress'].append({
            "date": datetime.datetime.now().isoformat(),
            "metrics": analysis
        })
    
    return jsonify(analysis)

@app.route('/api/exercise', methods=['GET'])
def get_exercise():
    user_id = request.args.get('user_id', 'user1')
    difficulty = request.args.get('difficulty', 'beginner')
    
    exercise = generate_exercise(difficulty)
    
    if user_id in users:
        users[user_id]['exercises'].append({
            "date": datetime.datetime.now().isoformat(),
            "exercise": exercise,
            "completed": False
        })
    
    return jsonify(exercise)

@app.route('/api/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    user_id = data.get('user_id', 'user1')
    exercise_id = data.get('exercise_id')
    response = data.get('response')
    
    evaluation = evaluate_response(exercise_id, response)
    
    if user_id in users and exercise_id is not None:
        for ex in users[user_id]['exercises']:
            if ex['id'] == exercise_id:
                ex['completed'] = True
                ex['evaluation'] = evaluation
                break
    
    return jsonify(evaluation)

@app.route('/api/progress', methods=['GET'])
def get_progress():
    user_id = request.args.get('user_id', 'user1')
    
    if user_id in users:
        return jsonify(users[user_id]['progress'])
    
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)