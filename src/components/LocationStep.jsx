import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LocationModal from './LocationModal';

const LocationStep = ({ locations, onLocationSelect, selectedLocation }) => {
  const [modalLocation, setModalLocation] = useState(null);

  const handleLocationClick = (location) => {
    setModalLocation(location);
  };

  const closeModal = () => {
    setModalLocation(null);
  };

  return (
    <div className="location-step">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {locations.map((location) => (
          <motion.div
            key={location.id}
            className="location-item bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: location.id * 0.1 }}
          >
            <div className="relative">
              <button
                onClick={() => handleLocationClick(location)}
                className="w-full h-48 overflow-hidden group"
              >
                <img
                  src={location.image}
                  alt={`Location ${location.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{location.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{location.description}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onLocationSelect(location)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Select
                </button>
                <button
                  onClick={() => handleLocationClick(location)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalLocation && (
          <LocationModal 
            location={modalLocation}
            onClose={closeModal}
            onSelect={onLocationSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationStep;