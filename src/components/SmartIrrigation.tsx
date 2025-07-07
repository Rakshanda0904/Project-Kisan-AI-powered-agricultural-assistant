import React, { useState, useEffect } from 'react';
import { Droplets, Zap, Clock, TrendingUp, Settings, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

interface IrrigationData {
  zones: Array<{
    id: string;
    name: string;
    soilMoisture: number;
    isActive: boolean;
    nextSchedule: string;
    cropType: string;
    efficiency: number;
  }>;
  waterUsage: {
    today: number;
    thisWeek: number;
    savings: number;
  };
  recommendations: string[];
}

export const SmartIrrigation: React.FC = () => {
  const [irrigationData, setIrrigationData] = useState<IrrigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  useEffect(() => {
    fetchIrrigationData();
  }, []);

  const fetchIrrigationData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockData: IrrigationData = {
      zones: [
        {
          id: '1',
          name: 'Tomato Field A',
          soilMoisture: 45,
          isActive: false,
          nextSchedule: '6:00 AM',
          cropType: 'Tomato',
          efficiency: 92
        },
        {
          id: '2',
          name: 'Onion Field B',
          soilMoisture: 78,
          isActive: true,
          nextSchedule: 'Running',
          cropType: 'Onion',
          efficiency: 88
        },
        {
          id: '3',
          name: 'Leafy Greens C',
          soilMoisture: 62,
          isActive: false,
          nextSchedule: '4:00 PM',
          cropType: 'Spinach',
          efficiency: 95
        }
      ],
      waterUsage: {
        today: 1250,
        thisWeek: 8750,
        savings: 35
      },
      recommendations: [
        'Zone 1 needs irrigation in 2 hours based on soil moisture',
        'Reduce watering frequency for Zone 2 due to upcoming rain',
        'Optimal time for Zone 3 irrigation: 4-6 PM today'
      ]
    };
    
    setIrrigationData(mockData);
    setLoading(false);
  };

  const toggleZone = (zoneId: string) => {
    if (!irrigationData) return;
    
    setIrrigationData({
      ...irrigationData,
      zones: irrigationData.zones.map(zone =>
        zone.id === zoneId ? { ...zone, isActive: !zone.isActive } : zone
      )
    });
  };

  const getMoistureColor = (moisture: number) => {
    if (moisture < 30) return 'text-red-600 bg-red-100';
    if (moisture < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
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
          <p className="mt-4 text-gray-600">Connecting to smart irrigation system...</p>
        </div>
      </div>
    );
  }

  if (!irrigationData) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">💧 Smart Irrigation Control</h2>
            <p className="text-gray-600">AI-powered precision watering system</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Auto Mode</span>
            <motion.button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => setAutoMode(!autoMode)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                animate={{ x: autoMode ? 24 : 4 }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Water Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div 
          className="bg-white rounded-lg p-4 shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3">
            <Droplets className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{irrigationData.waterUsage.today}L</div>
              <div className="text-sm text-gray-600">Today's Usage</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold text-gray-800">{irrigationData.waterUsage.thisWeek}L</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-4 shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold text-green-600">{irrigationData.waterUsage.savings}%</div>
              <div className="text-sm text-gray-600">Water Saved</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Irrigation Zones */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Irrigation Zones</h3>
        <div className="space-y-4">
          {irrigationData.zones.map((zone, index) => (
            <motion.div 
              key={zone.id}
              className="bg-white rounded-lg p-4 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-800">{zone.name}</h4>
                    <span className="text-sm text-gray-600">({zone.cropType})</span>
                    {zone.isActive && (
                      <motion.span 
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Active
                      </motion.span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Soil Moisture:</span>
                      <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${getMoistureColor(zone.soilMoisture)}`}>
                        {zone.soilMoisture}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Next Schedule:</span>
                      <span className="ml-2 font-medium">{zone.nextSchedule}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="ml-2 font-medium text-green-600">{zone.efficiency}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => toggleZone(zone.id)}
                    className={`p-2 rounded-full ${
                      zone.isActive 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {zone.isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </motion.button>
                  
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🤖 AI Recommendations</h3>
        <div className="space-y-3">
          {irrigationData.recommendations.map((rec, index) => (
            <motion.div 
              key={index}
              className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-blue-600 mt-1" />
                <p className="text-blue-800">{rec}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};