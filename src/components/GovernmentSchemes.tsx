import React, { useState } from 'react';
import { FileText, ExternalLink, Search, Filter } from 'lucide-react';

interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string[];
  benefits: string;
  applicationLink: string;
  category: string;
  deadline?: string;
}

export const GovernmentSchemes: React.FC = () => {
  const [schemes] = useState<Scheme[]>([
    {
      id: '1',
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      eligibility: ['Small and marginal farmers', 'Landholding up to 2 hectares'],
      benefits: '₹6,000 per year in 3 installments',
      applicationLink: 'https://pmkisan.gov.in',
      category: 'Income Support'
    },
    {
      id: '2',
      name: 'Krishi Sinchai Yojana',
      description: 'Micro irrigation and water conservation',
      eligibility: ['All farmers', 'Priority to small farmers'],
      benefits: '90% subsidy for SC/ST, 80% for others',
      applicationLink: 'https://pmksy.gov.in',
      category: 'Irrigation'
    },
    {
      id: '3',
      name: 'Soil Health Card',
      description: 'Free soil testing and nutrient recommendations',
      eligibility: ['All farmers with agricultural land'],
      benefits: 'Free soil testing every 2 years',
      applicationLink: 'https://soilhealth.dac.gov.in',
      category: 'Soil Management'
    },
    {
      id: '4',
      name: 'Kisan Credit Card',
      description: 'Easy credit for agricultural needs',
      eligibility: ['Farmers with agricultural land', 'Share croppers'],
      benefits: 'Credit up to ₹3 lakh at 4% interest',
      applicationLink: 'https://kcc.gov.in',
      category: 'Credit'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Income Support', 'Irrigation', 'Soil Management', 'Credit'];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Government Schemes</h2>
        <p className="text-gray-600">Find and apply for agricultural subsidies and schemes</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{scheme.name}</h3>
                  <span className="text-sm text-green-600 font-medium">{scheme.category}</span>
                </div>
              </div>
              {scheme.deadline && (
                <span className="text-sm text-red-600 font-medium">
                  Deadline: {scheme.deadline}
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-4">{scheme.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Eligibility</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scheme.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Benefits</h4>
                <p className="text-sm text-gray-600">{scheme.benefits}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Apply online</span>
              <a
                href={scheme.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No schemes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};