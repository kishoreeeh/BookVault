import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const suggestedBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      rating: 4.8,
      rentalPrice: 99
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      rating: 4.9,
      rentalPrice: 129
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rating: 4.7,
      rentalPrice: 89
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="text-center py-16">
      {/* Empty Cart Icon */}
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon name="ShoppingCart" size={48} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-crimson font-semibold text-gray-900 mb-3">
        Your cart is empty
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Discover thousands of books waiting to be read. Start building your literary collection today.
      </p>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <Button variant="default" size="lg" asChild>
          <Link to="/library-catalog">
            <Icon name="Search" size={18} className="mr-2" />
            Browse Catalog
          </Link>
        </Button>
        
        <Button variant="outline" size="lg" asChild>
          <Link to="/homepage">
            <Icon name="Home" size={18} className="mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>
      {/* Suggested Books */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Popular This Week
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedBooks?.map((book) => (
            <div key={book?.id} className="bg-white rounded-lg border border-gray-200 p-4 literary-shadow hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                <img
                  src={book?.cover}
                  alt={book?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {book?.title}
              </h4>
              
              <p className="text-sm text-gray-600 mb-2">by {book?.author}</p>
              
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={14}
                      className={i < Math.floor(book?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">{book?.rating}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(book?.rentalPrice)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">rental</span>
                </div>
                
                <Button variant="outline" size="sm" asChild>
                  <Link to="/book-detail-pages">
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Benefits Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Why Choose BookVault?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Flexible Rentals</h4>
            <p className="text-sm text-gray-600">
              Rent books for as little as 1 hour or up to a week
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Heart" size={24} className="text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Own What You Love</h4>
            <p className="text-sm text-gray-600">
              Purchase your favorites for permanent access
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Smartphone" size={24} className="text-white" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Read Anywhere</h4>
            <p className="text-sm text-gray-600">
              Access your books across all devices, online and offline
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;