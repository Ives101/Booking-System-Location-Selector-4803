import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimeZoneDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date, timezone) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone,
      hour12: true
    });
  };

  const companyTimezone = 'America/Los_Angeles';
  const userTimezone = 'America/Tijuana';

  return (
    <div className="bg-blue-50 border-b border-blue-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 mr-2">Our time:</span>
              <span className="text-blue-600 font-medium">
                {formatTime(currentTime, companyTimezone)} {companyTimezone.replace('_', ' ')}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-800 mr-2">Your time:</span>
              <span className="text-blue-600 font-medium">
                {formatTime(currentTime, userTimezone)} {userTimezone.replace('_', ' ')}
              </span>
            </div>
          </div>

          <motion.button
            onClick={() => setShowTimezoneModal(true)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Change my timezone
          </motion.button>
        </div>

        {showTimezoneModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTimezoneModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Timezone</h3>
              <p className="text-gray-600 mb-6">Timezone selection functionality coming soon...</p>
              <button
                onClick={() => setShowTimezoneModal(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TimeZoneDisplay;