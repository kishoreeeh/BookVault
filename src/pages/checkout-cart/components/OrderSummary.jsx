import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { useState } from 'react';

const OrderSummary = ({ 
  subtotal, 
  discount, 
  tax, 
  total, 
  bookVaultCredits, 
  onApplyCredits, 
  creditsApplied,
  onProceedToCheckout 
}) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 literary-shadow sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatPrice(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">-{formatPrice(discount)}</span>
          </div>
        )}
        
        {creditsApplied > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">BookVault Credits</span>
            <span className="text-green-600">-{formatPrice(creditsApplied)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">{formatPrice(tax)}</span>
        </div>
        
        <hr className="border-gray-200" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">{formatPrice(total)}</span>
        </div>
      </div>

      {/* BookVault Credits */}
      {bookVaultCredits > 0 && creditsApplied === 0 && (
        <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Coins" size={16} className="text-accent" />
              <span className="text-sm font-medium text-gray-900">
                BookVault Credits Available
              </span>
            </div>
            <span className="text-sm font-semibold text-accent">
              {formatPrice(bookVaultCredits)}
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Use your earned credits to reduce your total
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onApplyCredits}
            className="w-full"
          >
            Apply Credits
          </Button>
        </div>
      )}

      {/* Savings Highlight */}
      {discount > 0 && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Percent" size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">
              You're saving {formatPrice(discount)}!
            </span>
          </div>
          <p className="text-xs text-green-700">
            Great choice! You've unlocked bundle discounts.
          </p>
        </div>
      )}

      {/* Checkout Button */}
      {/* Payment Method Selector (small) */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Choose payment method</p>
        <div className="grid grid-cols-1 gap-2">
          <label className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'bg-gray-50 border' : ''}`}>
            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
            <span className="ml-1">UPI</span>
          </label>
          <label className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${paymentMethod === 'gpay' ? 'bg-gray-50 border' : ''}`}>
            <input type="radio" name="payment" value="gpay" checked={paymentMethod === 'gpay'} onChange={() => setPaymentMethod('gpay')} />
            <span className="ml-1">GPay / PhonePe</span>
          </label>
          <label className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'bg-gray-50 border' : ''}`}>
            <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
            <span className="ml-1">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <Button
        variant="default"
        size="lg"
        onClick={() => onProceedToCheckout(paymentMethod)}
        className="w-full mb-4"
      >
        <Icon name="CreditCard" size={18} className="mr-2" />
        Proceed to Checkout
      </Button>

      {/* Security Badges */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Icon name="Shield" size={12} />
          <span>SSL Secure</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Lock" size={12} />
          <span>256-bit Encryption</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center mb-2">We accept</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            VISA
          </div>
          <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
            MC
          </div>
          <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
          <div className="w-8 h-5 bg-gray-600 rounded text-white text-xs flex items-center justify-center">
            <Icon name="Smartphone" size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;