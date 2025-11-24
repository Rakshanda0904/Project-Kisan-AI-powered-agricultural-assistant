import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Bot,
  Loader2,
  Globe,
} from "lucide-react";

// --------------------------
// OPTIONAL: ENABLE LLM REPLIES
// --------------------------
// Add REACT_APP_GEMINI_API_KEY or REACT_APP_OPENAI_KEY in .env
const USE_AI = true;

async function callAIModel(text: string, lang = "en-IN") {
  try {
    if (!USE_AI) return null;

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return null;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=" +
        apiKey,
      {
        method: "POST",
        body: JSON.stringify({
          prompt: {
            text:
              lang === "kn-IN"
                ? `Respond in Kannada: ${text}`
                : text,
          },
        }),
      }
    );

    const data = await res.json();
    return data.candidates?.[0]?.outputText || null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

// ----------------------------
// BASIC RULE-BASED NLP ENGINE
// ----------------------------
function getLocalSmartResponse(text: string, lang: string) {
  const lower = text.toLowerCase();
  const isKn = lang === "kn-IN" || /[ಅ-ಹ]/.test(text);

  // ------------------------
  // 1️⃣ WEATHER INTENT
  // ------------------------
  if (
    /\bweather\b|\brain\b|\bforecast\b|\bclimate\b/.test(lower) ||
    /ಹವಾಮಾನ|ಮಳೆ/.test(text)
  ) {
    return isKn
      ? "ಇಂದು ಮಳೆಯ ಸಾಧ್ಯತೆ ೬೮%. ಗಾಳಿಯ ವೇಗ 14 km/h. ತಾಪಮಾನ ೨೮°C."
      : "Today there is a 68% chance of rain, wind speed is 14 km/h, and the temperature is 28°C.";
  }

  // ------------------------
  // 2️⃣ MARKET PRICE INTENT
  //    (ONLY match if keywords EXACT)
  // ------------------------
  if (
    /\bprice\b|\brate\b|\bmarket\b|\bapmc\b/.test(lower) ||
    /ಬೆಲೆ|ದರ|ಎಪಿಎಮ್‌ಸಿ/.test(text)
  ) {
    if (/\btomato\b|ಟೊಮೇಟೊ/.test(lower)) {
      return isKn
        ? "ಇಂದು ಟೊಮೇಟೊ ಬೆಲೆ ₹೪೫ ಕಿಲೋಗೆ. ೧೨% ಹೆಚ್ಚಾಗಿದೆ."
        : "Today's tomato price is ₹45 per kg. It has increased by 12%.";
    }

    if (/\bonion\b|ಈರುಳ್ಳಿ/.test(lower)) {
      return isKn
        ? "ಈರುಳ್ಳಿ ಬೆಲೆ ಇಂದು ₹೨೬ ಕಿಲೋಗೆ."
        : "Today's onion price is ₹26 per kg.";
    }

    return isKn
      ? "ಯಾವ ಬೆಲೆ ಬೇಕು? ಉದಾ: ಟೊಮೇಟೊ ಬೆಲೆ, ಈರುಳ್ಳಿ ಬೆಲೆ."
      : "Which price do you want? Example: tomato price, onion price.";
  }

  // ------------------------
  // 3️⃣ DISEASE DETECTION
  // ------------------------
  if (
    /\bdisease\b|\bleaf\b|\byellow\b|\bspots\b|\binfection\b/.test(lower) ||
    /ರೋಗ|ಎಲೆ/.test(text)
  ) {
    return isKn
      ? "ಇದು ಎಲೆ ಬ್ಲೈಟ್ ಲಕ್ಷಣಗಳಂತೆ ಕಾಣುತ್ತದೆ. ನೀಂ ಎಣ್ಣೆ ಸಿಂಪಡನೆ ಮಾಡಿ."
      : "These look like Leaf Blight symptoms. Apply neem oil spray.";
  }

  // ------------------------
  // 4️⃣ SCHEMES
  // ------------------------
  if (
    /\bscheme\b|\bsubsidy\b|\bloan\b|\bbenefit\b/.test(lower) ||
    /ಯೋಜನೆ|ಸಬ್ಸಿಡಿ/.test(text)
  ) {
    return isKn
      ? "PM-KISAN: ₹6000 ವಾರ್ಷಿಕ. PMFBY: ಬೆಳೆ ವಿಮೆ ಲಭ್ಯ."
      : "PM-KISAN gives ₹6000 yearly. PMFBY crop insurance is available.";
  }

  // ------------------------
  // ❌ If nothing matched — return null so AI handles it
  // ------------------------
  return null;
}


// ----------------------------
// MAIN COMPONENT
// ----------------------------
export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState("en-IN");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);

  // ------------------------------------
  // START SPEECH RECOGNITION
  // ------------------------------------
  useEffect(() => {
    if (!isListening) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (e: any) => {
      let liveTranscript = "";
      for (let i = 0; i < e.results.length; i++) {
        liveTranscript += e.results[i][0].transcript;
      }
      setTranscript(liveTranscript);
    };

    recognition.onend = async () => {
      setIsListening(false);

      if (transcript.trim().length > 1) {
        handleVoiceCommand(transcript);
      }
    };

    recognition.start();

    return () => recognition.abort();
  }, [isListening]);

  // ------------------------------------
  // TTS SPEAKING ENGINE
  // ------------------------------------
  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language;

    setIsSpeaking(true);
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);

    utter.onend = () => setIsSpeaking(false);
  };

  // ------------------------------------
  // COMMAND PROCESSING PIPELINE
  // ------------------------------------
  const handleVoiceCommand = async (text: string) => {
    setLoading(true);

    // Detect Kannada
    const isKannada = /[ಅ-ಹ]/.test(text);
    if (isKannada) setLanguage("kn-IN");

    // 1️⃣ Try Local NLP first (instant)
    const local = getLocalSmartResponse(text, language);
    if (local) {
      setResponse(local);
      speak(local);
      setLoading(false);
      return;
    }

    // 2️⃣ If UNKNOWN → Call AI model
    const ai = await callAIModel(text, language);
    if (ai) {
      setResponse(ai);
      speak(ai);
      setLoading(false);
      return;
    }

    // 3️⃣ Final fallback
    const fallback =
      language === "kn-IN"
        ? "ಕ್ಷಮಿಸಿ, ಅರ್ಥವಾಗಲಿಲ್ಲ. ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ."
        : "Sorry, I didn't understand that.";
    setResponse(fallback);
    speak(fallback);
    setLoading(false);
  };

  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border mt-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <Bot className="w-7 h-7 text-indigo-600" /> Smart Voice Assistant
      </h2>

      {/* LANGUAGE PICKER */}
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5" />
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-IN">English</option>
          <option value="kn-IN">Kannada</option>
        </select>
      </div>

      {/* RECORD BUTTON */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`p-5 rounded-full text-white transition shadow-xl ${
            isListening ? "bg-red-500 animate-pulse" : "bg-green-600"
          }`}
        >
          {isListening ? (
            <MicOff className="w-10 h-10" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
      </div>

      {/* LIVE TRANSCRIPT */}
      {transcript && (
        <div className="bg-gray-50 p-4 rounded mb-4 border">
          <p className="font-semibold">You said:</p>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex items-center gap-2 text-indigo-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </div>
      )}

      {/* ASSISTANT RESPONSE */}
      {response && !loading && (
        <div className="bg-green-50 p-4 border border-green-200 rounded">
          <p className="font-semibold">Assistant:</p>
          <p className="text-green-700">{response}</p>
        </div>
      )}
    </div>
  );
};
