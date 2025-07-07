import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  uvIndex: number;
  soilMoisture: number;
  forecast: Array<{
    day: string;
    condition: string;
    temp: number;
    rain: number;
  }>;
  alerts: Array<{
    type: 'warning' | 'info';
    message: string;
    action: string;
  }>;
}

export const WeatherInsights: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    // Simulate AI-powered weather analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockWeather: WeatherData = {
      temperature: 28,
      humidity: 75,
      rainfall: 12,
      windSpeed: 8,
      uvIndex: 7,
      soilMoisture: 65,
      forecast: [
        { day: 'Today', condition: 'Partly Cloudy', temp: 28, rain: 20 },
        { day: 'Tomorrow', condition: 'Light Rain', temp: 26, rain: 80 },
        { day: 'Day 3', condition: 'Heavy Rain', temp: 24, rain: 95 },
        { day: 'Day 4', condition: 'Sunny', temp: 30, rain: 5 },
        { day: 'Day 5', condition: 'Cloudy', temp: 27, rain: 30 }
      ],
      alerts: [
        {
          type: 'warning',
          message: 'Heavy rainfall expected in 48 hours',
          action: 'Cover sensitive crops and ensure proper drainage'
        },
        {
          type: 'info',
          message: 'Optimal conditions for pesticide application',
          action: 'Apply fungicide between 6-8 AM tomorrow'
        }
      ]
    };
    
    setWeather(mockWeather);
    setLoading(false);
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy': 
      case 'partly cloudy': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'light rain':
      case 'heavy rain': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Analyzing weather patterns with AI...</p>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🌤️ AI Weather Insights</h2>
        <p className="text-gray-600">Precision agriculture weather analysis powered by satellite data</p>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <motion.div 
          className="bg-white rounded-lg p-4 text-center shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{weather.temperature}°C</div>
          <div className="text-sm text-gray-600">Temperature</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 text-center shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{weather.humidity}%</div>
          <div className="text-sm text-gray-600">Humidity</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 text-center shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CloudRain className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{weather.rainfall}mm</div>
          <div className="text-sm text-gray-600">Rainfall</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 text-center shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Wind className="w-6 h-6 text-gray-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{weather.windSpeed} km/h</div>
          <div className="text-sm text-gray-600">Wind Speed</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 text-center shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{weather.uvIndex}</div>
          <div className="text-sm text-gray-600">UV Index</div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 text-center shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Droplets className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{weather.soilMoisture}%</div>
          <div className="text-sm text-gray-600">Soil Moisture</div>
        </motion.div>
      </div>

      {/* 5-Day Forecast */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Precision Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {weather.forecast.map((day, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg p-3 text-center shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-sm font-medium text-gray-800 mb-2">{day.day}</div>
              <div className="mb-2">{getWeatherIcon(day.condition)}</div>
              <div className="text-lg font-bold text-gray-800">{day.temp}°C</div>
              <div className="text-xs text-blue-600">{day.rain}% rain</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Alerts */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">🤖 AI Recommendations</h3>
        {weather.alerts.map((alert, index) => (
          <motion.div 
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              alert.type === 'warning' 
                ? 'bg-red-50 border-red-500' 
                : 'bg-blue-50 border-blue-500'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-start space-x-3">
              <AlertTriangle className={`w-5 h-5 mt-1 ${
                alert.type === 'warning' ? 'text-red-600' : 'text-blue-600'
              }`} />
              <div>
                <p className={`font-medium ${
                  alert.type === 'warning' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {alert.message}
                </p>
                <p className={`text-sm mt-1 ${
                  alert.type === 'warning' ? 'text-red-700' : 'text-blue-700'
                }`}>
                  Action: {alert.action}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};