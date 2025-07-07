import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, Camera, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CropHealth {
  fieldId: string;
  fieldName: string;
  cropType: string;
  healthScore: number;
  issues: Array<{
    type: 'disease' | 'pest' | 'nutrient' | 'water';
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendation: string;
    confidence: number;
  }>;
  growthStage: string;
  expectedHarvest: string;
  yieldPrediction: number;
  lastScanned: string;
}

export const CropHealthMonitor: React.FC = () => {
  const [crops, setCrops] = useState<CropHealth[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<CropHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    fetchCropHealth();
  }, []);

  const fetchCropHealth = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockCrops: CropHealth[] = [
      {
        fieldId: '1',
        fieldName: 'North Field',
        cropType: 'Tomato',
        healthScore: 85,
        issues: [
          {
            type: 'disease',
            severity: 'medium',
            description: 'Early signs of leaf blight detected',
            recommendation: 'Apply copper-based fungicide within 48 hours',
            confidence: 87
          }
        ],
        growthStage: 'Flowering',
        expectedHarvest: '2025-02-15',
        yieldPrediction: 12.5,
        lastScanned: '2 hours ago'
      },
      {
        fieldId: '2',
        fieldName: 'South Field',
        cropType: 'Onion',
        healthScore: 92,
        issues: [],
        growthStage: 'Bulb Development',
        expectedHarvest: '2025-03-01',
        yieldPrediction: 8.2,
        lastScanned: '1 day ago'
      },
      {
        fieldId: '3',
        fieldName: 'East Field',
        cropType: 'Cabbage',
        healthScore: 78,
        issues: [
          {
            type: 'pest',
            severity: 'high',
            description: 'Aphid infestation detected',
            recommendation: 'Immediate neem oil spray required',
            confidence: 94
          },
          {
            type: 'nutrient',
            severity: 'low',
            description: 'Slight nitrogen deficiency',
            recommendation: 'Apply urea fertilizer next week',
            confidence: 76
          }
        ],
        growthStage: 'Head Formation',
        expectedHarvest: '2025-02-28',
        yieldPrediction: 15.8,
        lastScanned: '6 hours ago'
      }
    ];
    
    setCrops(mockCrops);
    setSelectedCrop(mockCrops[0]);
    setLoading(false);
  };

  const startAIScan = async () => {
    setScanning(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate updated health data
    const updatedCrops = crops.map(crop => ({
      ...crop,
      lastScanned: 'Just now',
      healthScore: Math.min(100, crop.healthScore + Math.floor(Math.random() * 5))
    }));
    
    setCrops(updatedCrops);
    setScanning(false);
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Analyzing crop health with satellite imagery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🌱 AI Crop Health Monitor</h2>
            <p className="text-gray-600">Real-time satellite and drone-based crop analysis</p>
          </div>
          <motion.button
            onClick={startAIScan}
            disabled={scanning}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {scanning ? (
              <>
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>AI Scan</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crop List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Fields</h3>
          <div className="space-y-3">
            {crops.map((crop, index) => (
              <motion.div
                key={crop.fieldId}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCrop?.fieldId === crop.fieldId
                    ? 'bg-green-100 border-2 border-green-300'
                    : 'bg-white border-2 border-gray-200 hover:border-green-200'
                }`}
                onClick={() => setSelectedCrop(crop)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{crop.fieldName}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(crop.healthScore)}`}>
                    {crop.healthScore}%
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{crop.cropType}</p>
                <p className="text-xs text-gray-500">Last scan: {crop.lastScanned}</p>
                {crop.issues.length > 0 && (
                  <div className="flex items-center space-x-1 mt-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-xs text-yellow-600">{crop.issues.length} issue(s)</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          {selectedCrop && (
            <motion.div
              key={selectedCrop.fieldId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{selectedCrop.fieldName}</h3>
                  <div className={`px-4 py-2 rounded-full text-lg font-bold ${getHealthColor(selectedCrop.healthScore)}`}>
                    {selectedCrop.healthScore}% Healthy
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Activity className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-800">{selectedCrop.cropType}</div>
                    <div className="text-xs text-gray-600">Crop Type</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-800">{selectedCrop.growthStage}</div>
                    <div className="text-xs text-gray-600">Growth Stage</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-800">{selectedCrop.yieldPrediction} tons</div>
                    <div className="text-xs text-gray-600">Predicted Yield</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Camera className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-800">{selectedCrop.expectedHarvest}</div>
                    <div className="text-xs text-gray-600">Expected Harvest</div>
                  </div>
                </div>

                {/* Issues */}
                {selectedCrop.issues.length > 0 ? (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">🚨 Detected Issues</h4>
                    <div className="space-y-3">
                      {selectedCrop.issues.map((issue, index) => (
                        <motion.div
                          key={index}
                          className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium capitalize">{issue.type} Issue</h5>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium uppercase">{issue.severity}</span>
                              <span className="text-xs">({issue.confidence}% confidence)</span>
                            </div>
                          </div>
                          <p className="text-sm mb-2">{issue.description}</p>
                          <div className="bg-white bg-opacity-50 rounded p-2">
                            <p className="text-sm font-medium">💡 Recommendation:</p>
                            <p className="text-sm">{issue.recommendation}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-green-800 mb-2">All Clear! 🎉</h4>
                    <p className="text-green-600">No issues detected in this field. Your crops are healthy!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};