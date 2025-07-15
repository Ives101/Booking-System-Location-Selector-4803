import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiClock, FiDollarSign } = FiIcons;

const ServiceModal = ({ service, onClose, onSelect }) => {
  const handleSelect = () => {
    onSelect(service);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-600" />
          </button>

          <div className="h-64 overflow-hidden">
            <img
              src={service.image}
              alt={`Service ${service.name}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h2>
            
            <div className="flex items-center justify-between text-sm mb-4">
              <div className="flex items-center text-gray-600">
                <SafeIcon icon={FiClock} className="mr-1" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center font-semibold text-gray-800">
                <SafeIcon icon={FiDollarSign} className="mr-1" />
                <span>{service.price}</span>
              </div>
            </div>
            
            <div className="text-gray-600 mb-6 leading-relaxed service-description" dangerouslySetInnerHTML={{ __html: service.fullDescription }} />

            <div className="flex gap-3">
              <button
                onClick={handleSelect}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Select This Service
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceModal;