import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Search, MapPin } from 'lucide-react';

interface MarketPrice {
  commodity: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  market: string;
  date: string;
}

export const MarketPrices: React.FC = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call (in real implementation, this would fetch from market APIs)
    const fetchPrices = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockPrices: MarketPrice[] = [
        {
          commodity: 'Tomato',
          price: 45,
          unit: 'per kg',
          trend: 'up',
          change: 12,
          market: 'Mysore APMC',
          date: '2025-01-19'
        },
        {
          commodity: 'Onion',
          price: 28,
          unit: 'per kg',
          trend: 'down',
          change: -5,
          market: 'Bangalore APMC',
          date: '2025-01-19'
        },
        {
          commodity: 'Potato',
          price: 22,
          unit: 'per kg',
          trend: 'stable',
          change: 0,
          market: 'Hassan APMC',
          date: '2025-01-19'
        },
        {
          commodity: 'Cabbage',
          price: 15,
          unit: 'per kg',
          trend: 'up',
          change: 8,
          market: 'Mandya APMC',
          date: '2025-01-19'
        }
      ];
      
      setPrices(mockPrices);
      setLoading(false);
    };

    fetchPrices();
  }, []);

  const filteredPrices = prices.filter(price =>
    price.commodity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Fetching latest market prices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Market Prices</h2>
        <p className="text-gray-600">Real-time prices from Karnataka APMCs</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for commodity..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrices.map((price, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-800">{price.commodity}</h3>
              <div className="flex items-center space-x-1">
                {getTrendIcon(price.trend)}
                <span className={`text-sm font-medium ${getTrendColor(price.trend)}`}>
                  {price.change > 0 ? '+' : ''}{price.change}%
                </span>
              </div>
            </div>
            
            <div className="mb-3">
              <span className="text-2xl font-bold text-gray-800">₹{price.price}</span>
              <span className="text-gray-600 ml-2">{price.unit}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{price.market}</span>
              </div>
              <span>{price.date}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredPrices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No commodities found matching your search.</p>
        </div>
      )}

      {/* Price Alert */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Price Alert</h4>
        <p className="text-blue-700 text-sm">
          Tomato prices have increased by 12% in the last week. Consider selling if you have ready stock.
        </p>
      </div>
    </div>
  );
};