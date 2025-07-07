import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface DiagnosisResult {
  disease: string;
  confidence: number;
  treatment: string;
  prevention: string;
  severity: 'low' | 'medium' | 'high';
}

export const CropDiagnosis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real implementation, this would call Vertex AI)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult: DiagnosisResult = {
      disease: 'Tomato Leaf Blight',
      confidence: 87,
      treatment: 'Apply copper-based fungicide spray every 7-10 days. Remove affected leaves immediately.',
      prevention: 'Ensure proper spacing, avoid overhead watering, and apply preventive fungicide during monsoon.',
      severity: 'medium'
    };
    
    setResult(mockResult);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crop Disease Diagnosis</h2>
        <p className="text-gray-600">Upload a photo of your crop to get instant diagnosis</p>
      </div>

      <div className="space-y-6">
        {/* Image Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          {selectedImage ? (
            <div className="space-y-4">
              <img 
                src={selectedImage} 
                alt="Uploaded crop" 
                className="w-full max-w-md mx-auto rounded-lg shadow-md"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <Camera className="w-12 h-12 text-gray-400" />
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600">Click to upload or take a photo</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          className="hidden"
        />

        {!selectedImage && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Take Photo / Upload Image
          </button>
        )}

        {selectedImage && !result && (
          <button
            onClick={analyzeCrop}
            disabled={isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            {isAnalyzing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>Analyze Crop</span>
              </>
            )}
          </button>
        )}

        {/* Results */}
        {result && (
          <div className="bg-gray-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Diagnosis Results</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                {result.severity.toUpperCase()} Risk
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Disease Identified</h4>
                <p className="text-gray-800">{result.disease}</p>
                <p className="text-sm text-gray-600">Confidence: {result.confidence}%</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Treatment</h4>
                <p className="text-gray-800">{result.treatment}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Prevention</h4>
                <p className="text-gray-800">{result.prevention}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm">Analysis complete</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};