import React, { useState, useEffect } from 'react';
import { Thermometer, MapPin, Phone, Calendar, Package, AlertCircle } from 'lucide-react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useLanguage } from '../contexts/LanguageContext';

// --- INTERFACES ---

interface ColdStorageFacility {
  id: string;
  name: string;
  location: string;
  phone: string;
  capacity: number;
  availableSpace: number;
  temperature: string;
  pricePerKg: number;
  facilities: string[];
  rating: number;
  image: string;
}

interface BookingRequest {
  facilityId: string;
  farmerName: string;
  phone: string;
  produce: string;
  quantity: number;
  duration: number;
  startDate: string;
}

// --- COMPONENT START ---

export const ColdStorage: React.FC = () => {
  const [facilities, setFacilities] = useState<ColdStorageFacility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<ColdStorageFacility | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState<Partial<BookingRequest>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      // Mock facility data
      const mockFacilities: ColdStorageFacility[] = [
        {
          id: '1',
          name: 'Palghar Agri-Cooling Hub',
          location: 'Palghar MIDC, Maharashtra',
          phone: '+91 88812 34001',
          capacity: 1500,
          availableSpace: 450,
          temperature: '2-8°C',
          pricePerKg: 2.8,
          facilities: ['24/7 Monitoring', 'Humidity Control', 'Loading Dock', 'Security', 'Forklifts'],
          rating: 4.6,
          image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg'
        },
        {
          id: '2',
          name: 'Dahanu Chikoo Chillers',
          location: 'Gholvad, Dahanu, Maharashtra',
          phone: '+91 88812 34002',
          capacity: 600,
          availableSpace: 550,
          temperature: '0-4°C',
          pricePerKg: 3.2,
          facilities: ['Temperature Alerts', 'Inventory Management', 'Quick Access', 'Insurance', 'Chikoo Specific Chambers'],
          rating: 4.4,
          image: 'https://images.pexels.com/photos/4481260/pexels-photo-4481260.jpeg'
        },
        {
          id: '3',
          name: 'Vada Fresh Preserve',
          location: 'Vada, Palghar, Maharashtra',
          phone: '+91 88812 34003',
          capacity: 1000,
          availableSpace: 120,
          temperature: '1-6°C',
          pricePerKg: 2.6,
          facilities: ['Multi-Temperature Zones', 'Ripening Chambers', 'Packaging Service', 'Transport', 'Weighing Station'],
          rating: 4.8,
          image: 'https://images.pexels.com/photos/4481261/pexels-photo-4481261.jpeg'
        },
        {
          id: '4',
          name: 'Boisar Bulk Storage',
          location: 'Boisar, Palghar, Maharashtra',
          phone: '+91 88812 34004',
          capacity: 2000,
          availableSpace: 850,
          temperature: '4-10°C',
          pricePerKg: 2.1,
          facilities: ['High Capacity Racks', 'Truck Access', 'Power Backup', 'Pest Control'],
          rating: 4.2,
          image: 'https://images.pexels.com/photos/4481262/pexels-photo-4481262.jpeg'
        },
        {
          id: '5',
          name: 'Kalyan Deep Freeze',
          location: 'Kalyan, Thane, Maharashtra',
          phone: '+91 88812 34005',
          capacity: 900,
          availableSpace: 40,
          temperature: '-18°C (Deep Freeze)',
          pricePerKg: 4.5,
          facilities: ['Deep Freeze Zones', 'Ice Cream/Frozen Veg Storage', 'Temperature Loggers'],
          rating: 4.7,
          image: 'https://images.pexels.com/photos/4481263/pexels-photo-4481263.jpeg'
        },
        {
          id: '6',
          name: 'Vasai-Virar Cold Links',
          location: 'Vasai-Virar, Maharashtra',
          phone: '+91 88812 34006',
          capacity: 1800,
          availableSpace: 0,
          temperature: '3-7°C',
          pricePerKg: 2.9,
          facilities: ['Controlled Atmosphere', 'Cross-Docking', 'Insurance', 'Online Inventory'],
          rating: 4.5,
          image: 'https://images.pexels.com/photos/4481264/pexels-photo-4481264.jpeg'
        }
      ];

      setFacilities(mockFacilities);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setLoading(false);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFacility || !bookingForm.farmerName || !bookingForm.phone || !bookingForm.produce || !bookingForm.quantity || !bookingForm.duration || !bookingForm.startDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const fullBooking: BookingRequest = {
      facilityId: selectedFacility.id,
      farmerName: bookingForm.farmerName,
      phone: bookingForm.phone,
      produce: bookingForm.produce,
      quantity: bookingForm.quantity,
      duration: bookingForm.duration,
      startDate: bookingForm.startDate,
    };

    try {
      console.log('Booking submitted:', fullBooking);
      alert('Booking request sent successfully! The facility will contact you within 24 hours.');
      setShowBookingForm(false);
      setBookingForm({});
      setSelectedFacility(null);
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    }
  };

  const calculateTotalCost = () => {
    if (selectedFacility && bookingForm.quantity && bookingForm.duration) {
      return selectedFacility.pricePerKg * 1000 * bookingForm.quantity * bookingForm.duration;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cold storage facilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cold Storage Facilities</h2>
        <p className="text-gray-600">Find and book cold storage space for your produce</p>
      </div>

      {!showBookingForm ? (
        <div className="space-y-6">
          {facilities.map((facility) => (
            <div key={facility.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">

              <div className="flex flex-col lg:flex-row gap-6">

                <img src={facility.image} alt={facility.name} className="w-full lg:w-64 h-48 object-cover rounded-lg" />

                <div className="flex-1">

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{facility.name}</h3>

                      <div className="flex items-center space-x-2 text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{facility.location}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{facility.phone}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">₹{facility.pricePerKg}</div>
                      <div className="text-sm text-gray-600">per kg/day</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <Package className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-800">{facility.capacity} tons</div>
                      <div className="text-xs text-gray-600">Total Capacity</div>
                    </div>

                    <div className="text-center p-3 bg-white rounded-lg">
                      <AlertCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-800">{facility.availableSpace} tons</div>
                      <div className="text-xs text-gray-600">Available</div>
                    </div>

                    <div className="text-center p-3 bg-white rounded-lg">
                      <Thermometer className="w-6 h-6 text-red-600 mx-auto mb-1" />
                      <div className="text-sm font-medium text-gray-800">{facility.temperature}</div>
                      <div className="text-xs text-gray-600">Temperature</div>
                    </div>

                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-lg font-bold text-yellow-600 mb-1">★{facility.rating}</div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Facilities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {facility.facilities.map((fac, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {facility.availableSpace > 300 ? (
                        <span className="text-green-600 font-medium">✓ Good Availability</span>
                      ) : facility.availableSpace > 50 ? (
                        <span className="text-yellow-600 font-medium">⚠ Limited Space</span>
                      ) : (
                        <span className="text-red-600 font-medium">⚠ Almost Full/Full</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedFacility(facility);
                        setBookingForm(prev => ({ ...prev, facilityId: facility.id }));
                        setShowBookingForm(true);
                      }}
                      disabled={facility.availableSpace === 0}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                    >
                      {facility.availableSpace === 0 ? 'Full' : 'Book Now'}
                    </button>
                  </div>

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
                setShowBookingForm(false);
                setSelectedFacility(null);
              }}
              className="text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              ← Back to Facilities
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Book Storage at <strong>{selectedFacility?.name}</strong>
            </h3>

            <p className="text-gray-600">Fill out the form below to reserve cold storage space</p>
          </div>

          <form onSubmit={handleSubmitBooking} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={bookingForm.farmerName || ''}
                  onChange={(e) => setBookingForm({ ...bookingForm, farmerName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={bookingForm.phone || ''}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Produce Type</label>
              <input
                type="text"
                required
                placeholder="e.g., Chikoo, Rice, Tomatoes, Frozen Vegetables"
                value={bookingForm.produce || ''}
                onChange={(e) => setBookingForm({ ...bookingForm, produce: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (tons)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedFacility?.availableSpace}
                  value={bookingForm.quantity || ''}
                  onChange={(e) => setBookingForm({ ...bookingForm, quantity: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={bookingForm.duration || ''}
                  onChange={(e) => setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={bookingForm.startDate || ''}
                  onChange={(e) => setBookingForm({ ...bookingForm, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {bookingForm.quantity && bookingForm.duration && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">
                  Cost Estimate
                </h4>
                <div className="text-blue-700">
                  <p>Quantity: {bookingForm.quantity} tons</p>
                  <p>Duration: {bookingForm.duration} days</p>
                  <p>Rate: ₹{selectedFacility?.pricePerKg}/kg/day</p>
                  <p className="text-lg font-bold mt-2">
                    Total Cost: <strong>₹{calculateTotalCost().toLocaleString()}</strong>
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={!bookingForm.quantity || !bookingForm.duration || !bookingForm.farmerName || !bookingForm.startDate}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Submit Booking Request</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
