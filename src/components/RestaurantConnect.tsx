import React, { useState, useEffect } from 'react';
import { Store, Phone, MapPin, Star, Clock, Truck } from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useLanguage } from '../contexts/LanguageContext';

interface Restaurant {
  id: string;
  name: string;
  type: string;
  location: string;
  phone: string;
  rating: number;
  requirements: string[];
  priceRange: string;
  deliveryTime: string;
  image: string;
}

interface Order {
  restaurantId: string;
  farmerName: string;
  phone: string;
  produce: string;
  quantity: number;
  expectedPrice: number;
}

export const RestaurantConnect: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState<Partial<Order>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      // In a real app, this would fetch from Firebase
      const mockRestaurants: Restaurant[] = [
        {
          id: '1',
          name: 'Coastal Flavours Cafe',
          type: 'Seafood & Multi-Cuisine',
          location: 'Dahanu Road, Maharashtra',
          phone: '+91 88990 12345',
          rating: 4.5,
          requirements: ['Local Rice', 'Aamras Mangoes', 'Kokum'], // Targeting Dahanu produce
          priceRange: '₹30-50/unit',
          deliveryTime: '1-2 days',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
        },
        {
          id: '2',
          name: 'Wadi Vibe Bistro',
          type: 'Vegan & Health Food',
          location: 'Gholvad, Dahanu, Maharashtra',
          phone: '+91 88990 12346',
          rating: 4.3,
          requirements: ['Chikoo (Sapota)', 'Cashews', 'Seasonal Leafy Greens'], // Targeting Gholvad produce
          priceRange: '₹25-45/kg',
          deliveryTime: '1 day',
          image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'
        },
        {
          id: '3',
          name: 'Palghar Puranpoli House',
          type: 'Authentic Maharashtrian',
          location: 'Palghar, Maharashtra',
          phone: '+91 88990 12347',
          rating: 4.7,
          requirements: ['Jowar', 'Bajra', 'Peanuts', 'Red Chillies'], 
          priceRange: '₹18-30/kg',
          deliveryTime: '2-3 days',
          image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
        },
        {
          id: '4',
          name: 'Boisar Bhajiwala',
          type: 'Local Vegetable Wholesaler',
          location: 'Boisar, Palghar, Maharashtra',
          phone: '+91 77665 44321',
          rating: 4.1,
          requirements: ['Potatoes', 'Onions', 'Cauliflower', 'Cabbage'], 
          priceRange: '₹10-20/kg',
          deliveryTime: 'Next day',
          image: 'https://images.pexels.com/photos/4051052/pexels-photo-4051052.jpeg' // New image for variety
        },
        {
          id: '5',
          name: 'Tarapur Tandoor Express',
          type: 'North Indian & Punjabi',
          location: 'Tarapur, Maharashtra',
          phone: '+91 77665 44322',
          rating: 4.4,
          requirements: ['Coriander', 'Ginger', 'Garlic', 'Assorted Spices'], 
          priceRange: '₹50-100/bundle',
          deliveryTime: '2 days',
          image: 'https://images.pexels.com/photos/4051054/pexels-photo-4051054.jpeg'
        },
        {
          id: '6',
          name: 'Mumbai Fresh Catering',
          type: 'Large-scale Catering Service',
          location: 'Mira Road (Serves Palghar/Dahanu)',
          phone: '+91 77665 44323',
          rating: 4.8,
          requirements: ['Bulk Tomato', 'Bulk Onion', 'All Fresh Produce'], 
          priceRange: 'Negotiable',
          deliveryTime: '3-4 days',
          image: 'https://images.pexels.com/photos/4051055/pexels-photo-4051055.jpeg'
        }
      ];
      
      setRestaurants(mockRestaurants);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would save to Firebase
      console.log('Order submitted:', orderForm);
      alert('Order request sent successfully! The restaurant will contact you within 24 hours.');
      setShowOrderForm(false);
      setOrderForm({});
      setSelectedRestaurant(null);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading restaurant partners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Restaurant Connect</h2>
        <p className="text-gray-600">Connect directly with restaurants and food chains for bulk orders</p>
      </div>

      {!showOrderForm ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{restaurant.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-green-600 font-medium mb-2">{restaurant.type}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{restaurant.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{restaurant.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Delivery: {restaurant.deliveryTime}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-1">
                    {restaurant.requirements.map((req, index) => (
                      <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{restaurant.priceRange}</span>
                  <button
                    onClick={() => {
                      setSelectedRestaurant(restaurant);
                      setShowOrderForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => {
                setShowOrderForm(false);
                setSelectedRestaurant(null);
              }}
              className="text-green-600 hover:text-green-700 font-medium mb-4"
            >
              ← Back to Restaurants
            </button>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Connect with {selectedRestaurant?.name}
            </h3>
            <p className="text-gray-600">Fill out the form below to send your produce offer</p>
          </div>
          
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={orderForm.farmerName || ''}
                  onChange={(e) => setOrderForm({...orderForm, farmerName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={orderForm.phone || ''}
                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produce Type
              </label>
              <select
                required
                value={orderForm.produce || ''}
                onChange={(e) => setOrderForm({...orderForm, produce: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select produce</option>
                {selectedRestaurant?.requirements.map((req) => (
                  <option key={req} value={req}>{req}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={orderForm.quantity || ''}
                  onChange={(e) => setOrderForm({...orderForm, quantity: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Price (₹/kg)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={orderForm.expectedPrice || ''}
                  onChange={(e) => setOrderForm({...orderForm, expectedPrice: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Truck className="w-5 h-5" />
              <span>Send Offer</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};