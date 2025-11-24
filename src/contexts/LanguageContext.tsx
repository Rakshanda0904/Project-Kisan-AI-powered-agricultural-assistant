import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'kn' | 'hi' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    welcome: 'Welcome to Project Kisan',
    subtitle: 'Your AI-powered agricultural assistant',
    // Core Features
    cropDiagnosis: 'Crop Disease Diagnosis',
    marketPrices: 'Market Prices',
    govSchemes: 'Government Schemes',
    voiceAssistant: 'Voice Assistant',
    restaurants: 'Restaurant Connect',
    coldStorage: 'Cold Storage',
    // Advanced AI Features (New Keys)
    aiPredictor: 'AI Market Predictor',
    cropHealthMonitor: 'Crop Health Monitor',
    droneMonitoring: 'Drone Monitoring',
    smartIrrigation: 'Smart Irrigation',
    weatherInsights: 'Weather Insights',
    blockchainTraceability: 'Blockchain Traceability',
    // Descriptions (New Keys)
    descDiagnosis: 'AI-powered instant crop disease detection with treatment recommendations',
    descMarkets: 'Real-time market prices from local APMCs with trend analysis',
    descSchemes: 'Discover and apply for agricultural subsidies and government schemes',
    descVoice: 'Voice-powered assistant supporting Kannada and English',
    descRestaurants: 'Direct connection with restaurants for bulk orders and better prices',
    descStorage: 'Find and book cold storage facilities to preserve produce',
    descPredictor: 'Machine learning price forecasting with confidence levels and optimal sell dates',
    descHealth: 'Satellite and drone-based real-time crop health analysis with AI insights',
    descDrones: 'Autonomous drone fleet for aerial surveillance and precision agriculture',
    descIrrigation: 'AI-powered precision watering system with soil moisture monitoring',
    descWeather: 'AI weather analysis with precision forecasting and agricultural recommendations',
    descBlockchain: 'Complete farm-to-fork transparency with immutable blockchain records',
    // Revolutionary Highlight Section (New Keys)
    revTitle: 'Revolutionary Agricultural Intelligence',
    revPredictorDesc: 'Advanced ML algorithms predict market prices with 85%+ accuracy, helping farmers maximize profits.',
    revHealthDesc: 'Real-time satellite imagery analysis for crop health monitoring and yield prediction.',
    revBlockchainDesc: 'Complete supply chain transparency with immutable blockchain records for premium pricing.',
    // Misc
    language: 'Language',
    tagline: 'आपका कृषि साथी - सदैव आपके साथ',
    discoverMore: 'Discover More',
    farmersHelped: 'Farmers Helped',
    diagnosisAccuracy: 'Diagnosis Accuracy',
    availableSupport: 'Available Support'
  },
  kn: {
    welcome: 'ಪ್ರಾಜೆಕ್ಟ್ ಕಿಸಾನ್‌ಗೆ ಸ್ವಾಗತ',
    subtitle: 'ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಾಯಕ',
    // Core Features
    cropDiagnosis: 'ಬೆಳೆ ರೋಗ ನಿರ್ಣಯ',
    marketPrices: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    govSchemes: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    voiceAssistant: 'ಧ್ವನಿ ಸಹಾಯಕ',
    restaurants: 'ರೆಸ್ಟೋರೆಂಟ್ ಸಂಪರ್ಕ',
    coldStorage: 'ಶೀತಲ ಭಂಡಾರ',
    // Advanced AI Features
    aiPredictor: 'AI ಮಾರುಕಟ್ಟೆ ಭವಿಷ್ಯಸೂಚಕ',
    cropHealthMonitor: 'ಬೆಳೆ ಆರೋಗ್ಯ ಮಾನಿಟರ್',
    droneMonitoring: 'ಡ್ರೋನ್ ಮೇಲ್ವಿಚಾರಣೆ',
    smartIrrigation: 'ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ',
    weatherInsights: 'ಹವಾಮಾನ ಒಳನೋಟಗಳು',
    blockchainTraceability: 'ಬ್ಲಾಕ್‌ಚೈನ್ ಟ್ರೇಸಬಿಲಿಟಿ',
    // Descriptions
    descDiagnosis: 'ಚಿಕಿತ್ಸೆಯ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ AI-ಚಾಲಿತ ತತ್‌ಕ್ಷಣದ ಬೆಳೆ ರೋಗ ಪತ್ತೆ',
    descMarkets: 'ಸ್ಥಳೀಯ APMCಗಳಿಂದ ಟ್ರೆಂಡ್ ವಿಶ್ಲೇಷಣೆಯೊಂದಿಗೆ ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    descSchemes: 'ಕೃಷಿ ಸಬ್ಸಿಡಿಗಳು ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ ಮತ್ತು ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    descVoice: 'ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಗಳನ್ನು ಬೆಂಬಲಿಸುವ ಧ್ವನಿ-ಚಾಲಿತ ಸಹಾಯಕ',
    descRestaurants: 'ಭಾರಿ ಆರ್ಡರ್‌ಗಳು ಮತ್ತು ಉತ್ತಮ ಬೆಲೆಗಳಿಗಾಗಿ ರೆಸ್ಟೋರೆಂಟ್‌ಗಳೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ',
    descStorage: 'ಉತ್ಪನ್ನಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ಶೀತಲ ಭಂಡಾರ ಸೌಲಭ್ಯಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಬುಕ್ ಮಾಡಿ',
    descPredictor: 'ವಿಶ್ವಾಸಾರ್ಹ ಮಟ್ಟಗಳು ಮತ್ತು ಸೂಕ್ತ ಮಾರಾಟ ದಿನಾಂಕಗಳೊಂದಿಗೆ ಯಂತ್ರ ಕಲಿಕೆ ಬೆಲೆ ಮುನ್ಸೂಚನೆ',
    descHealth: 'AI ಒಳನೋಟಗಳೊಂದಿಗೆ ಉಪಗ್ರಹ ಮತ್ತು ಡ್ರೋನ್ ಆಧಾರಿತ ನೈಜ-ಸಮಯದ ಬೆಳೆ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ',
    descDrones: 'ವೈಮಾನಿಕ ಕಣ್ಗಾವಲು ಮತ್ತು ನಿಖರ ಕೃಷಿಗಾಗಿ ಸ್ವಾಯತ್ತ ಡ್ರೋನ್ ಫ್ಲೀಟ್',
    descIrrigation: 'ಮಣ್ಣಿನ ತೇವಾಂಶ ಮೇಲ್ವಿಚಾರಣೆಯೊಂದಿಗೆ AI-ಚಾಲಿತ ನಿಖರ ನೀರುಣಿಸುವ ವ್ಯವಸ್ಥೆ',
    descWeather: 'ನಿಖರವಾದ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಕೃಷಿ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ AI ಹವಾಮಾನ ವಿಶ್ಲೇಷಣೆ',
    descBlockchain: 'ಬದಲಾಯಿಸಲಾಗದ ಬ್ಲಾಕ್‌ಚೈನ್ ದಾಖಲೆಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಫಾರ್ಮ್-ಟು-ಫೋರ್ಕ್ ಪಾರದರ್ಶಕತೆ',
    // Revolutionary Highlight Section
    revTitle: 'ಕ್ರಾಂತಿಕಾರಿ ಕೃಷಿ ಇಂಟೆಲಿಜೆನ್ಸ್',
    revPredictorDesc: 'ಸುಧಾರಿತ ML ಅಲ್ಗಾರಿದಮ್‌ಗಳು 85%+ ನಿಖರತೆಯೊಂದಿಗೆ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ಊಹಿಸುತ್ತವೆ, ರೈತರಿಗೆ ಲಾಭ ಹೆಚ್ಚಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತವೆ.',
    revHealthDesc: 'ಬೆಳೆ ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಇಳುವರಿ ಮುನ್ಸೂಚನೆಗಾಗಿ ನೈಜ-ಸಮಯದ ಉಪಗ್ರಹ ಇಮೇಜಿಂಗ್ ವಿಶ್ಲೇಷಣೆ.',
    revBlockchainDesc: 'ಪ್ರೀಮಿಯಂ ಬೆಲೆಗಾಗಿ ಬದಲಾಯಿಸಲಾಗದ ಬ್ಲಾಕ್‌ಚೈನ್ ದಾಖಲೆಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಪೂರೈಕೆ ಸರಪಳಿ ಪಾರದರ್ಶಕತೆ.',
    // Misc
    language: 'ಭಾಷೆ',
    tagline: 'ನಿಮ್ಮ ಕೃಷಿ ಸಂಗಾತಿ - ಯಾವಾಗಲೂ ನಿಮ್ಮೊಂದಿಗೆ',
    discoverMore: 'ಇನ್ನಷ್ಟು ಅನ್ವೇಷಿಸಿ',
    farmersHelped: 'ಸಹಾಯ ಪಡೆದ ರೈತರು',
    diagnosisAccuracy: 'ನಿರ್ಣಯ ನಿಖರತೆ',
    availableSupport: 'ಲಭ್ಯವಿರುವ ಬೆಂಬಲ'
  },
  hi: {
    welcome: 'प्रोजेक्ट किसान में आपका स्वागत है',
    subtitle: 'आपका AI-संचालित कृषि सहायक',
    // Core Features
    cropDiagnosis: 'फसल रोग निदान',
    marketPrices: 'बाजार मूल्य',
    govSchemes: 'सरकारी योजनाएं',
    voiceAssistant: 'आवाज सहायक',
    restaurants: 'रेस्टोरेंट कनेक्ट',
    coldStorage: 'कोल्ड स्टोरेज',
    // Advanced AI Features
    aiPredictor: 'AI बाजार भविष्यवक्ता',
    cropHealthMonitor: 'फसल स्वास्थ्य मॉनिटर',
    droneMonitoring: 'ड्रोन निगरानी',
    smartIrrigation: 'स्मार्ट सिंचाई',
    weatherInsights: 'मौसम की जानकारी',
    blockchainTraceability: 'ब्लॉकचेन ट्रेसबिलिटी',
    // Descriptions
    descDiagnosis: 'उपचार सिफारिशों के साथ AI-संचालित तत्काल फसल रोग का पता लगाना',
    descMarkets: 'स्थानीय APMCs से ट्रेंड विश्लेषण के साथ वास्तविक समय के बाजार मूल्य',
    descSchemes: 'कृषि सब्सिडी और सरकारी योजनाओं की खोज करें और आवेदन करें',
    descVoice: 'कन्नड़ और अंग्रेजी का समर्थन करने वाला आवाज-संचालित सहायक',
    descRestaurants: 'थोक ऑर्डर और बेहतर कीमतों के लिए रेस्तरां के साथ सीधा संपर्क',
    descStorage: 'उपज को संरक्षित करने के लिए कोल्ड स्टोरेज सुविधाओं का पता लगाएं और बुक करें',
    descPredictor: 'आत्मविश्वास के स्तर और इष्टतम बिक्री तिथियों के साथ मशीन लर्निंग मूल्य पूर्वानुमान',
    descHealth: 'AI अंतर्दृष्टि के साथ उपग्रह और ड्रोन-आधारित वास्तविक समय फसल स्वास्थ्य विश्लेषण',
    descDrones: 'एरियल निगरानी और सटीक कृषि के लिए स्वायत्त ड्रोन बेड़ा',
    descIrrigation: 'मिट्टी की नमी की निगरानी के साथ AI-संचालित सटीक जल प्रणाली',
    descWeather: 'सटीक पूर्वानुमान और कृषि सिफारिशों के साथ AI मौसम विश्लेषण',
    descBlockchain: 'अपरिवर्तनीय ब्लॉकचेन रिकॉर्ड के साथ खेत से थाली तक पूरी पारदर्शिता',
    // Revolutionary Highlight Section
    revTitle: 'क्रांतिकारी कृषि इंटेलिजेंस',
    revPredictorDesc: 'उन्नत ML एल्गोरिदम 85%+ सटीकता के साथ बाजार कीमतों की भविष्यवाणी करते हैं, जिससे किसानों को लाभ अधिकतम करने में मदद मिलती है।',
    revHealthDesc: 'फसल स्वास्थ्य की निगरानी और उपज पूर्वानुमान के लिए वास्तविक समय उपग्रह इमेजरी विश्लेषण।',
    revBlockchainDesc: 'प्रीमियम मूल्य निर्धारण के लिए अपरिवर्तनीय ब्लॉकचेन रिकॉर्ड के साथ पूरी आपूर्ति श्रृंखला पारदर्शिता।',
    // Misc
    language: 'भाषा',
    tagline: 'आपका कृषि साथी - सदैव आपके साथ',
    discoverMore: 'और जानें',
    farmersHelped: 'सहायता प्राप्त किसान',
    diagnosisAccuracy: 'निदान सटीकता',
    availableSupport: 'उपलब्ध सहायता'
  },
  te: {
    welcome: 'ప్రాజెక్ట్ కిసాన్‌కు స్వాగతం',
    subtitle: 'మీ AI-శక్తితో కూడిన వ్యవసాయ సహాయకుడు',
    // Core Features
    cropDiagnosis: 'పంట వ్యాధి నిర్ధారణ',
    marketPrices: 'మార్కెట్ ధరలు',
    govSchemes: 'ప్రభుత్వ పథకాలు',
    voiceAssistant: 'వాయిస్ అసిస్టెంట్',
    restaurants: 'రెస్టారెంట్ కనెక్ట్',
    coldStorage: 'కోల్డ్ స్టోరేజ్',
    // Advanced AI Features
    aiPredictor: 'AI మార్కెట్ ప్రిడిక్టర్',
    cropHealthMonitor: 'పంట ఆరోగ్య మానిటర్',
    droneMonitoring: 'డ్రోన్ పర్యవేక్షణ',
    smartIrrigation: 'స్మార్ట్ ఇరిగేషన్',
    weatherInsights: 'వాతావరణ అంతర్దృష్టులు',
    blockchainTraceability: 'బ్లాక్‌చెయిన్ ట్రేసబిలిటీ',
    // Descriptions
    descDiagnosis: 'చికిత్స సిఫార్సులతో AI-శక్తితో తక్షణ పంట వ్యాధి గుర్తింపు',
    descMarkets: 'స్థానిక APMCల నుండి ట్రెండ్ విశ్లేషణతో రియల్ టైమ్ మార్కెట్ ధరలు',
    descSchemes: 'వ్యవసాయ సబ్సిడీలు మరియు ప్రభుత్వ పథకాలను కనుగొనండి మరియు దరఖాస్తు చేయండి',
    descVoice: 'కన్నడ మరియు ఇంగ్లీష్‌లకు మద్దతు ఇచ్చే వాయిస్-శక్తితో కూడిన సహాయకుడు',
    descRestaurants: 'భారీ ఆర్డర్‌లు మరియు మెరుగైన ధరల కోసం రెస్టారెంట్‌లతో ప్రత్యక్ష కనెక్షన్',
    descStorage: 'పంటను సంరక్షించడానికి కోల్డ్ స్టోరేజ్ సౌకర్యాలను కనుగొనండి మరియు బుక్ చేయండి',
    descPredictor: 'విశ్వాస స్థాయిలు మరియు సరైన అమ్మకం తేదీలతో మెషిన్ లెర్నింగ్ ధరల అంచనా',
    descHealth: 'AI అంతర్దృష్టులతో ఉపగ్రహం మరియు డ్రోన్ ఆధారిత రియల్ టైమ్ పంట ఆరోగ్య విశ్లేషణ',
    descDrones: 'వైమానిక నిఘా మరియు ఖచ్చితత్వ వ్యవసాయం కోసం స్వయంప్రతిపత్త డ్రోన్ ఫ్లీట్',
    descIrrigation: 'నేల తేమ పర్యవేక్షణతో AI-శక్తితో కూడిన ఖచ్చితత్వ నీటిపారుదల వ్యవస్థ',
    descWeather: 'ఖచ్చితమైన అంచనా మరియు వ్యవసాయ సిఫార్సులతో AI వాతావరణ విశ్లేషణ',
    descBlockchain: 'మారడానికి వీలులేని బ్లాక్‌చెయిన్ రికార్డులతో పూర్తి ఫార్మ్-టు-ఫోర్క్ పారదర్శకత',
    // Revolutionary Highlight Section
    revTitle: 'విప్లవాత్మక వ్యవసాయ ఇంటెలిజెన్స్',
    revPredictorDesc: 'అధునాతన ML అల్గోరిథంలు 85%+ ఖచ్చితత్వంతో మార్కెట్ ధరలను అంచనా వేస్తాయి, రైతులు గరిష్ట లాభాలను పొందడంలో సహాయపడతాయి.',
    revHealthDesc: 'పంట ఆరోగ్య పర్యవేక్షణ మరియు దిగుబడి అంచనా కోసం రియల్ టైమ్ ఉపగ్రహ ఇమేజరీ విశ్లేషణ.',
    revBlockchainDesc: 'ప్రీమియం ధరల కోసం మారడానికి వీలులేని బ్లాక్‌చెయిన్ రికార్డులతో పూర్తి సరఫరా గొలుసు పారదర్శకత.',
    // Misc
    language: 'భాష',
    tagline: 'మీ వ్యవసాయ భాగస్వామి - ఎల్లప్పుడూ మీతో',
    discoverMore: 'మరింత కనుగొనండి',
    farmersHelped: 'సహాయం పొందిన రైతులు',
    diagnosisAccuracy: 'నిర్ధారణ ఖచ్చితత్వం',
    availableSupport: 'అందుబాటులో ఉన్న మద్దతు'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};