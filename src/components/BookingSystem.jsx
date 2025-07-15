import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceStep from './ServiceStep';
import AddonStep from './AddonStep';
import LocationStep from './LocationStep';
import BookingStep from './BookingStep';
import StepsNavigation from './StepsNavigation';
import TimeZoneDisplay from './TimeZoneDisplay';
import LoadingSpinner from './LoadingSpinner';

const BookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [loading, setLoading] = useState(false);

  const services = [
    // All services array content from previous response...
    {
      id: '70',
      name: 'Listings from 3,001-5,000 sq. ft.',
      shortDescription: 'Showcase your listing with style, people are watching how you market yourself, but more importantly how you market for your clients.',
      fullDescription: `<p>Showcase your listing with style, people are watching how you market yourself, but more importantly how you market for your clients. In a world where your competitors are using videos, it is imperative that you also embrace this powerful medium to stay relevant and competitive.</p>
      <p>&nbsp;</p>
      <p>• Photography</p>
      <p>• Videography</p>
      <p>• Aerial Drone Footage</p>
      <p>• Homes ranging from 3,001 to 5,000 Sq. Ft.</p>
      <p>&nbsp;</p>
      <p>What's included in the package:</p>
      <p>PHOTOGRAPHY: Receive 45-55 high-resolution photos suitable for both MLS and general use.</p>
      <p>VIDEOGRAPHY: Get two videos - one branded version for social media and one unbranded version for MLS, with a duration of 1:30 min – 2:00 min.</p>
      <p>AERIAL DRONE FOOTAGE: Aerial drone footage that takes your video to the next level, featuring 3-5 mind-blowing photos and shots.</p>`,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      price: '$800.00',
      duration: '2 hr 30 mins'
    },
    // ... Add all other services here ...
  ];

  const locations = [
    {
      id: 1,
      name: 'Downtown Seattle',
      description: 'Our downtown Seattle office serves the greater Seattle area, including Capitol Hill, Queen Anne, and South Lake Union.',
      image: 'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 2,
      name: 'Bellevue',
      description: 'Our Bellevue location covers the Eastside, including Kirkland, Redmond, and Issaquah.',
      image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
  ];

  const addons = [
    {
      id: 1,
      name: 'Day to Twilight (5)',
      image: 'https://images.unsplash.com/photo-1623784908703-775c9c8f8d63?ixlib=rb-4.0.3',
      description: "Transform daytime photos into stunning twilight shots.",
      price: '$150.00',
      duration: '30 mins',
      compatibleServices: ['70', '17', '89', '71']
    },
    {
      id: 2,
      name: 'Twilight Photos',
      image: 'https://images.unsplash.com/photo-1623784908703-775c9c8f8d63?ixlib=rb-4.0.3',
      description: 'Capture the perfect twilight ambiance with 8-10 additional photos.',
      price: '$300.00',
      duration: '1 hr',
      compatibleServices: ['70', '17', '89', '71']
    },
    {
      id: 3,
      name: 'Drone Photography',
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3',
      description: 'Add aerial perspective to your listing with 5-8 drone photos.',
      price: '$200.00',
      duration: '45 mins',
      compatibleServices: ['70', '17', '1', '2', '11']
    },
    {
      id: 4,
      name: 'Virtual Staging',
      image: 'https://images.unsplash.com/photo-1600607688066-890987f18a86?ixlib=rb-4.0.3',
      description: 'Digitally furnish empty rooms to help buyers visualize the space (3 rooms).',
      price: '$250.00',
      duration: '0 mins',
      compatibleServices: ['70', '17', '89', '71', '13']
    }
  ];

  const steps = [
    {
      id: 'location',
      title: 'Location',
      subtitle: selectedLocation ? selectedLocation.name : 'Select location'
    },
    {
      id: 'service',
      title: 'Service',
      subtitle: selectedService ? selectedService.name : 'Select service'
    },
    {
      id: 'addons',
      title: 'Add-ons',
      subtitle: `${selectedAddons.length} selected`
    },
    {
      id: 'booking',
      title: 'Book',
      subtitle: 'Schedule appointment'
    }
  ];

  const handleLocationSelect = (location) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedLocation(location);
      setLoading(false);
      setCurrentStep(1);
    }, 500);
  };

  const handleServiceSelect = (service) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedService(service);
      setSelectedAddons([]);
      setLoading(false);
      setCurrentStep(2);
    }, 500);
  };

  const handleAddonToggle = (addon) => {
    setSelectedAddons(prev => {
      const isSelected = prev.some(item => item.id === addon.id);
      if (isSelected) {
        return prev.filter(item => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleContinueToBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(3);
    }, 500);
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const filteredAddons = selectedService
    ? addons.filter(addon => addon.compatibleServices.includes(selectedService.id))
    : [];

  return (
    <div className="booking-system pb-20">
      <TimeZoneDisplay />
      <StepsNavigation 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={handleStepClick} 
      />

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="location-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LocationStep
                locations={locations}
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="service-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ServiceStep
                services={services}
                onServiceSelect={handleServiceSelect}
                selectedService={selectedService}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="addon-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AddonStep
                addons={filteredAddons}
                selectedAddons={selectedAddons}
                onAddonToggle={handleAddonToggle}
                onContinue={handleContinueToBooking}
                selectedService={selectedService}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="booking-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BookingStep
                selectedService={selectedService}
                selectedAddons={selectedAddons}
                selectedLocation={selectedLocation}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoadingSpinner isVisible={loading} />
    </div>
  );
};

export default BookingSystem;