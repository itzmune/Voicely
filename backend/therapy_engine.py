import random
from datetime import datetime

exercises_db = {
    "beginner": [
        {
            "type": "pronunciation",
            "text": "Repeat after me: 'She sells seashells by the seashore.'",
            "target_sounds": ["s", "sh"],
            "id": "ex1"
        },
        {
            "type": "fluency",
            "text": "Read this sentence slowly: 'The quick brown fox jumps over the lazy dog.'",
            "target_metric": "speaking_rate",
            "id": "ex2"
        }
    ],
    "intermediate": [
        {
            "type": "articulation",
            "text": "Say this tongue twister three times fast: 'Peter Piper picked a peck of pickled peppers.'",
            "target_sounds": ["p"],
            "id": "ex3"
        }
    ]
}

def generate_exercise(difficulty="beginner"):
    available = exercises_db.get(difficulty, [])
    if not available:
        available = exercises_db["beginner"]
    
    exercise = random.choice(available)
    exercise["timestamp"] = datetime.now().isoformat()
    return exercise

def evaluate_response(exercise_id, response):
    # Simple evaluation logic
    exercise = None
    for diff in exercises_db.values():
        for ex in diff:
            if ex["id"] == exercise_id:
                exercise = ex
                break
    
    if not exercise:
        return {"score": 0, "feedback": "Exercise not found"}
    
    if exercise["type"] == "pronunciation":
        # Mock pronunciation analysis
        score = random.uniform(0.7, 0.95)
        return {
            "score": score,
            "feedback": f"Good effort! Your pronunciation score: {score:.2f}/1.00"
        }
    elif exercise["type"] == "fluency":
        # Mock fluency analysis
        score = random.uniform(0.6, 0.9)
        return {
            "score": score,
            "feedback": f"Nice work! Your fluency score: {score:.2f}/1.00"
        }
    else:
        return {
            "score": 0.8,
            "feedback": "Good job completing the exercise!"
        }