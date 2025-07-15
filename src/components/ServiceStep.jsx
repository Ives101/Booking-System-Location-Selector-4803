import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceModal from './ServiceModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiClock, FiDollarSign, FiSearch, FiFilter, FiX, FiCheck } = FiIcons;

const ServiceStep = ({ services, onServiceSelect, selectedService }) => {
  const [modalService, setModalService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [priceFilter, setPriceFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [filteredServices, setFilteredServices] = useState(services);
  const searchRef = useRef(null);

  // Filter services when search or filters change
  useEffect(() => {
    const filtered = services.filter(service => {
      // Search filter
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price filter
      let matchesPrice = true;
      if (priceFilter === 'low') {
        matchesPrice = parseFloat(service.price.replace('$', '').replace(',', '')) <= 500;
      } else if (priceFilter === 'mid') {
        const price = parseFloat(service.price.replace('$', '').replace(',', ''));
        matchesPrice = price > 500 && price <= 1000;
      } else if (priceFilter === 'high') {
        matchesPrice = parseFloat(service.price.replace('$', '').replace(',', '')) > 1000;
      }
      
      // Duration filter
      let matchesDuration = true;
      if (durationFilter === 'short') {
        matchesDuration = service.duration.includes('30 mins') || service.duration.includes('1 hr');
      } else if (durationFilter === 'medium') {
        matchesDuration = (service.duration.includes('1 hr') && !service.duration.includes('30 mins')) ||
                         service.duration.includes('2 hr');
      } else if (durationFilter === 'long') {
        matchesDuration = service.duration.includes('3 hr') || service.duration.includes('4 hr');
      }
      
      return matchesSearch && matchesPrice && matchesDuration;
    });
    
    setFilteredServices(filtered);
  }, [services, searchTerm, priceFilter, durationFilter]);

  const handleServiceClick = (service) => {
    setModalService(service);
  };

  const closeModal = () => {
    setModalService(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter('all');
    setDurationFilter('all');
    setFilterVisible(false);
    if (searchRef.current) searchRef.current.focus();
  };

  const isSelected = (serviceId) => {
    return selectedService?.id === serviceId;
  };

  return (
    <div className="service-step">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Choose Your Service
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the service that best fits your needs. Each service includes different features and durations.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow">
              <SafeIcon 
                icon={FiSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                ref={searchRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={FiX} />
                </button>
              )}
            </div>
            <button 
              onClick={() => setFilterVisible(!filterVisible)}
              className={`p-2 rounded-lg border ${filterVisible ? 'bg-blue-50 border-blue-300 text-blue-600' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiFilter} />
                <span className="hidden sm:inline">Filters</span>
                {(priceFilter !== 'all' || durationFilter !== 'all') && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {(priceFilter !== 'all' ? 1 : 0) + (durationFilter !== 'all' ? 1 : 0)}
                  </span>
                )}
              </div>
            </button>
          </div>
          
          {/* Filter Options */}
          <AnimatePresence>
            {filterVisible && (
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => setPriceFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setPriceFilter('low')}
                        className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'low' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        Under $500
                      </button>
                      <button 
                        onClick={() => setPriceFilter('mid')}
                        className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'mid' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        $500-$1000
                      </button>
                      <button 
                        onClick={() => setPriceFilter('high')}
                        className={`px-3 py-1 rounded-full text-sm ${priceFilter === 'high' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        Over $1000
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => setDurationFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm ${durationFilter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        All
                      </button>
                      <button 
                        onClick={() => setDurationFilter('short')}
                        className={`px-3 py-1 rounded-full text-sm ${durationFilter === 'short' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        Up to 1hr
                      </button>
                      <button 
                        onClick={() => setDurationFilter('medium')}
                        className={`px-3 py-1 rounded-full text-sm ${durationFilter === 'medium' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        1-2hrs
                      </button>
                      <button 
                        onClick={() => setDurationFilter('long')}
                        className={`px-3 py-1 rounded-full text-sm ${durationFilter === 'long' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                      >
                        3hrs+
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Clear filters button */}
                {(searchTerm || priceFilter !== 'all' || durationFilter !== 'all') && (
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <SafeIcon icon={FiX} className="w-4 h-4" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-600">
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} available
          </div>
          {selectedService && (
            <div className="text-sm">
              <span className="text-gray-600">Selected: </span>
              <span className="font-medium text-blue-600">{selectedService.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              className={`service-item bg-white rounded-xl ${
                isSelected(service.id) 
                  ? 'ring-2 ring-blue-500 shadow-md' 
                  : 'shadow-sm hover:shadow-md'
              } transition-all duration-300 overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
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
                  
                  {isSelected(service.id) && (
                    <div className="absolute top-3 right-3 bg-blue-600 text-white rounded-full p-1">
                      <SafeIcon icon={FiCheck} className="w-5 h-5" />
                    </div>
                  )}
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-3"
                    dangerouslySetInnerHTML={{ __html: service.shortDescription }}
                  />
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
                    className={`w-full ${
                      isSelected(service.id)
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium`}
                  >
                    {isSelected(service.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-gray-400 mb-4">
              <SafeIcon icon={FiSearch} className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              No services match your current filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
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