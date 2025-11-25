import React, { useState, useEffect } from 'react';
import { Package, Truck, Store, QrCode, Shield, Clock, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TraceabilityRecord {
  id: string;
  productName: string;
  batchId: string;
  farmer: {
    name: string;
    location: string;
    certification: string[];
  };
  journey: Array<{
    stage: string;
    timestamp: string;
    location: string;
    handler: string;
    temperature?: number;
    quality: number;
    verified: boolean;
  }>;
  currentStatus: string;
  qrCode: string;
  certificates: string[];
  sustainabilityScore: number;
}

export const BlockchainTraceability: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<TraceabilityRecord | null>(null);
  const [products, setProducts] = useState<TraceabilityRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    fetchTraceabilityData();
  }, []);

  const fetchTraceabilityData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Data tailored for Maharashtra (Dahanu Chikoo)
    const mockProducts: TraceabilityRecord[] = [
      {
        id: '1',
        productName: 'Premium Dahanu Chikoo',
        batchId: 'CHK-MUM-042',
        farmer: {
          name: 'Sanjay Patil',
          location: 'Gholvad, Palghar, Maharashtra',
          certification: ['GI Tag Verified', 'Sustainable Farming', 'Rainfed'],
        },
        journey: [
          {
            stage: 'Harvesting',
            timestamp: '2025-11-24T06:00:00Z',
            location: 'Gholvad Orchard',
            handler: 'Sanjay Patil',
            quality: 98,
            verified: true
          },
          {
            stage: 'Pre-Sorting & Crating',
            timestamp: '2025-11-24T10:00:00Z',
            location: 'Collection Center - Dahanu',
            handler: 'Palghar Farmer Co-op',
            temperature: 25, // Ambient
            quality: 97,
            verified: true
          },
          {
            stage: 'Transportation (to APMC)',
            timestamp: '2025-11-24T16:00:00Z',
            location: 'Mumbai-Ahmedabad Highway (NH 48)',
            handler: 'Konkan Logistics',
            temperature: 18, // Ventilated Truck
            quality: 96,
            verified: true
          },
          {
            stage: 'Wholesale Market Arrival',
            timestamp: '2025-11-25T03:00:00Z',
            location: 'APMC Market, Vashi, Navi Mumbai',
            handler: 'Mumbai Mandi Wholesaler',
            quality: 95,
            verified: true
          },
          {
            stage: 'Retail/Supermarket Distribution',
            timestamp: '2025-11-25T10:00:00Z',
            location: 'Local Retailer - Pune',
            handler: 'Pune Fresh Grocers',
            quality: 95,
            verified: true
          }
        ],
        currentStatus: 'En Route to Pune Retailer',
        qrCode: 'CHK-MUM-042-QR',
        certificates: ['GI Tag', 'FSSAI Mandi Entry Permit', 'Traceability Compliance'],
        sustainabilityScore: 95
      }
    ];
    
    setProducts(mockProducts);
    setSelectedProduct(mockProducts[0]);
    setLoading(false);
  };

  const getStageIcon = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'planting': return <Package className="w-5 h-5" />;
      case 'harvesting': return <Package className="w-5 h-5" />;
      case 'pre-sorting & crating': return <Store className="w-5 h-5" />;
      case 'transportation (to apmc)': return <Truck className="w-5 h-5" />;
      case 'wholesale market arrival': return <Store className="w-5 h-5" />;
      case 'retail/supermarket distribution': return <Store className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <motion.div 
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Loading Maharashtra blockchain records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔗 Blockchain Traceability (Maharashtra Focus)</h2>
        <p className="text-gray-600">Complete farm-to-fork transparency with immutable records for key state produce.</p>
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Info */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedProduct.productName}</h3>
                <div className="text-sm text-gray-600 mb-4">Batch: {selectedProduct.batchId}</div>
                
                <motion.button
                  onClick={() => setShowQR(!showQR)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <QrCode className="w-4 h-4" />
                  <span>{showQR ? 'Hide' : 'Show'} QR Code</span>
                </motion.button>
                
                {showQR && (
                  <motion.div 
                    className="mt-4 p-4 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-gray-600" />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">QR Code: {selectedProduct.qrCode}</p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">👨‍🌾 Farmer Details (Gholvad, Palghar)</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.farmer.name}</p>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedProduct.farmer.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedProduct.farmer.certification.map((cert, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🌱 Sustainability Score</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProduct.sustainabilityScore}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-green-600">{selectedProduct.sustainabilityScore}%</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">📜 Certificates</h4>
                  <div className="space-y-1">
                    {selectedProduct.certificates.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Journey Timeline */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">🛤️ Product Journey (Dahanu to Mumbai)</h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                
                <div className="space-y-6">
                  {selectedProduct.journey.map((step, index) => (
                    <motion.div 
                      key={index}
                      className="relative flex items-start space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      {/* Timeline Dot */}
                      <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full ${
                        step.verified ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {getStageIcon(step.stage)}
                        {step.verified && (
                          <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-green-600 bg-white rounded-full" />
                        )}
                      </div>
                      
                      {/* Step Content */}
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-800">{step.stage}</h4>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {new Date(step.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Location:</span>
                            <p className="font-medium">{step.location}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Handler:</span>
                            <p className="font-medium">{step.handler}</p>
                          </div>
                          {step.temperature !== undefined && (
                            <div>
                              <span className="text-gray-600">Temperature:</span>
                              <p className="font-medium">{step.temperature}°C</p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Quality:</span>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${step.quality}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{step.quality}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Current Status: {selectedProduct.currentStatus}</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  All stages verified on **{selectedProduct.certificates[0]}** blockchain record. Complete transparency guaranteed.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};