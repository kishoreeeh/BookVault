import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useCart } from '../../../context/CartContext';

const BookCard = ({ book, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(book?.isWishlisted || false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const { addToCart } = useCart();

  const handleQuickAction = (action, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (action === 'rent') {
      addToCart(book, 'rental');
      alert(`${book?.title} added to cart as rental`);
      return;
    }
    if (action === 'buy') {
      addToCart(book, 'purchase');
      alert(`${book?.title} added to cart`);
      return;
    }
    console.log(`${action} action for book:`, book?.title);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatReadingTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  // Format price in INR
  const formatINR = (price) => {
    if (typeof price === 'string' && price.startsWith('₹')) return price;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(price));
  };

  if (viewMode === 'list') {
    return (
      <Link
        to={`/book-detail-pages?id=${book?.id}`}
        className="block bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 p-4"
        onMouseEnter={() => setShowQuickActions(true)}
        onMouseLeave={() => setShowQuickActions(false)}
      >
        <div className="flex space-x-4">
          {/* Book Cover */}
          <div className="flex-shrink-0 w-20 h-28 overflow-hidden rounded-lg">
            <Image
              src={book?.coverImage}
              alt={book?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Book Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
                  {book?.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">by {book?.author}</p>
                
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(book?.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      {book?.rating} ({book?.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Icon name="Clock" size={14} />
                    <span>{formatReadingTime(book?.readingTime)}</span>
                  </div>
                  
                  {book?.isAvailable && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available Now
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {book?.description}
                </p>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-full transition-colors ml-4 ${
                  isWishlisted 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' :'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Icon name="Heart" size={18} className={isWishlisted ? 'fill-current' : ''} />
              </button>
              {/* Add to Cart Icon (list view) */}
              <button
                onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); addToCart(book, 'purchase'); alert(`${book?.title} added to cart`); }}
                className="p-2 rounded-full transition-colors ml-2 text-gray-600 hover:text-primary hover:bg-gray-50"
                aria-label={`Add ${book?.title} to cart`}
              >
                <Icon name="ShoppingCart" size={18} />
              </button>
            </div>

            {/* Pricing and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-500">Rent:</span>
                  <span className="font-semibold text-primary ml-1">{formatINR(book?.rentPrice)}/hr</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Buy:</span>
                  <span className="font-semibold text-gray-900 ml-1">{formatINR(book?.buyPrice)}</span>
                </div>
              </div>

              {showQuickActions && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => handleQuickAction('preview', e)}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={(e) => handleQuickAction('rent', e)}
                  >
                    Rent Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View
  return (
    <Link
      to={`/book-detail-pages?id=${book?.id}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg book-hover transition-all duration-300"
      onMouseEnter={() => setShowQuickActions(true)}
      onMouseLeave={() => setShowQuickActions(false)}
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={book?.coverImage}
          alt={book?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Actions */}
        {showQuickActions && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => handleQuickAction('preview', e)}
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              <Icon name="Eye" size={16} />
              <span className="ml-1 hidden sm:inline">Preview</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={(e) => handleQuickAction('rent', e)}
            >
              <Icon name="Play" size={16} />
              <span className="ml-1 hidden sm:inline">Rent</span>
            </Button>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isWishlisted 
              ? 'text-red-500 bg-white shadow-md' 
              : 'text-white bg-black bg-opacity-30 hover:bg-opacity-50'
          }`}
        >
          <Icon name="Heart" size={16} className={isWishlisted ? 'fill-current' : ''} />
        </button>

        {/* Add to Cart Icon (grid view) */}
        <button
          onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); addToCart(book, 'purchase'); alert(`${book?.title} added to cart`); }}
          className="absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 bg-white shadow-sm text-gray-700 hover:text-primary"
          aria-label={`Add ${book?.title} to cart`}
        >
          <Icon name="ShoppingCart" size={16} />
        </button>

        {/* Availability Badge */}
        {book?.isAvailable && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
              Available
            </span>
          </div>
        )}

        {/* New Release Badge */}
        {book?.isNewRelease && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
              New
            </span>
          </div>
        )}
      </div>
      {/* Book Details */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {book?.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">by {book?.author}</p>
        
        {/* Rating and Reading Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(book?.rating)}
            <span className="text-sm text-gray-600 ml-1">
              {book?.rating}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Icon name="Clock" size={12} />
            <span>{formatReadingTime(book?.readingTime)}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div>
            <span className="text-gray-500">Rent:</span>
            <span className="font-semibold text-primary ml-1">{formatINR(book?.rentPrice)}/hr</span>
          </div>
          <div>
            <span className="text-gray-500">Buy:</span>
            <span className="font-semibold text-gray-900 ml-1">{formatINR(book?.buyPrice)}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => handleQuickAction('rent', e)}
            className="flex-1"
          >
            Rent Now
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={(e) => handleQuickAction('buy', e)}
            className="flex-1"
          >
            Buy Now
          </Button>
          {/* removed text Add to Cart — use icon in grid/list */}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;