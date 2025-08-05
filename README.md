# 🎙️ Voicely

**Voicely** is an AI-powered voice interface platform that allows users to convert **speech to text** and **text to speech** with high accuracy and natural-sounding results. Designed for accessibility, productivity, and content creation, Voicely brings seamless voice interaction to the web.

---

## 🚀 Features

- 🎤 **Speech-to-Text (STT)** using advanced models like OpenAI Whisper
- 🗣️ **Text-to-Speech (TTS)** powered by realistic voices (e.g., ElevenLabs, Google, Azure)
- 🌍 Multi-language support
- ⏱️ Real-time and file-based transcription
- 🎚️ Adjustable voice speed, pitch, and style
- 🧠 Optional AI enhancements: speaker diarization, noise filtering
- 📱 Responsive UI for desktop and mobile devices

---

## 📦 Tech Stack

| Layer       | Technology Used         |
|-------------|--------------------------|
| Frontend    | React / Next.js, Tailwind CSS |
| Backend     | Python, Flask / FastAPI |
| TTS/STT     | OpenAI Whisper, ElevenLabs, Google Cloud TTS |
| Database    | MongoDB / PostgreSQL (optional) |
| Cloud       | AWS S3 / Firebase Storage |
| Deployment  | Vercel / Heroku / Docker |

---

## 🛠️ Installation

### ✅ Prerequisites

- Python 3.8+
- Node.js + npm
- FFmpeg (for audio processing)
- Virtual environment (recommended)
- API keys (for Whisper, ElevenLabs, etc.)

### 🔧 Backend Setup

```bash
# Clone the repo
git clone https://github.com/your-username/voicely.git
cd voicely/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt


🔊 Text to Speech (TTS)
Enter or paste your text

Choose language and voice

Click Generate

Preview or download the audio file

🎤 Speech to Text (STT)
Upload audio or record live

Choose language

Click Transcribe

View or copy the generated text



# Run server
python app.py
