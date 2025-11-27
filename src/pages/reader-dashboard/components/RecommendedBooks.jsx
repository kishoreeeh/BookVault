import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const RecommendedBooks = ({ recommendations }) => {
  // Format price in INR
  const formatINR = (price) => {
    if (typeof price === 'string' && price.startsWith('₹')) return price;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(price));
  };
  return (
    <div className="bg-white rounded-xl literary-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-crimson font-semibold text-primary">Recommended for You</h3>
        <Link to="/library-catalog" className="text-sm text-primary hover:text-secondary transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations?.map((book) => (
          <div key={book?.id} className="group cursor-pointer">
            <Link to="/book-detail-pages" className="block">
              <div className="relative mb-3">
                <div className="w-full h-48 rounded-lg overflow-hidden shadow-md">
                  <Image 
                    src={book?.cover} 
                    alt={book?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                  <Icon name="Heart" size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                  {book?.title}
                </h4>
                <p className="text-sm text-muted-foreground">{book?.author}</p>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={12} 
                        className={i < Math.floor(book?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({book?.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">{formatINR(book?.rentalPrice)}/day</span>
                    <span className="text-xs text-muted-foreground">or {formatINR(book?.buyPrice)}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground bg-gray-50 rounded p-2">
                  {book?.reason}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBooks;