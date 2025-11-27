import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchPanel = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const mockResults = [
    {
      id: 1,
      text: "The mysterious figure appeared at the edge of the forest, cloaked in shadows and uncertainty.",
      chapter: "Chapter 4: Deeper Into Darkness",
      page: 67,
      context: "...the moonlight barely illuminated the path ahead. The mysterious figure appeared at the edge of the forest, cloaked in shadows and uncertainty. Sarah felt her heart racing as she..."
    },
    {
      id: 2,
      text: "Mystery has always been the driving force behind human curiosity and exploration.",
      chapter: "Chapter 1: The Beginning",
      page: 8,
      context: "...throughout history, humans have sought answers to life's greatest questions. Mystery has always been the driving force behind human curiosity and exploration, pushing us to venture..."
    },
    {
      id: 3,
      text: "The mystery deepened as more clues emerged from the old manuscript.",
      chapter: "Chapter 6: The Truth Emerges",
      page: 124,
      context: "...each page revealed more secrets than the last. The mystery deepened as more clues emerged from the old manuscript, painting a picture that challenged everything they believed..."
    }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchQuery?.trim()) return;

    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      const filtered = mockResults?.filter(result =>
        result?.text?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        result?.context?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text?.split(regex)?.map((part, index) =>
      regex?.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent-foreground">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-200 z-40 literary-shadow">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-crimson font-semibold text-primary">Search in Book</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
        />
      </div>
      <div className="h-full overflow-y-auto pb-20">
        <div className="p-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for text, quotes, or phrases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pr-12"
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                iconName="Search"
                loading={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </div>
          </form>

          {/* Search Results */}
          {searchQuery && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  {isSearching ? 'Searching...' : `${searchResults?.length} results found`}
                </h3>
                {searchResults?.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="RotateCcw"
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>

              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : searchResults?.length > 0 ? (
                <div className="space-y-4">
                  {searchResults?.map((result) => (
                    <button
                      key={result?.id}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-sm transition-all"
                      onClick={() => {
                        // Navigate to result
                        console.log('Navigate to:', result?.page);
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-xs text-primary font-medium">
                          {result?.chapter}
                        </div>
                        <div className="text-xs text-gray-500">
                          Page {result?.page}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-700 leading-relaxed">
                        {highlightText(result?.context, searchQuery)}
                      </div>
                      
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Icon name="ArrowRight" size={12} className="mr-1" />
                        Go to page
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery && !isSearching ? (
                <div className="text-center py-8">
                  <Icon name="Search" size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No results found</p>
                  <p className="text-sm text-gray-400">
                    Try different keywords or check your spelling
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* Search Tips */}
          {!searchQuery && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Search Tips</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Use quotes for exact phrases</li>
                  <li>• Search for character names</li>
                  <li>• Look for key plot points</li>
                  <li>• Find memorable quotes</li>
                </ul>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="font-medium text-primary mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="flex items-center space-x-2 text-sm text-primary hover:underline">
                    <Icon name="BookOpen" size={14} />
                    <span>Search all my books</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-primary hover:underline">
                    <Icon name="Highlight" size={14} />
                    <span>View my highlights</span>
                  </button>
                  <button className="flex items-center space-x-2 text-sm text-primary hover:underline">
                    <Icon name="Bookmark" size={14} />
                    <span>Go to bookmarks</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;