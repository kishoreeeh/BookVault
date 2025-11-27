import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExpiringRentals = ({ rentals }) => {
  if (rentals?.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl literary-shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="AlertTriangle" size={20} className="text-warning" />
        <h3 className="text-lg font-crimson font-semibold text-primary">Expiring Soon</h3>
      </div>
      <div className="space-y-4">
        {rentals?.map((rental) => (
          <div key={rental?.id} className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
              <Image 
                src={rental?.cover} 
                alt={rental?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{rental?.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{rental?.author}</p>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="Clock" size={14} className="text-warning" />
                <span className="text-sm text-warning font-medium">
                  Expires in {rental?.hoursRemaining}h
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
                Extend
              </Button>
              <Button variant="default" size="sm" iconName="ShoppingCart" iconPosition="left">
                Buy
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Link to="/library-catalog" className="text-sm text-primary hover:text-secondary transition-colors">
          View all rentals →
        </Link>
      </div>
    </div>
  );
};

export default ExpiringRentals;