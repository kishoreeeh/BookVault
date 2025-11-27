import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortingControls = ({ sortBy, onSortChange, viewMode, onViewModeChange, resultsCount }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'discovery', label: 'Discovery Score', icon: 'Sparkles' },
    { value: 'most-rented', label: 'Most Rented', icon: 'TrendingUp' },
    { value: 'best-value', label: 'Best Value', icon: 'DollarSign' },
    { value: 'newest', label: 'Newest First', icon: 'Calendar' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'title-az', label: 'Title A-Z', icon: 'ArrowUp' },
    { value: 'title-za', label: 'Title Z-A', icon: 'ArrowDown' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  const currentSort = sortOptions?.find(option => option?.value === sortBy);

  return (
    <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-16 z-30">
      {/* Results Count */}
      <div className="flex items-center space-x-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">
            {resultsCount?.toLocaleString()}
          </span>
          {' '}books found
        </p>
        
        {/* Mobile Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={() => document.dispatchEvent(new CustomEvent('toggleMobileFilters'))}
        >
          <Icon name="Filter" size={16} />
          <span className="ml-2">Filters</span>
        </Button>
      </div>
      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 min-w-0"
          >
            <Icon name={currentSort?.icon || 'ArrowUpDown'} size={16} />
            <span className="hidden sm:inline truncate">
              Sort: {currentSort?.label || 'Select'}
            </span>
            <span className="sm:hidden">Sort</span>
            <Icon name="ChevronDown" size={14} />
          </Button>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => {
                        onSortChange(option?.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors ${
                        sortBy === option?.value
                          ? 'bg-primary/10 text-primary' :'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon 
                        name={option?.icon} 
                        size={16} 
                        className={sortBy === option?.value ? 'text-primary' : 'text-gray-400'}
                      />
                      <span className="flex-1">{option?.label}</span>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="hidden sm:flex items-center border border-gray-200 rounded-lg p-1">
          {viewModes?.map((mode) => (
            <Button
              key={mode?.value}
              variant={viewMode === mode?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode?.value)}
              className="p-2"
              title={mode?.label}
            >
              <Icon name={mode?.icon} size={16} />
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Refresh Results"
            onClick={() => window.location?.reload()}
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            title="Export Results"
          >
            <Icon name="Download" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortingControls;