import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TimeZoneDisplay from './TimeZoneDisplay';
import StepsNavigation from './StepsNavigation';
import ServiceStep from './ServiceStep';
import LocationStep from './LocationStep';
import AddonStep from './AddonStep';
import LoadingSpinner from './LoadingSpinner';

const BookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    {
      id: 70,
      name: 'Listings from 3,001-5,000 sq. ft.',
      image: '/uploads/navre/image_files/preview/cd3f0a3eaa9bc3cdee0ebfc0fe428323.jpg',
      shortDescription: 'Showcase your listing with style, people are watching how you market yourself, but more importantly how you market for your clients.',
      fullDescription: `<p>Showcase your listing with style, people are watching how you market yourself, but more importantly how you market for your clients. In a world where your competitors are using videos, it is imperative that you also embrace this powerful medium to stay relevant and competitive.</p>
        <p>• Photography</p>
        <p>• Videography</p>
        <p>• Aerial Drone Footage</p>
        <p>• Homes ranging from 3,001 to 5,000 Sq. Ft.</p>
        <p>What's included in the package:</p>
        <p>PHOTOGRAPHY: Receive 45-55 high-resolution photos suitable for both MLS and general use.</p>
        <p>VIDEOGRAPHY: Get two videos - one branded version for social media and one unbranded version for MLS, with a duration of 1:30 min – 2:00 min.</p>
        <p>AERIAL DRONE FOOTAGE: Aerial drone footage that takes your video to the next level, featuring 3-5 mind-blowing photos and shots.</p>`,
      duration: '2 hr. 30 mins.',
      price: '$800.00'
    },
    {
      id: 17,
      name: 'Land Listing Package',
      image: '/uploads/navre/image_files/preview/42c5463d4304942394d948fd05b7d0b2.jpg',
      shortDescription: 'While land listings are undoubtedly appealing, relying solely on photos might not provide the most comprehensive perspective.',
      fullDescription: `<p>While land listings are undoubtedly appealing, relying solely on photos might not provide the most comprehensive perspective. That's why we go the extra mile by enhancing photos with vibrant green outlines and utilizing awe-inspiring drone footage.</p>
        <p>What's included in the package:</p>
        <p>PHOTOGRAPHY: Receive 25-35 high-resolution photos suitable for both MLS and general use.</p>
        <p>VIDEOGRAPHY: Get two videos - one branded version for social media and one unbranded version for MLS, for 60 seconds.</p>
        <p>AERIAL DRONE FOOTAGE: Aerial drone footage that takes your video to the next level.</p>`,
      duration: '1 hr.',
      price: '$500.00'
    },
    {
      id: 89,
      name: 'Luxury Listing Video & Photo 0 - 5,000 Sq Ft - Over 2 Million',
      image: '/uploads/navre/image_files/preview/d2382690f05d3e4695c92e0ba97bd005.jpg',
      shortDescription: 'When it comes to luxury listings, we adopt a distinct approach right from the beginning.',
      fullDescription: `<p>When it comes to luxury listings, we adopt a distinct approach right from the beginning. These exceptional homes are targeted towards a discerning audience, and therefore, we strive to capture them in the best possible light. Our team consists of experts who specialize in shooting some of the highest-priced homes in town.</p>
        <p>For homes over 2 Million</p>
        <p>What's included in the package:</p>
        <p>PHOTOGRAPHY: Receive 50 high-resolution photos suitable for both MLS and general use.</p>
        <p>VIDEOGRAPHY: Get two videos - one branded version for social media and one unbranded version for MLS, with a duration of 2:00 min – 3:00 min.</p>
        <p>AERIAL DRONE FOOTAGE: Aerial drone footage that takes your video to the next level, featuring 3-5 mind-blowing photos and shots.</p>`,
      duration: '3 hr.',
      price: '$1500.00'
    },
    {
      id: 71,
      name: 'Luxury Listing Video & Photo 6,001 - 10,000 Sq Ft',
      image: '/uploads/navre/image_files/preview/2dfa9c518919700edeeeb0685f5336d0.jpg',
      shortDescription: 'Premium service for luxury properties between 6,001 and 10,000 square feet.',
      fullDescription: `<p>When it comes to luxury listings, we adopt a distinct approach right from the beginning. These exceptional homes are targeted towards a discerning audience, and therefore, we strive to capture them in the best possible light.</p>
        <p>For homes over 2 Million</p>
        <p>What's included in the package:</p>
        <p>PHOTOGRAPHY: Receive 50 - 75 high-resolution photos suitable for both MLS and general use.</p>
        <p>VIDEOGRAPHY: Get two videos - one branded version for social media and one unbranded version for MLS, with a duration of 2:00 min – 3:00 min.</p>
        <p>AERIAL DRONE FOOTAGE: Aerial drone footage that takes your video to the next level, featuring 3-5 mind-blowing photos and shots.</p>`,
      duration: '3 hr. 30 mins.',
      price: '$2000.00'
    },
    {
      id: 13,
      name: 'Luxury Listing Video',
      image: '/uploads/navre/image_files/preview/fdcad4f7fd8d82116d91b1742de6b9b5.jpg',
      shortDescription: 'Professional video services for luxury properties.',
      fullDescription: `<p>When it comes to luxury listings, we adopt a distinct approach right from the beginning. These exceptional homes are targeted towards a discerning audience, and therefore, we strive to capture them in the best possible light.</p>
        <p>For homes over 2 Million</p>
        <p>What's included in the package:</p>
        <p>VIDEOGRAPHY: Get two videos - one branded version for social media and one unbranded version for MLS, with a duration of 1:30 min – 2:00 min.</p>
        <p>AERIAL DRONE FOOTAGE: Aerial drone footage that takes your video to the next level.</p>`,
      duration: '2 hr.',
      price: '$1000.00'
    },
    {
      id: 1,
      name: 'Market Update',
      image: '/uploads/navre/image_files/preview/f3fe3bc801fb3193d819fa22c1e3b03d.jpg',
      shortDescription: 'Take a deeper look at how the market is doing, give your clients updates on anything from current RE climate to interest rates.',
      fullDescription: '<p>Take a deeper look at how the market is doing, give your clients updates on anything from current RE climate to interest rates, new programs, projections.</p>',
      duration: '30 mins.',
      price: '$350.00'
    },
    {
      id: 2,
      name: 'Key Delivery',
      image: '/uploads/navre/image_files/preview/8fe669f8280778f77d1d934802b3f113.jpg',
      shortDescription: 'Document the exciting moment of handing over keys to new homeowners.',
      fullDescription: '<p>You just closed escrow with your clients, congratulations. Now go document the reaction and excitement of your clients and of you handing over the keys and tell the world.</p>',
      duration: '30 mins.',
      price: '$350.00'
    },
    {
      id: 11,
      name: 'Open House',
      image: '/uploads/navre/image_files/preview/321320e4cc09419e7a22a6d7ee55bb5e.jpg',
      shortDescription: 'Document your open house activity.',
      fullDescription: '<p>Document your open house activity, give you clients perspective on how fun and different your open houses are.</p>',
      duration: '30 mins.',
      price: '$350.00'
    },
    {
      id: 27,
      name: '2 Reels',
      image: '/uploads/navre/image_files/preview/15f5a893f4f1ae6cf11829f54411fc1c.jpg',
      shortDescription: 'Short, engaging videos for social media.',
      fullDescription: `<p>These videos are short and often emotive which encourages the viewer to share the video. Instagram has been competing with Tik Tok for some time to be superior therefore promoting REELS and this makes it a very effective marketing tool.</p>
        <p>Consistency is key, take advantage of these videos that can be filmed in 1 sit down. Think about Instagram's algorithm and how they promote shareable and savable content.</p>`,
      duration: '1 hr.',
      price: '$700.00'
    },
    {
      id: 24,
      name: '4 Reels',
      image: '/uploads/navre/image_files/preview/db797cefee1b693194f5999560e06fa6.jpg',
      shortDescription: 'Package of four social media reels.',
      fullDescription: `<p>These videos are short and often emotive which encourages the viewer to share the video. Instagram has been competing with Tik Tok for some time to be superior therefore promoting REELS and this makes it a very effective marketing tool.</p>
        <p>Consistency is key, take advantage of these videos that can be filmed in 1 sit down.</p>`,
      duration: '1 hr. 30 mins.',
      price: '$1000.00'
    },
    {
      id: 25,
      name: '8 Reels',
      image: '/uploads/navre/image_files/preview/a06f6fd92f680d03d8ea2665fef845de.jpg',
      shortDescription: 'Comprehensive package of eight social media reels.',
      fullDescription: `<p>These videos are short and often emotive which encourages the viewer to share the video. Instagram has been competing with Tik Tok for some time to be superior therefore promoting REELS and this makes it a very effective marketing tool.</p>
        <p>Consistency is key, take advantage of these videos that can be filmed in 1 sit down.</p>`,
      duration: '2 hr.',
      price: '$1800.00'
    },
    {
      id: 81,
      name: 'Client Testimonials',
      image: '/uploads/navre/image_files/preview/2582d961d075f1dc290b11b3097c0c5a.jpg',
      shortDescription: 'Showcase real client experiences and build trust.',
      fullDescription: '<p>This video includes your clients sharing about their experience working with you as their realtor. What better than to feature someone who has already used your product or service. This goes a long way to connect with potential consumers. These videos play on the elements of trust and familiarity.</p>',
      duration: '1 hr. 30 mins.',
      price: '$1000.00'
    },
    {
      id: 22,
      name: 'Community Expert',
      image: '/uploads/navre/image_files/preview/4fdb64a2dd6ebed5f132ff13577750db.jpg',
      shortDescription: 'Establish yourself as a local area expert.',
      fullDescription: `<p>Lifestyle videos are a powerful tool to demonstrate your expertise in an area and connect with potential clients, establishing you as the go-to realtor in that area.</p>
        <p>1 Hour</p>
        <p>1-2 Locations</p>`,
      duration: '1 hr.',
      price: '$750.00'
    },
    {
      id: 19,
      name: 'Agent Profile Video',
      image: '/uploads/navre/image_files/preview/9e828551d6649d0cc21ed06effd1e7da.jpg',
      shortDescription: 'Professional video profile showcasing you as an agent.',
      fullDescription: `<p>This video introduces who you are and gives people insight to know more about you personally but also how you run your business. It covers different areas of your life to give viewer overall understanding of who you are and your value proposition as an agent.</p>
        <p>4 Hours</p>
        <p>3-4 Minute Video</p>`,
      duration: '4 hr.',
      price: '$3500.00'
    },
    {
      id: 30,
      name: 'Event Videos 1 Hr',
      image: '/uploads/navre/image_files/preview/823b017fa4f132c22c6a06200e47fe93.jpg',
      shortDescription: 'Capture your event in a 1-minute promotional video.',
      fullDescription: `<p>Capture the heart, feel and purpose of your event. Use the video tell the story of how it went down for anyone who might have missed it. The video itself will also help you promote the next event you have.</p>
        <p>1 Hr</p>
        <p>1 Minute Video</p>`,
      duration: '1 hr.',
      price: '$500.00'
    },
    {
      id: 31,
      name: 'Event Videos 2 Hr',
      image: '/uploads/navre/image_files/preview/cd0ed78132177f1d1faf6c5280407e1e.jpg',
      shortDescription: 'Extended event coverage with a 1-3 minute video.',
      fullDescription: `<p>Capture the heart, feel and purpose of your event. Use the video tell the story of how it went down for anyone who might have missed it. The video itself will also help you promote the next event you have.</p>
        <p>2 Hr</p>
        <p>1-3 Minute Video</p>`,
      duration: '2 hr.',
      price: '$1000.00'
    }
  ];

  const locations = [
    {
      id: 1,
      name: 'Downtown Studio',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop',
      description: 'Modern studio space in the heart of downtown with professional lighting and equipment.'
    },
    {
      id: 2,
      name: 'Outdoor Park Location',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
      description: 'Beautiful outdoor setting with natural lighting and scenic backgrounds.'
    },
    {
      id: 3,
      name: 'Corporate Office',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500&h=300&fit=crop',
      description: 'Professional office environment perfect for business-focused content.'
    }
  ];

  const addons = [
    {
      id: 1,
      name: 'Rush Delivery',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
      description: 'Get your content delivered within 24 hours instead of the standard 3-5 business days.',
      duration: 'Same timeline',
      price: '$200.00'
    },
    {
      id: 2,
      name: 'Additional Revisions',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=100&h=100&fit=crop',
      description: 'Get up to 3 additional rounds of revisions beyond the standard 2 revisions included.',
      duration: 'Extended timeline',
      price: '$150.00'
    },
    {
      id: 3,
      name: 'Social Media Package',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
      description: 'Optimized versions for Instagram, Facebook, LinkedIn, and TikTok with proper aspect ratios.',
      duration: 'Same timeline',
      price: '$100.00'
    }
  ];

  const steps = [
    {
      id: 'service',
      title: 'Select Service',
      subtitle: selectedService?.name || 'Choose your service'
    },
    {
      id: 'location',
      title: 'Choose Location',
      subtitle: selectedLocation?.name || 'Select location'
    },
    {
      id: 'addons',
      title: 'Add-ons',
      subtitle: `${selectedAddons.length} selected`
    },
    {
      id: 'booking',
      title: 'Book Appointment',
      subtitle: 'Schedule your session'
    }
  ];

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep(1);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setCurrentStep(2);
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

  const handleAddonsContinue = () => {
    setCurrentStep(3);
  };

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ServiceStep
            services={services}
            onServiceSelect={handleServiceSelect}
            selectedService={selectedService}
          />
        );
      case 1:
        return (
          <LocationStep
            locations={locations}
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        );
      case 2:
        return (
          <AddonStep
            addons={addons}
            selectedAddons={selectedAddons}
            onAddonToggle={handleAddonToggle}
            onContinue={handleAddonsContinue}
          />
        );
      case 3:
        return (
          <div className="booking-step text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Book Your Appointment
            </h2>
            <p className="text-gray-600 mb-8">
              Calendar integration coming soon...
            </p>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{selectedLocation?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Add-ons:</span>
                  <span className="font-medium">{selectedAddons.length} selected</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <LoadingSpinner isVisible={isLoading} />
      <TimeZoneDisplay />
      <StepsNavigation
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BookingSystem;