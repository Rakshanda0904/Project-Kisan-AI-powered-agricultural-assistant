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
          <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                {t('welcome')}
              </h1>
              <p className="text-gray-600 text-xl mb-2">
                {t('subtitle')}
              </p>
              <p className="text-gray-500 text-lg">
                ನಿಮ್ಮ ಕೃಷಿ ಸಾಥಿ - ಯಾವಾಗಲೂ ನಿಮ್ಮ ಜೊತೆ
              </p>
            </div>
            
            {/* Core Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🌾 Core Agricultural Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Camera}
                  title={t('cropDiagnosis')}
                  description="AI-powered instant crop disease detection with treatment recommendations"
                  onClick={() => setActiveFeature('diagnosis')}
                />
                
                <FeatureCard
                  icon={TrendingUp}
                  title={t('marketPrices')}
                  description="Real-time market prices from local APMCs with trend analysis"
                  onClick={() => setActiveFeature('markets')}
                />
                
                <FeatureCard
                  icon={FileText}
                  title={t('govSchemes')}
                  description="Discover and apply for agricultural subsidies and government schemes"
                  onClick={() => setActiveFeature('schemes')}
                />
                
                <FeatureCard
                  icon={Mic}
                  title={t('voiceAssistant')}
                  description="Voice-powered assistant supporting Kannada and English"
                  onClick={() => setActiveFeature('voice')}
                />
                
                <FeatureCard
                  icon={Store}
                  title={t('restaurants')}
                  description="Direct connection with restaurants for bulk orders and better prices"
                  onClick={() => setActiveFeature('restaurants')}
                />
                
                <FeatureCard
                  icon={Thermometer}
                  title={t('coldStorage')}
                  description="Find and book cold storage facilities to preserve produce"
                  onClick={() => setActiveFeature('storage')}
                />
              </div>
            </div>

            {/* Advanced AI Features */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🤖 Advanced AI Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={Brain}
                  title="AI Market Predictor"
                  description="Machine learning price forecasting with confidence levels and optimal sell dates"
                  onClick={() => setActiveFeature('predictor')}
                />
                
                <FeatureCard
                  icon={Satellite}
                  title="Crop Health Monitor"
                  description="Satellite and drone-based real-time crop health analysis with AI insights"
                  onClick={() => setActiveFeature('health')}
                />
                
                <FeatureCard
                  icon={Plane}
                  title="Drone Monitoring"
                  description="Autonomous drone fleet for aerial surveillance and precision agriculture"
                  onClick={() => setActiveFeature('drones')}
                />
                
                <FeatureCard
                  icon={Droplets}
                  title="Smart Irrigation"
                  description="AI-powered precision watering system with soil moisture monitoring"
                  onClick={() => setActiveFeature('irrigation')}
                />
                
                <FeatureCard
                  icon={Cloud}
                  title="Weather Insights"
                  description="AI weather analysis with precision forecasting and agricultural recommendations"
                  onClick={() => setActiveFeature('weather')}
                />
                
                <FeatureCard
                  icon={Package}
                  title="Blockchain Traceability"
                  description="Complete farm-to-fork transparency with immutable blockchain records"
                  onClick={() => setActiveFeature('blockchain')}
                />
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
                <div className="text-gray-700 font-medium">{t('farmersHelped')}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
                <div className="text-gray-700 font-medium">{t('diagnosisAccuracy')}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-700 font-medium">{t('availableSupport')}</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">₹2.5Cr+</div>
                <div className="text-gray-700 font-medium">Farmer Income Increased</div>
              </div>
            </div>

            {/* Revolutionary Features Highlight */}
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-6 text-center">🚀 Revolutionary Agricultural Intelligence</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Brain className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-2">AI Market Prediction</h3>
                  <p className="text-purple-100 text-sm">
                    Advanced ML algorithms predict market prices with 85%+ accuracy, helping farmers maximize profits.
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Satellite className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Satellite Monitoring</h3>
                  <p className="text-blue-100 text-sm">
                    Real-time satellite imagery analysis for crop health monitoring and yield prediction.
                  </p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-6 backdrop-blur-sm">
                  <Package className="w-10 h-10 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Blockchain Transparency</h3>
                  <p className="text-green-100 text-sm">
                    Complete supply chain transparency with immutable blockchain records for premium pricing.
                  </p>
                </div>
              </div>
            </div>
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
      
      <main className="container mx-auto px-4 py-8">
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