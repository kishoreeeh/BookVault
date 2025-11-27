import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CurrentlyReadingCard = ({ book }) => {
  const progressPercentage = (book?.currentPage / book?.totalPages) * 100;
  const timeRemaining = book?.timeRemaining;
  
  return (
    <div className="bg-white rounded-xl literary-shadow p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="w-32 h-48 lg:w-24 lg:h-36 rounded-lg overflow-hidden shadow-md">
              <Image 
                src={book?.cover} 
                alt={book?.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {book?.isRental && (
              <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
                Rental
              </div>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-crimson font-semibold text-primary mb-1 line-clamp-2">
                {book?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">by {book?.author}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Page {book?.currentPage} of {book?.totalPages}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Time Remaining */}
              {book?.isRental && (
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {timeRemaining > 24 ? 
                      `${Math.floor(timeRemaining / 24)} days remaining` : 
                      `${timeRemaining} hours remaining`
                    }
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-32">
              <Link to="/reading-interface" className="flex-1">
                <Button variant="default" className="w-full" iconName="Play" iconPosition="left">
                  Continue
                </Button>
              </Link>
              
              {book?.isRental && (
                <Button variant="outline" className="w-full" iconName="ShoppingCart" iconPosition="left">
                  Buy Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentlyReadingCard;