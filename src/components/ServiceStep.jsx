import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from './ServiceModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiDollarSign } = FiIcons;

const ServiceStep = ({ services, onServiceSelect, selectedService }) => {
  const [modalService, setModalService] = useState(null);

  const handleServiceClick = (service) => {
    setModalService(service);
  };

  const closeModal = () => {
    setModalService(null);
  };

  return (
    <div className="service-step">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="service-item bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: service.id * 0.05 }}
          >
            <div className="relative">
              <button
                onClick={() => handleServiceClick(service)}
                className="w-full h-48 overflow-hidden group"
              >
                <img
                  src={service.image}
                  alt={`Service ${service.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                <div className="text-gray-600 text-sm line-clamp-3 mb-3" dangerouslySetInnerHTML={{ __html: service.shortDescription }} />
                <button 
                  onClick={() => handleServiceClick(service)}
                  className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
                >
                  Read more
                </button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <SafeIcon icon={FiClock} className="mr-1 text-gray-500" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center font-semibold text-gray-800">
                  <SafeIcon icon={FiDollarSign} className="mr-1 text-gray-500" />
                  <span>{service.price}</span>
                </div>
              </div>

              <div className="flex">
                <button
                  onClick={() => onServiceSelect(service)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Select
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modalService && (
          <ServiceModal 
            service={modalService}
            onClose={closeModal}
            onSelect={onServiceSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceStep;