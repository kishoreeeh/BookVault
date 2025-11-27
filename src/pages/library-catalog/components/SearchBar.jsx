import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onVoiceSearch, suggestions = [] }) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const mockSuggestions = [
    { type: 'book', title: 'The Silent Patient', author: 'Alex Michaelides' },
    { type: 'author', name: 'Agatha Christie', bookCount: 67 },
    { type: 'genre', name: 'Mystery & Thriller', bookCount: 1245 },
    { type: 'book', title: 'Where the Crawdads Sing', author: 'Delia Owens' },
    { type: 'author', name: 'Stephen King', bookCount: 45 },
    { type: 'genre', name: 'Science Fiction', bookCount: 756 }
  ];

  const filteredSuggestions = searchQuery?.length > 0 
    ? mockSuggestions?.filter(item => 
        (item?.title && item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())) ||
        (item?.name && item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      )?.slice(0, 6)
    : [];

  useEffect(() => {
    setShowSuggestions(searchQuery?.length > 0 && filteredSuggestions?.length > 0);
    setSelectedSuggestion(-1);
  }, [searchQuery, filteredSuggestions?.length]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedSuggestion(prev => 
          prev < filteredSuggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(filteredSuggestions?.[selectedSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const searchText = suggestion?.title || suggestion?.name;
    onSearchChange(searchText);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    inputRef?.current?.blur();
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      setIsVoiceActive(true);

      recognition.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        onSearchChange(transcript);
        setIsVoiceActive(false);
      };

      recognition.onerror = () => {
        setIsVoiceActive(false);
      };

      recognition.onend = () => {
        setIsVoiceActive(false);
      };

      recognition?.start();
    } else {
      alert('Voice search is not supported in your browser');
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'book': return 'Book';
      case 'author': return 'User';
      case 'genre': return 'Tag';
      default: return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Icon name="Search" size={20} className="text-gray-400" />
        </div>
        
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search books, authors, genres..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery?.length > 0 && setShowSuggestions(true)}
          className="pl-12 pr-20 h-12 text-lg border-2 border-gray-200 focus:border-primary rounded-xl"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceSearch}
            disabled={isVoiceActive}
            className={`p-2 rounded-lg transition-colors ${
              isVoiceActive 
                ? 'bg-red-100 text-red-600' :'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <Icon 
              name={isVoiceActive ? "MicOff" : "Mic"} 
              size={18} 
            />
          </Button>

          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onSearchChange('');
                setShowSuggestions(false);
                inputRef?.current?.focus();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <Icon name="X" size={18} />
            </Button>
          )}
        </div>
      </div>
      {/* Search Suggestions */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            {filteredSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                  selectedSuggestion === index 
                    ? 'bg-primary/10 text-primary' :'hover:bg-gray-50'
                }`}
              >
                <Icon 
                  name={getSuggestionIcon(suggestion?.type)} 
                  size={16} 
                  className={selectedSuggestion === index ? 'text-primary' : 'text-gray-400'}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {suggestion?.title || suggestion?.name}
                  </div>
                  {suggestion?.author && (
                    <div className="text-sm text-gray-500 truncate">
                      by {suggestion?.author}
                    </div>
                  )}
                  {suggestion?.bookCount && (
                    <div className="text-sm text-gray-500">
                      {suggestion?.bookCount} books
                    </div>
                  )}
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Voice Search Indicator */}
      {isVoiceActive && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-xl p-4 z-50">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-medium">Listening...</span>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-center text-sm text-red-600 mt-2">
            Speak now to search for books
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;