
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";


const API = "http://localhost:5000";
const languages = ["English", "Spanish", "French", "Hindi", "Bengali", "German", "Japanese"];

const MainPage = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [definitions, setDefinitions] = useState({});
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(",")[1];
        const res = await axios.post(`${API}/transcribe`, { audio: base64Audio });
        setText(res.data.transcription || "");
      };
      reader.readAsDataURL(audioBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranslate = async () => {
    if (!text.trim()) return alert("Please enter some text!");

    setIsLoading(true);
    setTranslation("");
    setDefinitions({});
    try {
      const res = await axios.post(`${API}/translate`, {
        text,
        source_lang: sourceLang,
        target_lang: targetLang,
      });
      setTranslation(res.data.translation || "");

      const words = text.split(/\s+/);
      const defRes = await axios.post(`${API}/define`, {
        terms: words,
        source_lang: sourceLang,
        target_lang: targetLang,
      });
      setDefinitions(defRes.data.definitions || {});
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-[#1D1E2C] dark:text-[#F7EBEC] transition duration-300">
      {/* Top Navbar */}
      <nav className="w-full bg-[#DBBDD5] dark:bg-[#59656F] px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          
          <div className="w-8 h-8 rounded-full bg-[#F7EBEC] dark:bg-[#1D1E2C] flex items-center justify-center">
          <img
            src="/favicon.png"
            alt="VoxMedi Logo"
            className="w-7 h-7 object-contain"
          />
          </div>
          <h1 className="text-xl font-bold">VoxMedi</h1>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="bg-[#F7EBEC] dark:bg-[#1D1E2C] text-[#1D1E2C] dark:text-[#F7EBEC] px-4 py-1 rounded-full text-sm shadow"
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>

    

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Healthcare Translation App</h2>

        {/* Recorder */}
        <div className="flex justify-center mb-6">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="bg-[#DBBDD5] dark:bg-[#59656F] text-[#1D1E2C] dark:text-[#F7EBEC] font-medium px-6 py-2 rounded-full"
            >
              🎙️ Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white font-medium px-6 py-2 rounded-full"
            >
              🛑 Stop Recording
            </button>
          )}
        </div>

        {/* Input Box */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border rounded-lg bg-white dark:bg-[#59656F] dark:text-white mb-6"
          rows={3}
          placeholder="Type or record your text..."
        />

        {/* Language Select */}
        <div className="flex gap-4 mb-6 flex-col sm:flex-row">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="flex-1 p-2 rounded border bg-white dark:bg-[#1D1E2C] dark:text-[#F7EBEC]"
          >
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="flex-1 p-2 rounded border bg-white dark:bg-[#1D1E2C] dark:text-[#F7EBEC]"
          >
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          className="w-full bg-[#59656F] dark:bg-[#DBBDD5] text-white dark:text-[#1D1E2C] font-semibold py-3 rounded-lg hover:opacity-90 transition"
        >
          🔁 Translate & Define
        </button>

        {/* Loader */}
        {isLoading && <Loader />}

        {/* Results */}
        {!isLoading && translation && (
          <div className="mt-8 p-6 bg-white dark:bg-[#59656F] rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Translated Text:</h3>
            <p className="mb-6">{translation}</p>

            <h3 className="text-xl font-bold mb-4">Definitions:</h3>
            <ul className="space-y-4">
              {Object.entries(definitions).map(([term, def]) => (
                <li key={term} className="border-t pt-3">
                  <strong className="capitalize">{term}</strong>
                  <p><b>Original:</b> {def.source}</p>
                  <p><b>Translated:</b> {def.target}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
