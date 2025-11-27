import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CartItem = ({ item, onUpdateQuantity, onRemove, onUpdateRentalDuration }) => {
  const [selectedDuration, setSelectedDuration] = useState(item?.rentalDuration || '24h');

  const rentalOptions = [
    { value: '1h', label: '1 Hour - ₹19' },
    { value: '4h', label: '4 Hours - ₹59' },
    { value: '24h', label: '24 Hours - ₹149' },
    { value: '1w', label: '1 Week - ₹299' }
  ];

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
    onUpdateRentalDuration(item?.id, duration);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 literary-shadow">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <div className="w-24 h-32 lg:w-32 lg:h-40 rounded-lg overflow-hidden">
            <Image
              src={item?.cover}
              alt={item?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {item?.title}
              </h3>
              <p className="text-gray-600 mb-2">by {item?.author}</p>
              
              {/* Type Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  item?.type === 'rental' ?'bg-blue-100 text-blue-800' :'bg-green-100 text-green-800'
                }`}>
                  <Icon 
                    name={item?.type === 'rental' ? 'Clock' : 'ShoppingBag'} 
                    size={12} 
                    className="mr-1" 
                  />
                  {item?.type === 'rental' ? 'Rental' : 'Purchase'}
                </span>
                {item?.isGift && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-white">
                    <Icon name="Gift" size={12} className="mr-1" />
                    Gift
                  </span>
                )}
              </div>

              {/* Rental Duration Selector */}
              {item?.type === 'rental' && (
                <div className="mb-4">
                  <Select
                    label="Rental Duration"
                    options={rentalOptions}
                    value={selectedDuration}
                    onChange={handleDurationChange}
                    className="max-w-xs"
                  />
                </div>
              )}

              {/* Gift Message */}
              {item?.isGift && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <Icon name="Mail" size={14} className="inline mr-1" />
                    Gift for: <span className="font-medium">{item?.giftRecipient}</span>
                  </p>
                  {item?.giftMessage && (
                    <p className="text-sm text-gray-500 mt-1 italic">
                      "{item?.giftMessage}"
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <div className="text-xl font-semibold text-gray-900">
                  {formatPrice(item?.price)}
                </div>
                {item?.originalPrice && item?.originalPrice > item?.price && (
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(item?.originalPrice)}
                  </div>
                )}
                {item?.savings && (
                  <div className="text-sm text-green-600 font-medium">
                    Save {formatPrice(item?.savings)}
                  </div>
                )}
              </div>

              {/* Quantity Controls (for purchases) */}
              {item?.type === 'purchase' && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item?.id, Math.max(1, item?.quantity - 1))}
                    disabled={item?.quantity <= 1}
                  >
                    <Icon name="Minus" size={14} />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                    {item?.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item?.id, item?.quantity + 1)}
                  >
                    <Icon name="Plus" size={14} />
                  </Button>
                </div>
              )}

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item?.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;