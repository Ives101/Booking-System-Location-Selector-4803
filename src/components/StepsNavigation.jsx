import React from 'react';
import { motion } from 'framer-motion';

const StepsNavigation = ({ steps, currentStep, onStepClick }) => {
  return (
    <nav id="steps-nav" className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="booking-info flex-1">
            <ul className="flex items-center justify-between max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <li key={step.id} className="flex-1 relative">
                  <button
                    onClick={() => onStepClick(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      index === currentStep 
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200' 
                        : index < currentStep 
                          ? 'bg-green-50 text-green-600 hover:bg-green-100 cursor-pointer' 
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={index > currentStep}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mr-3 ${
                        index === currentStep 
                          ? 'bg-blue-600 text-white' 
                          : index < currentStep 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-300 text-gray-500'
                      }`}>
                        {index < currentStep ? '✓' : index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm">{step.title}</div>
                        {step.subtitle && (
                          <div className="text-xs text-gray-500 truncate">{step.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gray-200 z-10">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: index < currentStep ? '100%' : '0%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StepsNavigation;