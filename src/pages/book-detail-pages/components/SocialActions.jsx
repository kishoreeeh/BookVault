import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialActions = ({ book }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleShare = (platform) => {
    setIsSharing(true);
    // Mock sharing functionality
    setTimeout(() => {
      setIsSharing(false);
      console.log(`Shared ${book?.title} on ${platform}`);
    }, 1000);
  };

  const shareOptions = [
    { platform: 'facebook', label: 'Facebook', icon: 'Facebook', color: 'text-blue-600' },
    { platform: 'twitter', label: 'Twitter', icon: 'Twitter', color: 'text-blue-400' },
    { platform: 'goodreads', label: 'Goodreads', icon: 'BookOpen', color: 'text-amber-600' },
    { platform: 'email', label: 'Email', icon: 'Mail', color: 'text-gray-600' },
    { platform: 'copy', label: 'Copy Link', icon: 'Link', color: 'text-gray-600' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 literary-shadow">
      <h3 className="text-lg font-semibold text-primary mb-4">Share & Save</h3>
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button
          variant={isInWishlist ? "default" : "outline"}
          fullWidth
          iconName={isInWishlist ? "Heart" : "Heart"}
          iconPosition="left"
          onClick={handleWishlistToggle}
          className={isInWishlist ? "text-white" : ""}
        >
          {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="BookmarkPlus"
          iconPosition="left"
        >
          Reading List
        </Button>
      </div>
      {/* Social Sharing */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Share This Book</h4>
        
        <div className="grid grid-cols-2 gap-2">
          {shareOptions?.map((option) => (
            <button
              key={option?.platform}
              onClick={() => handleShare(option?.platform)}
              disabled={isSharing}
              className="flex items-center gap-2 p-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Icon name={option?.icon} size={16} className={option?.color} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Reading Lists */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Add to Reading List</h4>
        
        <div className="space-y-2">
          {['Want to Read', 'Currently Reading', 'Read', 'Favorites']?.map((list) => (
            <button
              key={list}
              className="flex items-center justify-between w-full p-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span>{list}</span>
              <Icon name="Plus" size={14} />
            </button>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" fullWidth className="mt-3" iconName="Plus" iconPosition="left">
          Create New List
        </Button>
      </div>
      {/* Gift Options */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Gift This Book</h4>
        <p className="text-sm text-gray-600 mb-3">
          Send this book as a gift with a personalized message
        </p>
        
        <Button variant="outline" fullWidth iconName="Gift" iconPosition="left">
          Send as Gift
        </Button>
      </div>
      {/* Recommend to Friends */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Recommend to Friends</h4>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-2">
            {[1, 2, 3]?.map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">3 friends might like this</span>
        </div>
        
        <Button variant="outline" fullWidth iconName="UserPlus" iconPosition="left">
          Recommend to Friends
        </Button>
      </div>
    </div>
  );
};

export default SocialActions;