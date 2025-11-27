import React, { useState, useEffect, useCallback } from 'react';
import BookCard from './BookCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BookGrid = ({ books, viewMode, loading, hasMore, onLoadMore }) => {
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setDisplayedBooks(books);
  }, [books]);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, onLoadMore]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement?.scrollTop
        >= document.documentElement?.offsetHeight - 1000
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && displayedBooks?.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className={`grid gap-6 ${
          viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' :'grid-cols-1'
        }`}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="animate-pulse">
              {viewMode === 'grid' ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-gray-200 rounded flex-1"></div>
                      <div className="h-8 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-4">
                    <div className="w-20 h-28 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      <div className="flex justify-between">
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (displayedBooks?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="BookOpen" size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No books found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any books matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <Button
            variant="outline"
            onClick={() => window.location?.reload()}
          >
            <Icon name="RotateCcw" size={16} />
            <span className="ml-2">Reset Search</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* Books Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' :'grid-cols-1'
      }`}>
        {displayedBooks?.map((book) => (
          <BookCard
            key={book?.id}
            book={book}
            viewMode={viewMode}
          />
        ))}
      </div>
      {/* Loading More Indicator */}
      {isLoadingMore && (
        <div className="flex justify-center items-center py-8">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-gray-600">Loading more books...</span>
          </div>
        </div>
      )}
      {/* Load More Button */}
      {hasMore && !isLoadingMore && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={isLoadingMore}
          >
            <Icon name="Plus" size={16} />
            <span className="ml-2">Load More Books</span>
          </Button>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && displayedBooks?.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            You've reached the end of the results
          </p>
        </div>
      )}
      {/* Back to Top Button */}
      {displayedBooks?.length > 12 && (
        <Button
          variant="default"
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 shadow-lg"
          title="Back to Top"
        >
          <Icon name="ArrowUp" size={20} />
        </Button>
      )}
    </div>
  );
};

export default BookGrid;