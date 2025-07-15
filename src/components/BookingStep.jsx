import React, { useState } from 'react';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import { motion } from 'framer-motion';

const { FiMapPin, FiPackage, FiPlus, FiChevronDown, FiChevronUp, FiDollarSign, FiClock } = FiIcons;

const BookingStep = ({ selectedService, selectedAddons, selectedLocation }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Calculate total cost
  const calculateTotal = () => {
    const servicePrice = parseFloat(selectedService?.price.replace('$', '').replace(',', '') || 0);
    const addonsTotal = selectedAddons.reduce((total, addon) => {
      const price = parseFloat(addon.price.replace('$', '').replace(',', ''));
      return total + price;
    }, 0);
    return (servicePrice + addonsTotal).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Book Your Appointment
        </h2>

        {/* Calendar Placeholder */}
        <div className="bg-gray-50 rounded-lg p-8 text-center mb-8">
          <p className="text-gray-500">Calendar integration coming soon...</p>
        </div>

        {/* Booking Summary */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Booking Summary
          </h3>
          <div className="space-y-4">
            {/* Service */}
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-24 font-medium text-gray-600">Service:</div>
                <div className="flex-1">
                  <div className="text-gray-800 font-medium">{selectedService?.name}</div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center">
                      <SafeIcon icon={FiClock} className="mr-1" />
                      <span>{selectedService?.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <SafeIcon icon={FiDollarSign} className="mr-1" />
                      <span>{selectedService?.price}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className={`${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
                      <div dangerouslySetInnerHTML={{ __html: selectedService?.fullDescription }} />
                    </div>
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-blue-600 hover:text-blue-800 mt-1 flex items-center"
                    >
                      {isDescriptionExpanded ? (
                        <>
                          Read less
                          <SafeIcon icon={FiChevronUp} className="ml-1" />
                        </>
                      ) : (
                        <>
                          Read more
                          <SafeIcon icon={FiChevronDown} className="ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start">
              <div className="w-24 font-medium text-gray-600">Location:</div>
              <div className="flex-1 text-gray-800">{selectedLocation?.name}</div>
            </div>

            {/* Add-ons */}
            <div className="flex items-start">
              <div className="w-24 font-medium text-gray-600">Add-ons:</div>
              <div className="flex-1">
                {selectedAddons.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAddons.map(addon => (
                      <div key={addon.id} className="flex justify-between items-center">
                        <span className="text-gray-800">{addon.name}</span>
                        <span className="text-gray-600">{addon.price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-600">No add-ons selected</div>
                )}
              </div>
            </div>

            {/* Total Cost */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Total Cost:</span>
                <span className="text-xl font-semibold text-blue-600">${calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStep;