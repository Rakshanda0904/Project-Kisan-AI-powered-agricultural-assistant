import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceAssistantProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  isListening,
  onToggleListening
}) => {
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState<'en-IN' | 'kn-IN'>('en-IN');

  useEffect(() => {
    if (isListening) {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert('Speech Recognition not supported in this browser.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = language;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const spokenText = event.results[0][0].transcript;
        setTranscript(spokenText);
        handleVoiceCommand(spokenText);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        onToggleListening();
      };

      recognition.onend = () => {
        onToggleListening();
      };

      recognition.start();

      return () => {
        recognition.abort();
      };
    }
  }, [isListening, language]);

  const speakResponse = (text: string, lang: string) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    synth.speak(utterance);
  };

  const handleVoiceCommand = async (command: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    let responseText = '';
    let lang = language;

    // Basic Kannada detection via Kannada Unicode range
    const isKannada = /[ಅ-ಹ]/.test(command) || lang === 'kn-IN';

    if (isKannada) {
      responseText = 'ಮೈಸೂರು APMC ನಲ್ಲಿ ಟೊಮೇಟೊ ಬೆಲೆ ಇಂದು ಕಿಲೋಗೆ ೪೫ ರೂಪಾಯಿ. ಕಳೆದ ವಾರಕ್ಕಿಂತ ೧೨% ಹೆಚ್ಚಾಗಿದೆ. ಮಾರಾಟ ಮಾಡಲು ಒಳ್ಳೆಯ ಸಮಯ.';
      lang = 'kn-IN';
    } else {
      responseText = 'The tomato price in Mysore APMC today is ₹45 per kg. It has increased by 12% from last week. Good time to sell.';
      lang = 'en-IN';
    }

    setResponse(responseText);
    setIsSpeaking(true);
    speakResponse(responseText, lang);

    setTimeout(() => setIsSpeaking(false), 5000);
    onToggleListening();
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Voice Assistant</h2>
        <p className="text-gray-600">Speak in Kannada or English</p>
      </div>

      {/* Language Selector */}
      <div className="text-center mb-4">
        <label className="mr-2 font-medium text-gray-700">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en-IN' | 'kn-IN')}
          className="p-2 border rounded"
        >
          <option value="en-IN">English</option>
          <option value="kn-IN">Kannada</option>
        </select>
      </div>

      {/* Voice Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={onToggleListening}
          className={`p-4 rounded-full transition-all duration-200 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        {response && (
          <button
            onClick={toggleSpeech}
            className={`p-4 rounded-full transition-all duration-200 ${
              isSpeaking
                ? 'bg-blue-500 hover:bg-blue-600 animate-pulse'
                : 'bg-gray-500 hover:bg-gray-600'
            } text-white`}
          >
            {isSpeaking ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
          </button>
        )}
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        {isListening && (
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Listening...</span>
          </div>
        )}
        {isSpeaking && (
          <div className="flex items-center justify-center space-x-2 text-blue-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Speaking...</span>
          </div>
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-gray-800 mb-2">You said:</h3>
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}

      {/* Response */}
      {response && (
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="font-medium text-green-800 mb-2">Assistant:</h3>
          <p className="text-green-700">{response}</p>
        </div>
      )}

      {/* Quick Commands */}
      <div className="mt-6">
        <h3 className="font-medium text-gray-800 mb-3">Quick Commands:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
            <span className="text-sm">"What's the price of onions?"</span>
          </button>
          <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
            <span className="text-sm">"Show me irrigation schemes"</span>
          </button>
          <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
            <span className="text-sm">"Diagnose my crop disease"</span>
          </button>
          <button className="p-3 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors">
            <span className="text-sm">"Weather forecast"</span>
          </button>
        </div>
      </div>
    </div>
  );
};
