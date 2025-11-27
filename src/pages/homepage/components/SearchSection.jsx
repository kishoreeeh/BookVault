import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const popularSearches = [
    "The Midnight Library",
    "Atomic Habits",
    "Project Hail Mary",
    "The Seven Husbands of Evelyn Hugo",
    "Where the Crawdads Sing"
  ];

  const genreSuggestions = [
    { name: "Mystery & Thriller", icon: "Search", count: "2.3K books" },
    { name: "Romance", icon: "Heart", count: "1.8K books" },
    { name: "Science Fiction", icon: "Zap", count: "1.5K books" },
    { name: "Self-Help", icon: "TrendingUp", count: "980 books" },
    { name: "Biography", icon: "User", count: "750 books" }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/library-catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/library-catalog?search=${encodeURIComponent(suggestion)}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-crimson font-bold text-primary mb-4">
            Discover Your Next Great Read
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through 100,000+ books with intelligent recommendations and instant previews
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search by title, author, genre, or ISBN..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e?.target?.value);
                  setShowSuggestions(e?.target?.value?.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery?.length > 0)}
                className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-primary"
              />
              <Icon 
                name="Search" 
                size={24} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <Button
                type="submit"
                variant="default"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 px-6 py-2"
                iconName="Search"
                iconPosition="left"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
              {searchQuery && (
                <div className="p-4 border-b border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Searches</h4>
                  <div className="space-y-2">
                    {popularSearches?.filter(search => search?.toLowerCase()?.includes(searchQuery?.toLowerCase()))?.slice(0, 3)?.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Icon name="Clock" size={16} className="text-gray-400" />
                          <span className="text-gray-700">{search}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Browse by Genre</h4>
                <div className="grid grid-cols-1 gap-2">
                  {genreSuggestions?.map((genre, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(genre?.name)}
                      className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={genre?.icon} size={16} className="text-primary" />
                        <span className="text-gray-700">{genre?.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{genre?.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Access Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {genreSuggestions?.slice(0, 4)?.map((genre, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(genre?.name)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-200"
            >
              <Icon name={genre?.icon} size={16} className="text-primary" />
              <span className="text-gray-700 font-medium">{genre?.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;