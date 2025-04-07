
# VoxMedi – AI-Powered Healthcare Translation Web App

**Created by Sonali Thakur**

---

## 🩺 Introduction

**VoxMedi** is an intelligent, AI-powered healthcare translation web application that bridges the communication gap between patients and healthcare professionals speaking different languages. In fast-paced medical environments, VoxMedi acts as a real-time language assistant performing speech transcription, multilingual translation, and medical terminology explanation — enhancing understanding and care quality.

The app features a polished UI, mobile responsiveness, dark/light mode toggle, and a custom-designed logo for a user-friendly and branded experience.

---

## 🚨 Problem Statement

Language barriers in healthcare can lead to serious misunderstandings and misdiagnoses. VoxMedi leverages real-time voice transcription, AI-driven translation, and simplified medical explanations to improve clarity in emergency or consultation scenarios — making multilingual communication faster, safer, and more effective.

---

## 🧰 Technology Stack

### 🔹 Frontend
- **React.js** — Component-based UI
- **Vite** — Lightning-fast dev server
- **Tailwind CSS** — Utility-first responsive styling
- **Axios** — API handling with async support

### 🔹 Backend
- **Flask (Python)** — Lightweight API framework
- **OpenAI Whisper API** — Speech-to-text transcription
- **OpenAI ChatGPT API** — Translations & medical definitions
- **ffmpeg + imageio-ffmpeg** — Audio conversion (.mp3 → .wav)
- **Flask-CORS** — Cross-origin API requests

---

## ⚙️ Why These Technologies?

- **React + Tailwind CSS**: Beautiful, fast, and responsive UI with built-in dark mode
- **Flask**: Ideal for AI/ML integration and lightweight REST APIs
- **OpenAI APIs**: Industry-grade performance for transcription and translation
- **ffmpeg**: Robust audio conversion
- **Render**: Simplified full-stack hosting

---

## 🔄 Application Flow

1. **User Input** — Voice is recorded or text is typed
2. **Audio Conversion** — `.mp3` converted to `.wav` using ffmpeg
3. **Transcription** — Whisper transcribes the audio
4. **Translation** — Text is translated via ChatGPT
5. **Definition** — Medical terms are extracted and explained via GPT
6. **Output** — Translated text and definitions displayed with smooth loaders

---

## 🔌 API Routes

### `POST /transcribe`
- Accepts base64-encoded `.mp3` audio
- Converts to `.wav` and transcribes with Whisper
- Returns clean transcribed text

### `POST /translate`
- Accepts raw or transcribed text, source and target language
- Returns translated text via ChatGPT

### `POST /define`
- Accepts list of terms, detects medical keywords
- Returns translated definitions from ChatGPT

All routes are RESTful and support CORS.

---

## 🎨 Frontend Highlights

- **Custom Logo** — Designed by creator using Illustrator/Figma
- **Wellness-Inspired Colors** — Raisin Black, Thistle, Lavender Blush, etc.
- **Responsive Design** — Fully mobile/tablet/desktop-ready
- **Dark/Light Mode** — Tailwind-powered toggle
- **Smooth Loader** — Shows progress during translation

---

## 🧠 Backend Highlights

- **Audio Conversion**: `ffmpeg` + `imageio-ffmpeg` ensures Whisper compatibility
- **Temp File Handling**: Flask safely manages uploaded files
- **ChatGPT Prompting**: Optimized instructions for clarity and relevance

---

## ✅ Conclusion

**VoxMedi** is a complete, production-ready solution showcasing how AI and web tech can solve real-world problems in healthcare. From responsive frontend design to modular Flask APIs and OpenAI integrations, this project reflects the real-world skills expected from a **Junior Python Healthcare AI Developer**.

---

## 📸 Favicon Design

- Created in **Adobe Illustrator & Figma**
- Represents healthcare & AI branding

---

> Deployed via Render | Built by Sonali Thakur
