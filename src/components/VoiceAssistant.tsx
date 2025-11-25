import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Bot,
  Loader2,
  Globe,
  AlertTriangle,
} from "lucide-react";

// --- CONFIGURATION ---
const USE_AI = true;
// NOTE: Use a low-latency model for voice assistants like gemini-flash
const AI_MODEL = "gemini-pro"; // Keep 'gemini-pro' as a stable default if flash endpoint is complex.
// The base endpoint for the Google GenAI API (using generateText for simplicity here, but a custom streaming solution is ideal)
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";

/**
 * 💡 Simulates a streaming AI call for better perceived performance.
 */
async function callAIModel(
  text: string,
  lang = "en-IN",
  onChunk: (chunk: string) => void,
  onEnd: (fullText: string | null) => void
) {
  try {
    if (!USE_AI) {
        onEnd(null);
        return null;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables.");
    }

    // Map user query to the language prompt for the model
    const promptMap: any = {
      "hi-IN": `Respond concisely in Hindi: ${text}`,
      "mr-IN": `Respond concisely in Marathi: ${text}`,
      "kn-IN": `Respond concisely in Kannada: ${text}`,
      "en-IN": text,
    };

    const res = await fetch(
      `${API_BASE_URL}/${AI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: promptMap[lang] || text }] }],
          config: {
            // Set a low max output to keep response time fast
            maxOutputTokens: 150, 
          }
        }),
      }
    );

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`AI API Error: ${res.status} - ${errorData.error.message || 'Unknown error'}`);
    }

    const data = await res.json();
    const fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || null;

    if (fullText) {
        // Simulate streaming (For true streaming, this logic would process the response stream)
        const words = fullText.split(/\s+/);
        let currentText = "";
        for (const word of words) {
            currentText += word + " ";
            onChunk(currentText.trim());
            // Small pause to simulate real-time streaming effect
            await new Promise(resolve => setTimeout(resolve, 30)); 
        }
    }
    
    onEnd(fullText);
    return fullText;

  } catch (err) {
    console.error("Error in callAIModel:", err);
    onEnd(null); // End the process on failure
    throw err; // Re-throw to be caught by the caller
  }
}

// ----------------------------------------------------
// SMART LOCAL RESPONSES (WEATHER, MARKET, DISEASE, ETC)
// ----------------------------------------------------
function getLocalSmartResponse(text: string, lang: string) {
  const lower = text.toLowerCase();

  // WEATHER - Highly optimized for speed
  if (
    /\bweather\b|\brain\b|\bforecast\b/.test(lower) ||
    /(बारिश|मौसम|हवामान|पाऊस|ಮಳೆ|ಹವಾಮಾನ)/.test(text)
  ) {
    // Data for Vasai-Virar/Palghar area (Nov 25, 2025)
    return {
      "hi-IN": "आज मुम्बई में: आसमान में धूप रहेगी, अधिकतम तापमान 31 डिग्री सेल्सियस तथा न्यूनतम तापमान 23 डिग्री सेल्सियस के आसपास रहेगा।",
      "mr-IN": "आज मुंबईत: आकाश सूर्यप्रकाशित असेल, कमाल तापमान सुमारे ३१ अंश सेल्सिअस आणि किमान तापमान सुमारे २३ अंश सेल्सिअस राहील.",
      "kn-IN": "ಇಂದು ಮುಂಬೈನಲ್ಲಿ: ಬಿಸಿಲಿನ ಆಕಾಶ, ಗರಿಷ್ಠ ತಾಪಮಾನ ಸುಮಾರು 31 °C ಮತ್ತು ಕನಿಷ್ಠ ತಾಪಮಾನ ಸುಮಾರು 23 °C.",
      "en-IN": "Today in Mumbai: Sunny skies with a high around 31 °C and low near 23 °C.",
    }[lang];
  }

  // MARKET RATES
  if (
    /\bprice\b|\bmarket\b|\brate\b/.test(lower) ||
    /(भाव|किंमत|दर|मार्केट|ಕಿಮ್ಮತ್ತು)/.test(text)
  ) {
    // Data based on Mumbai APMC (Navi Mumbai) rates (Nov 25, 2025)
    if (/tomato|टमाटर|टोमॅटो|ಟೊಮೆಟೊ/.test(text)) {
      return {
        "hi-IN": "आज टमाटर का रेट (मुंबई APMC) ₹48/kg है।",
        "mr-IN": "आज टोमॅटोची किंमत (मुंबई APMC) ₹48/kg आहे.",
        "kn-IN": "ಇಂದು ಟೊಮೇಟೊ ಬೆಲೆ (ಮುಂಬೈ APMC) ₹೪೮ ಕಿಲೋಗೆ.",
        "en-IN": "Today's tomato price (Mumbai APMC) is ₹48 per kg.",
      }[lang];
    }
    if (/onion|प्याज|कांदा|ಈರುಳ್ಳಿ/.test(text)) {
      return {
        "hi-IN": "आज प्याज का रेट (मुंबई APMC) ₹28/kg है।",
        "mr-IN": "आज कांद्याची किंमत (मुंबई APMC) ₹28/kg आहे.",
        "kn-IN": "ಇಂದು ಈರುಳ್ಳಿ ಬೆಲೆ (ಮುಂಬೈ APMC) ₹೨೮ ಕಿಲೋಗೆ.",
        "en-IN": "Today's onion price (Mumbai APMC) is ₹28 per kg.",
      }[lang];
    }
    return {
      "hi-IN": "कौन सा रेट चाहिए? उदाहरण: टमाटर का रेट या प्याज का रेट",
      "mr-IN": "कुठला भाव पाहिजे? उदाहरण: टोमॅटोचा भाव किंवा कांद्याचा भाव",
      "kn-IN": "ಯಾವ ಬೆಲೆ ಬೇಕು? ಉದಾಹರಣೆಗೆ: ಟೊಮೇಟೊ ಬೆಲೆ",
      "en-IN": "Which price do you want? E.g., tomato or onion price.",
    }[lang];
  }

  // DISEASE / PEST
  if (
    /disease|yellow|spots|infection|pest|थ्रिप्स|रोग|पान|पिवळे|डाग|ರೋಗ|ಹಳದಿ/.test(text)
  ) {
    return {
      "hi-IN": "यह पत्तों पर थ्रिप्स (Thrips) जैसा दिख रहा है, जो महाराष्ट्र की फसलों में आम है। रोकथाम के लिए नीम तेल और लहसुन का घोल छिड़काव करें।",
      "mr-IN": "हे थ्रिप्स (Thrips) रोगाचे लक्षण आहे, जो महाराष्ट्रातील पिकांसाठी सामान्य आहे. नियंत्रणासाठी निम तेल आणि लसणाचे द्रावण फवारणी करा.",
      "kn-IN": "ಇದು ಥ್ರಿಪ್ಸ್ (Thrips) ರೋಗಲಕ್ಷಣಗಳಂತೆ ಕಾಣುತ್ತದೆ, ಇದು ಮಹಾರಾಷ್ಟ್ರದ ಬೆಳೆಗಳಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿದೆ. ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಬೇವಿನ ಎಣ್ಣೆ ಮತ್ತು ಬೆಳ್ಳುಳ್ಳಿ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.",
      "en-IN": "These look like Thrips symptoms, common in Maharashtra crops. Spray Neem oil and garlic solution for control.",
    }[lang];
  }

  return null;
}

// -----------------------------------
// MAIN COMPONENT
// -----------------------------------
export const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("en-IN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>(""); // NEW: Store the final transcript outside of state

  // SPEECH RECOGNITION
  useEffect(() => {
    if (!isListening) return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition is not supported by this browser.");
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    setError(null);
    setResponse("");
    setTranscript("");
    finalTranscriptRef.current = ""; // Reset final transcript

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (e: any) => {
      let liveTranscript = "";
      let finalTranscript = "";
      
      for (let i = 0; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        liveTranscript += t;
        
        // Capture the most confident, final result
        if (e.results[i].isFinal) {
            finalTranscript += t;
        }
      }
      
      setTranscript(liveTranscript);
      // Store the final transcript immediately
      finalTranscriptRef.current = finalTranscript || liveTranscript;
    };

    recognition.onerror = (e: any) => {
        setIsListening(false);
        setError(`Recognition Error: ${e.error}`);
    }

    recognition.onend = () => {
      setIsListening(false);
      const definitiveTranscript = finalTranscriptRef.current;
      
      // FIX: Use the definitive transcript reference, not the state
      if (definitiveTranscript.trim()) {
        handleVoiceCommand(definitiveTranscript);
      }
    };

    recognition.start();
    return () => {
        // Cleanup: Abort if the component unmounts or listening state changes
        if (recognitionRef.current) {
            recognitionRef.current.abort();
        }
    };
  }, [isListening, language]); 

  // SPEAK (Text-to-Speech)
  const speak = (text: string, lang: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    // Always cancel the previous speech before starting a new one
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  // PROCESS COMMAND
  const handleVoiceCommand = async (text: string) => {
    setLoading(true);
    setError(null);
    setResponse(""); // Clear old response

    const local = getLocalSmartResponse(text, language);
    
    if (local) {
      // 1. Instant Local Response (Fastest)
      setResponse(local);
      speak(local, language);
      setLoading(false);
      return;
    }

    // 2. Fallback to AI Model (Slower, but uses streaming simulation for better UX)
    try {
        let finalResponseText: string | null = null;

        await callAIModel(
            text, 
            language,
            // onChunk is called repeatedly as text arrives
            (chunk) => setResponse(chunk),
            // onEnd is called when the AI response is complete or an error occurs
            (fullText) => {
                finalResponseText = fullText;
                setLoading(false);
            }
        );

        // After streaming is complete and loading is false, speak the final response.
        if (finalResponseText) {
             speak(finalResponseText, language);
        }

    } catch (err: any) {
        setLoading(false);
        const fallback = {
            "hi-IN": "माफ करें, एआई मॉडल से कनेक्ट नहीं हो सका।",
            "mr-IN": "क्षमस्व, एआय मॉडेलशी कनेक्ट होऊ शकले नाही.",
            "kn-IN": "ಕ್ಷಮಿಸಿ, AI ಮಾದರಿಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
            "en-IN": "Sorry, I couldn't connect to the AI model. Check your API key and network.",
        }[language];
        
        setError(err.message || fallback);
        setResponse(fallback);
        speak(fallback, language);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border mt-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-4">
        <Bot className="w-7 h-7 text-indigo-600" /> Smart Voice Assistant
      </h2>

      {/* LANGUAGE SELECTOR */}
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5" />
        <select
          className="border p-2 rounded"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            // Stop listening immediately when language changes
            if(isListening && recognitionRef.current) {
                recognitionRef.current.abort();
                setIsListening(false);
            }
          }}
        >
          <option value="en-IN">English</option>
          <option value="hi-IN">Hindi</option>
          <option value="mr-IN">Marathi</option>
          <option value="kn-IN">Kannada</option>
        </select>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => {
            // Cancel any ongoing speech before listening again
            speechSynthesis.cancel();
            setTranscript("");
            setResponse("");
            setError(null);
            setIsListening(!isListening);
          }}
          className={`p-5 rounded-full text-white transition shadow-xl ${
            isListening ? "bg-red-500 animate-pulse" : "bg-green-600"
          }`}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-10 h-10 animate-spin" />
          ) : isListening ? (
            <MicOff className="w-10 h-10" />
          ) : (
            <Mic className="w-10 h-10" />
          )}
        </button>
      </div>

      {/* USER TRANSCRIPT */}
      {(transcript || (isListening && !transcript)) && (
        <div className="bg-gray-50 p-4 rounded mb-4 border">
          <p className="font-semibold">You said:</p>
          <p className="text-gray-700">
            {transcript || (isListening ? "*Listening...*" : "")}
          </p>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 p-4 border border-red-200 rounded mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* ASSISTANT RESPONSE */}
      {response && (
        <div className="bg-green-50 p-4 border border-green-200 rounded">
          <p className="font-semibold">Assistant:</p>
          {loading && response.length > 0 ? (
            <div className="flex items-center gap-2 text-green-700">
                <Loader2 className="w-5 h-5 animate-spin" />
                <p>{response}</p>
            </div>
          ) : (
            <p className="text-green-700">{response}</p>
          )}
        </div>
      )}
    </div>
  );
};