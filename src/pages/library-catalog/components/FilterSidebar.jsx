import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, onClearFilters, filterCounts }) => {
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    genre: true,
    author: false,
    rating: false,
    price: false,
    features: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const filterSections = [
    {
      id: 'availability',
      title: 'Availability',
      options: [
        { id: 'available-now', label: 'Available Now', count: filterCounts?.availability?.['available-now'] || 0 },
        { id: 'new-releases', label: 'New Releases', count: filterCounts?.availability?.['new-releases'] || 0 },
        { id: 'award-winners', label: 'Award Winners', count: filterCounts?.availability?.['award-winners'] || 0 },
        { id: 'staff-picks', label: 'Staff Picks', count: filterCounts?.availability?.['staff-picks'] || 0 }
      ]
    },
    {
      id: 'genre',
      title: 'Genre',
      options: [
        { id: 'mystery', label: 'Mystery & Thriller', count: filterCounts?.genre?.mystery || 0 },
        { id: 'romance', label: 'Romance', count: filterCounts?.genre?.romance || 0 },
        { id: 'sci-fi', label: 'Science Fiction', count: filterCounts?.genre?.['sci-fi'] || 0 },
        { id: 'fantasy', label: 'Fantasy', count: filterCounts?.genre?.fantasy || 0 },
        { id: 'biography', label: 'Biography', count: filterCounts?.genre?.biography || 0 },
        { id: 'history', label: 'History', count: filterCounts?.genre?.history || 0 },
        { id: 'self-help', label: 'Self Help', count: filterCounts?.genre?.['self-help'] || 0 },
        { id: 'business', label: 'Business', count: filterCounts?.genre?.business || 0 }
      ]
    },
    {
      id: 'author',
      title: 'Popular Authors',
      options: [
        { id: 'stephen-king', label: 'Stephen King', count: filterCounts?.author?.['stephen-king'] || 0 },
        { id: 'agatha-christie', label: 'Agatha Christie', count: filterCounts?.author?.['agatha-christie'] || 0 },
        { id: 'j-k-rowling', label: 'J.K. Rowling', count: filterCounts?.author?.['j-k-rowling'] || 0 },
        { id: 'dan-brown', label: 'Dan Brown', count: filterCounts?.author?.['dan-brown'] || 0 },
        { id: 'gillian-flynn', label: 'Gillian Flynn', count: filterCounts?.author?.['gillian-flynn'] || 0 }
      ]
    },
    {
      id: 'rating',
      title: 'Rating',
      options: [
        { id: '5-stars', label: '5 Stars', count: filterCounts?.rating?.['5-stars'] || 0 },
        { id: '4-stars', label: '4+ Stars', count: filterCounts?.rating?.['4-stars'] || 0 },
        { id: '3-stars', label: '3+ Stars', count: filterCounts?.rating?.['3-stars'] || 0 },
        { id: '2-stars', label: '2+ Stars', count: filterCounts?.rating?.['2-stars'] || 0 }
      ]
    },
    {
      id: 'price',
      title: 'Price Range',
      options: [
        { id: 'free', label: 'Free', count: filterCounts?.price?.free || 0 },
        { id: 'under-5', label: 'Under ₹5', count: filterCounts?.price?.['under-5'] || 0 },
        { id: '5-15', label: '₹5 - ₹15', count: filterCounts?.price?.['5-15'] || 0 },
        { id: '15-25', label: '₹15 - ₹25', count: filterCounts?.price?.['15-25'] || 0 },
        { id: 'over-25', label: 'Over ₹25', count: filterCounts?.price?.['over-25'] || 0 }
      ]
    },
    {
      id: 'features',
      title: 'Features',
      options: [
        { id: 'audiobook', label: 'Audiobook Available', count: filterCounts?.features?.audiobook || 0 },
        { id: 'quick-read', label: 'Quick Read (< 4 hrs)', count: filterCounts?.features?.['quick-read'] || 0 },
        { id: 'bestseller', label: 'Bestseller', count: filterCounts?.features?.bestseller || 0 },
        { id: 'series', label: 'Part of Series', count: filterCounts?.features?.series || 0 }
      ]
    }
  ];

  const activeFiltersCount = Object.values(filters)?.flat()?.length;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out z-50 lg:z-0 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:pt-0">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Active Filters</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-primary hover:text-primary-dark"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)?.map(([category, items]) =>
                items?.map(item => (
                  <span
                    key={`${category}-${item}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {item}
                    <button
                      onClick={() => onFilterChange(category, item, false)}
                      className="hover:bg-primary/20 rounded-full p-0.5"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        )}

        {/* Filter Sections */}
        <div className="p-6 space-y-6">
          {filterSections?.map((section) => (
            <div key={section?.id} className="border-b border-gray-100 pb-6 last:border-b-0">
              <button
                onClick={() => toggleSection(section?.id)}
                className="flex items-center justify-between w-full text-left mb-4 hover:text-primary transition-colors"
              >
                <h3 className="font-medium text-gray-900">{section?.title}</h3>
                <Icon 
                  name={expandedSections?.[section?.id] ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
              </button>

              {expandedSections?.[section?.id] && (
                <div className="space-y-3">
                  {section?.options?.map((option) => (
                    <div key={option?.id} className="flex items-center justify-between">
                      <Checkbox
                        label={option?.label}
                        checked={filters?.[section?.id]?.includes(option?.id) || false}
                        onChange={(e) => onFilterChange(section?.id, option?.id, e?.target?.checked)}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-500 ml-2">
                        {option?.count?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;