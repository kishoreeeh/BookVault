import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingOptions = ({ book }) => {
  const [selectedOption, setSelectedOption] = useState('rent');
  const navigate = useNavigate();

  const handleAddToCart = (type) => {
    // Mock cart functionality
    console.log(`Adding ${book?.title} to cart as ${type}`);
    navigate('/checkout-cart');
  };

  const handleStartReading = () => {
    navigate('/reading-interface');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 literary-shadow sticky top-24">
      <h3 className="text-lg font-semibold text-primary mb-4">Choose Your Reading Experience</h3>
      {/* Pricing Options */}
      <div className="space-y-3 mb-6">
        {/* Rental Option */}
        <div
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedOption === 'rent' ?'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedOption('rent')}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedOption === 'rent' ? 'border-primary bg-primary' : 'border-gray-300'
              }`}>
                {selectedOption === 'rent' && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
              <span className="font-medium text-gray-900">Rent to Read</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">₹{book?.pricing?.rental?.hourly}/hr</div>
              <div className="text-xs text-gray-500">Min. {book?.pricing?.rental?.minimum}hrs</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 ml-7">
            Perfect for trying new authors or one-time reads
          </p>
        </div>

        {/* Purchase Option */}
        <div
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
            selectedOption === 'buy' ?'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedOption('buy')}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedOption === 'buy' ? 'border-primary bg-primary' : 'border-gray-300'
              }`}>
                {selectedOption === 'buy' && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
              <span className="font-medium text-gray-900">Own Forever</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">₹{book?.pricing?.purchase}</div>
              <div className="text-xs text-success">Best Value</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 ml-7">
            Unlimited access, highlights, notes, and offline reading
          </p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="ShoppingCart"
          iconPosition="left"
          onClick={() => handleAddToCart(selectedOption)}
        >
          {selectedOption === 'rent' ? 'Rent Now' : 'Buy Now'}
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Eye"
          iconPosition="left"
          onClick={handleStartReading}
        >
          Preview First 15 Pages
        </Button>
      </div>
      {/* Additional Options */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
            <Icon name="Heart" size={16} />
            Add to Wishlist
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
            <Icon name="Gift" size={16} />
            Gift This Book
          </button>
        </div>
      </div>
      {/* Value Proposition */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Shield" size={16} className="text-success mt-0.5" />
          <div className="text-xs text-gray-600">
            <p className="font-medium text-gray-800 mb-1">BookVault Promise</p>
            <p>30-day money-back guarantee • Instant access • Sync across devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingOptions;