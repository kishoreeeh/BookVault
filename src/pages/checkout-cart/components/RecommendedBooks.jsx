import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedBooks = ({ recommendations, onAddToCart }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 literary-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-gray-900">Frequently Bought Together</h3>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Readers who bought items in your cart also purchased these books
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations?.map((book) => (
          <div key={book?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-16 h-20 rounded overflow-hidden">
                  <Image
                    src={book?.cover}
                    alt={book?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                  {book?.title}
                </h4>
                <p className="text-xs text-gray-600 mb-2">by {book?.author}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={12}
                        className={i < Math.floor(book?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({book?.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(book?.rentalPrice)}
                    </span>
                    <span className="text-xs text-gray-500">rental</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => onAddToCart(book, 'rental')}
                    className="text-xs"
                  >
                    <Icon name="Plus" size={12} className="mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Bundle Offer */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Package" size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-900">Bundle Deal</span>
        </div>
        <p className="text-sm text-blue-800 mb-3">
          Rent 3 books this week for less than buying 1! Save up to 60% with our weekly bundle.
        </p>
        <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-50">
          <Icon name="Gift" size={14} className="mr-1" />
          View Bundle Options
        </Button>
      </div>
    </div>
  );
};

export default RecommendedBooks;