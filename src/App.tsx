import React, { useState } from 'react';
import { Header } from './components/Header';
import { FeatureCard } from './components/FeatureCard';
import { CropDiagnosis } from './components/CropDiagnosis';
import { MarketPrices } from './components/MarketPrices';
import { GovernmentSchemes } from './components/GovernmentSchemes';
import { VoiceAssistant } from './components/VoiceAssistant';
import { RestaurantConnect } from './components/RestaurantConnect';
import { ColdStorage } from './components/ColdStorage';
import { AIMarketPredictor } from './components/AIMarketPredictor';
import { CropHealthMonitor } from './components/CropHealthMonitor';
import { DroneMonitoring } from './components/DroneMonitoring';
import { SmartIrrigation } from './components/SmartIrrigation';
import { WeatherInsights } from './components/WeatherInsights';
import { BlockchainTraceability } from './components/BlockchainTraceability';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Camera, TrendingUp, FileText, Mic, Store, Thermometer, Brain, Satellite, Plane, Droplets, Cloud, Package } from 'lucide-react';

type ActiveFeature = 'home' | 'diagnosis' | 'markets' | 'schemes' | 'voice' | 'restaurants' | 'storage' | 'predictor' | 'health' | 'drones' | 'irrigation' | 'weather' | 'blockchain';

function AppContent() {
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>('home');
  const [isListening, setIsListening] = useState(false);
  const { t } = useLanguage();

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setActiveFeature('voice');
    }
  };

  const renderContent = () => {
    switch (activeFeature) {
      case 'diagnosis':
        return <CropDiagnosis />;
      case 'markets':
        return <MarketPrices />;
      case 'schemes':
        return <GovernmentSchemes />;
      case 'voice':
        return <VoiceAssistant isListening={isListening} onToggleListening={toggleListening} />;
      case 'restaurants':
        return <RestaurantConnect />;
      case 'storage':
        return <ColdStorage />;
      case 'predictor':
        return <AIMarketPredictor />;
      case 'health':
        return <CropHealthMonitor />;
      case 'drones':
        return <DroneMonitoring />;
      case 'irrigation':
        return <SmartIrrigation />;
      case 'weather':
        return <WeatherInsights />;
      case 'blockchain':
        return <BlockchainTraceability />;
      default:
        return (
          <div className="mx-auto">
            {/* Top Welcome Text */}
            <div className="text-center mb-8 max-w-6xl mx-auto p-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t('welcome')}
              </h1>
              <p className="text-gray-600 text-xl mb-2">
                {t('subtitle')}
              </p>
              <p className="text-gray-500 text-lg">
                {t('tagline')}
              </p>
            </div>
            
            {/* 1. HOME SECTION: Full-width container (Hero) */}
            <div
              id="home"
              className="relative w-full min-h-screen flex items-center justify-center bg-fixed bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')",
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

              {/* Hero content */}
              <div
                className="relative z-10 max-w-3xl mx-auto text-center px-6 py-12 rounded-3xl bg-white/15 
               backdrop-blur-xl border border-white/30 shadow-[0_0_35px_rgba(255,200,0,0.45)]
               animate-fadeIn"
              >
                <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg leading-tight">
                  {t('welcome').split(' to ')[0]} to <span className="text-yellow-300">Project Kisan</span> {/* Partial translation: only 'Welcome' */}
                </h1>

                <p className="text-lg md:text-xl text-gray-100 mt-4 leading-relaxed">
                  An AI-powered agricultural assistant -built to help farmers with
                  <span className="text-yellow-300 font-semibold"> crop guidance, weather updates, pest alerts, and smart farming decisions.</span>.
                </p>

              </div>

              {/* Simple fade animation */}
              <style>{`
    @keyframes fadeIn {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
  `}</style>
            </div>

            {/* Content below hero banner, now centered and given more top padding */}
            <div className="max-w-6xl mx-auto p-6 mt-16">
              {/* 2. CORE FEATURES SECTION */}
              <div className="mb-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Core Agricultural Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FeatureCard
                    icon={Camera}
                    title={t('cropDiagnosis')}
                    description={t('descDiagnosis')}
                    onClick={() => setActiveFeature('diagnosis')}
                  />
                  
                  <FeatureCard
                    icon={TrendingUp}
                    title={t('marketPrices')}
                    description={t('descMarkets')}
                    onClick={() => setActiveFeature('markets')}
                  />
                  
                  <FeatureCard
                    icon={FileText}
                    title={t('govSchemes')}
                    description={t('descSchemes')}
                    onClick={() => setActiveFeature('schemes')}
                  />
                  
                  <FeatureCard
                    icon={Mic}
                    title={t('voiceAssistant')}
                    description={t('descVoice')}
                    onClick={() => setActiveFeature('voice')}
                  />
                  
                  <FeatureCard
                    icon={Store}
                    title={t('restaurants')}
                    description={t('descRestaurants')}
                    onClick={() => setActiveFeature('restaurants')}
                  />
                  
                  <FeatureCard
                    icon={Thermometer}
                    title={t('coldStorage')}
                    description={t('descStorage')}
                    onClick={() => setActiveFeature('storage')}
                  />
                </div>
              </div>

              {/* Advanced AI Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Advanced AI Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <FeatureCard
                    icon={Brain}
                    title={t('aiPredictor')}
                    description={t('descPredictor')}
                    onClick={() => setActiveFeature('predictor')}
                  />
                  
                  <FeatureCard
                    icon={Satellite}
                    title={t('cropHealthMonitor')}
                    description={t('descHealth')}
                    onClick={() => setActiveFeature('health')}
                  />
                  
                  <FeatureCard
                    icon={Plane}
                    title={t('droneMonitoring')}
                    description={t('descDrones')}
                    onClick={() => setActiveFeature('drones')}
                  />
                  
                  <FeatureCard
                    icon={Droplets}
                    title={t('smartIrrigation')}
                    description={t('descIrrigation')}
                    onClick={() => setActiveFeature('irrigation')}
                  />
                  
                  <FeatureCard
                    icon={Cloud}
                    title={t('weatherInsights')}
                    description={t('descWeather')}
                    onClick={() => setActiveFeature('weather')}
                  />
                  
                  <FeatureCard
                    icon={Package}
                    title={t('blockchainTraceability')}
                    description={t('descBlockchain')}
                    onClick={() => setActiveFeature('blockchain')}
                  />
                </div>
              </div>
              
              {/* Revolutionary Features Highlight */}
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-6 text-center"> {t('revTitle')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                    <Brain className="w-10 h-10 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{t('aiPredictor')}</h3>
                    <p className="text-purple-100 text-sm">
                      {t('revPredictorDesc')}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                    <Satellite className="w-10 h-10 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{t('cropHealthMonitor')}</h3>
                    <p className="text-blue-100 text-sm">
                      {t('revHealthDesc')}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                    <Package className="w-10 h-10 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{t('blockchainTraceability')}</h3>
                    <p className="text-green-100 text-sm">
                      {t('revBlockchainDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div> {/* End of max-w-6xl mx-auto p-6 container */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Header isListening={isListening} onToggleListening={toggleListening} />
      
      {activeFeature !== 'home' && (
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => setActiveFeature('home')}
            className="mb-4 text-green-600 hover:text-green-700 font-medium flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
      )}
      
      <main className="container mx-auto px-0 py-0">
        {renderContent()}
      </main>
      
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Project Kisan</h3>
            <p className="text-gray-300 mb-4">Revolutionizing Agriculture with AI & Blockchain Technology</p>
            <div className="flex justify-center space-x-8 text-sm">
              <div>
                <span className="font-semibold">Powered by:</span>
                <p className="text-gray-400">Google AI • Firebase • Vertex AI</p>
              </div>
              <div>
                <span className="font-semibold">Technologies:</span>
                <p className="text-gray-400">Machine Learning • Blockchain • IoT</p>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
            © 2025 Project Kisan. Empowering farmers with cutting-edge agricultural intelligence.
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;