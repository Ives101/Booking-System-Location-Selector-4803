import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiCheck, FiInfo, FiDollarSign, FiClock } = FiIcons;

const AddonStep = ({ addons, selectedAddons, onAddonToggle, onContinue, selectedService }) => {
  const [expandedAddon, setExpandedAddon] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  // Calculate base time from service duration
  useEffect(() => {
    const calculateServiceTime = (duration) => {
      const timeMatch = duration.match(/(\d+)\s*hr\.?\s*(?:(\d+)\s*mins?)?/i);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1]) || 0;
        const minutes = parseInt(timeMatch[2]) || 0;
        return hours * 60 + minutes;
      }
      return 0;
    };

    const baseTime = calculateServiceTime(selectedService?.duration || '0 hr');
    const addonsTime = selectedAddons.reduce((total, addon) => {
      // Extract time from addon duration (assuming format: "30 mins" or "1 hr" etc.)
      const addonTime = calculateServiceTime(addon.duration || '0 hr');
      return total + addonTime;
    }, 0);

    setTotalTime(baseTime + addonsTime);
  }, [selectedAddons, selectedService]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : ''} ${mins > 0 ? `${mins} mins` : ''}`.trim();
  };

  const isSelected = (addonId) => {
    return selectedAddons.some(addon => addon.id === addonId);
  };

  const calculateTotal = () => {
    return selectedAddons.reduce((total, addon) => {
      const price = parseFloat(addon.price.replace('$', '').replace(',', ''));
      return total + price;
    }, 0);
  };

  return (
    <div className="addon-step">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Enhance Your Service
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Customize your experience with additional services
        </p>
      </div>

      {/* Service Summary */}
      <div className="max-w-4xl mx-auto mb-8 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">Selected Service</h3>
            <p className="text-blue-600">{selectedService?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-600">
              <SafeIcon icon={FiClock} className="mr-1" />
              <span>{selectedService?.duration}</span>
            </div>
            <div className="flex items-center font-medium text-gray-800">
              <SafeIcon icon={FiDollarSign} className="mr-1" />
              <span>{selectedService?.price}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {addons.map((addon) => (
          <motion.div
            key={addon.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 flex items-center space-x-4">
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={addon.image}
                  alt={addon.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-gray-800">{addon.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {addon.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="font-medium text-gray-800">{addon.price}</span>
                  {addon.duration && (
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="mr-1" />
                      <span>+{addon.duration}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onAddonToggle(addon)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    isSelected(addon.id)
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <SafeIcon
                    icon={isSelected(addon.id) ? FiCheck : FiPlus}
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex gap-6">
            <div className="text-gray-600">
              <span className="block text-sm">Total Time</span>
              <span className="font-medium text-gray-800">{formatTime(totalTime)}</span>
            </div>
            <div className="text-gray-600">
              <span className="block text-sm">Total Price</span>
              <span className="font-medium text-gray-800">${(calculateTotal() + parseFloat(selectedService?.price.replace('$', '').replace(',', '') || 0)).toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={onContinue}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddonStep;