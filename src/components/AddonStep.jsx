import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { FiPlus, FiCheck, FiInfo } from 'react-icons/fi';

const AddonStep = ({ addons, selectedAddons, onAddonToggle, onContinue }) => {
  const [expandedAddon, setExpandedAddon] = useState(null);

  const toggleAddonInfo = (addonId) => {
    setExpandedAddon(expandedAddon === addonId ? null : addonId);
  };

  const isSelected = (addonId) => {
    return selectedAddons.some(addon => addon.id === addonId);
  };

  return (
    <div className="addon-step">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Enhance Your Service</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Customize your experience with these optional add-ons to make your service even more valuable.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {addons.map((addon) => (
          <motion.div 
            key={addon.id}
            className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: addon.id * 0.05 }}
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                {addon.image ? (
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                    <img 
                      src={addon.image} 
                      alt={addon.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-md bg-blue-100 text-blue-600 flex-shrink-0 mr-4 flex items-center justify-center">
                    <SafeIcon icon={FiPlus} className="w-6 h-6" />
                  </div>
                )}
                
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{addon.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-3">{addon.duration}</span>
                    <span className="font-medium text-gray-800">{addon.price}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center ml-4">
                <button 
                  onClick={() => toggleAddonInfo(addon.id)}
                  className="p-2 text-gray-500 hover:text-blue-600 mr-2"
                  aria-label="Show more information"
                >
                  <SafeIcon icon={FiInfo} className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={() => onAddonToggle(addon)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                    isSelected(addon.id) 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                  aria-label={isSelected(addon.id) ? "Remove add-on" : "Add add-on"}
                >
                  <SafeIcon 
                    icon={isSelected(addon.id) ? FiCheck : FiPlus} 
                    className="w-5 h-5" 
                  />
                </button>
              </div>
            </div>
            
            {expandedAddon === addon.id && (
              <motion.div 
                className="px-5 pb-5 pt-0 border-t border-gray-100"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="text-gray-600 text-sm pt-4" dangerouslySetInnerHTML={{ __html: addon.description }} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinue}
          className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AddonStep;