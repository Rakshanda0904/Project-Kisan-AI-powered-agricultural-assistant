import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Target, Brain, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MarketPrediction {
  commodity: string;
  currentPrice: number;
  predictedPrices: Array<{
    date: string;
    price: number;
    confidence: number;
  }>;
  trend: 'bullish' | 'bearish' | 'stable';
  recommendation: string;
  factors: string[];
  optimalSellDate: string;
  potentialProfit: number;
}

export const AIMarketPredictor: React.FC = () => {
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [selectedCommodity, setSelectedCommodity] = useState<MarketPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchPredictions();
  }, [timeframe]);

  const fetchPredictions = async () => {
    setLoading(true);
    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Tomorrow's date (November 26, 2025)
    const tomorrowDate = '2025-11-26';
    
    // Market Data for Maharashtra (Mumbai/Pune APMC as reference for Nov 25, 2025)
    const mockPredictions: MarketPrediction[] = [
      {
        commodity: 'Tomato (Local)',
        currentPrice: 48, // ₹48/kg in Mumbai APMC (Nov 24, 2025)
        predictedPrices: [
          { date: tomorrowDate, price: 49, confidence: 90 },
          { date: '2025-12-01', price: 55, confidence: 85 },
          { date: '2025-12-07', price: 58, confidence: 80 },
          { date: '2025-12-15', price: 53, confidence: 75 },
          { date: '2025-12-23', price: 47, confidence: 70 },
          { date: '2025-12-30', price: 45, confidence: 65 }
        ],
        trend: 'bullish',
        recommendation: 'Price peaking soon; target sales in the next 7-10 days',
        factors: ['Unseasonal rain reduced recent arrivals (APMC)', 'High retail demand in metro areas', 'Supply chain delays from Nashik/Pune region'],
        optimalSellDate: '2025-07-12',
        potentialProfit: 20.8
      },
      {
        commodity: 'Chikoo (Sapota)',
        currentPrice: 40, // Avg price of ₹40-45/kg in Mumbai APMC (Nov 25, 2025)
        predictedPrices: [
          { date: tomorrowDate, price: 41, confidence: 88 },
          { date: '2025-12-01', price: 42, confidence: 85 },
          { date: '2025-12-07', price: 44, confidence: 83 },
          { date: '2025-12-15', price: 46, confidence: 78 },
          { date: '2025-12-23', price: 45, confidence: 75 },
          { date: '2025-12-30', price: 43, confidence: 70 }
        ],
        trend: 'stable',
        recommendation: 'Hold for small gradual appreciation; sell within 3 weeks',
        factors: ['Steady supply from Dahanu-Gholvad belt', 'Consistent demand for winter fruit', 'Slight premium expected near Christmas week'],
        optimalSellDate: '2025-12-15',
        potentialProfit: 15.0
      },
      {
        commodity: 'Onion (Rabi)',
        currentPrice: 28, // General modal price for good quality
        predictedPrices: [
          { date: tomorrowDate, price: 27, confidence: 92 },
          { date: '2025-12-01', price: 25, confidence: 90 },
          { date: '2025-12-07', price: 22, confidence: 88 },
          { date: '2025-12-15', price: 20, confidence: 85 },
          { date: '2025-12-23', price: 21, confidence: 80 },
          { date: '2025-12-30', price: 23, confidence: 75 }
        ],
        trend: 'bearish',
        recommendation: 'Sell large quantities immediately; market glut expected',
        factors: ['Fresh Rabi harvest flooding Nashik/Pune markets', 'Government inventory release speculation', 'High storage costs pushing existing stock out'],
        optimalSellDate: tomorrowDate,
        potentialProfit: -28.6
      }
    ];
    
    setPredictions(mockPredictions);
    setSelectedCommodity(mockPredictions[0]);
    setLoading(false);
  };

  const getChartData = (commodity: MarketPrediction) => {
    const labels = ['Current', ...commodity.predictedPrices.map(p => 
      new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    )];
    
    const prices = [commodity.currentPrice, ...commodity.predictedPrices.map(p => p.price)];
    const confidences = [100, ...commodity.predictedPrices.map(p => p.confidence)];

    return {
      labels,
      datasets: [
        {
          label: 'Predicted Price (₹/kg)',
          data: prices,
          borderColor: commodity.trend === 'bullish' ? 'rgb(34, 197, 94)' : (commodity.trend === 'bearish' ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'),
          backgroundColor: commodity.trend === 'bullish' ? 'rgba(34, 197, 94, 0.1)' : (commodity.trend === 'bearish' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'),
          tension: 0.4,
          fill: true,
          yAxisID: 'y'
        },
        {
          label: 'Confidence (%)',
          data: confidences,
          borderColor: 'rgb(147, 51, 234)', // Purple for confidence
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'AI Price Prediction with Confidence Levels'
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Price (₹/kg)'
        },
        min: 0,
        max: 60 // Adjusted max for better visualization of vegetable prices
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Confidence (%)'
        },
        min: 0,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'bearish': return <TrendingDown className="w-5 h-5 text-red-600" />;
      default: return <BarChart3 className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish': return 'text-green-600 bg-green-100';
      case 'bearish': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100'; // Stable trend now blue
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">AI analyzing Maharashtra market trends (Mumbai APMC, Nashik, Pune data)...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🧠 AI Market Predictor: Maharashtra Focus</h2>
            <p className="text-gray-600">Advanced machine learning price forecasting for key state commodities</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Timeframe:</span>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Commodity List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Commodities (Market: Mumbai APMC)</h3>
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <motion.div
                key={prediction.commodity}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCommodity?.commodity === prediction.commodity
                    ? 'bg-blue-100 border-2 border-blue-300'
                    : 'bg-white border-2 border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => setSelectedCommodity(prediction)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{prediction.commodity}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTrendColor(prediction.trend)}`}>
                    {getTrendIcon(prediction.trend)}
                    <span className="capitalize">{prediction.trend}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">₹{prediction.currentPrice}</span>
                  <span className={`text-sm font-medium ${
                    prediction.potentialProfit > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {prediction.potentialProfit > 0 ? '+' : ''}{prediction.potentialProfit.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="lg:col-span-2">
          {selectedCommodity && (
            <motion.div
              key={selectedCommodity.commodity}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Chart */}
              <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                <Line data={getChartData(selectedCommodity)} options={chartOptions} />
              </div>
              


              {/* Analysis Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <motion.div 
                  className="bg-white rounded-lg p-4 shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Target className="w-6 h-6 text-purple-600" />
                    <h4 className="font-semibold text-gray-800">Optimal Strategy</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{selectedCommodity.recommendation}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Best sell date:</span>
                    <span className="font-medium">{new Date(selectedCommodity.optimalSellDate).toLocaleDateString()}</span>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white rounded-lg p-4 shadow-md"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Brain className="w-6 h-6 text-green-600" />
                    <h4 className="font-semibold text-gray-800">AI Confidence</h4>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next 7 days:</span>
                      <span className="font-medium">{selectedCommodity.predictedPrices[2].confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next 30 days:</span>
                      <span className="font-medium">{selectedCommodity.predictedPrices[5].confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedCommodity.predictedPrices[2].confidence}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Market Factors */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-800 mb-4">📊 Key Market Factors</h4>
                <div className="space-y-3">
                  {selectedCommodity.factors.map((factor, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-sm text-gray-700">{factor}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};