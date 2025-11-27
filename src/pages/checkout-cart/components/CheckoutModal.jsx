import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { loadRazorpayScript, createRazorpayOrder, initializeRazorpayPayment } from '../../../utils/razorpay';

const CheckoutModal = ({ isOpen, onClose, orderTotal, onCompleteOrder, preselectedPaymentMethod = 'card' }) => {
  const [paymentMethod, setPaymentMethod] = useState(preselectedPaymentMethod || 'card');
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    phoneNumber: '',
    saveCard: false,
    agreeTerms: false
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentOptions = [
    { value: 'card', label: 'Credit/Debit Card' },
    { value: 'razorpay', label: 'Razorpay' },
    { value: 'apple', label: 'Apple Pay' },
    { value: 'google', label: 'Google Pay' },
    { value: 'gpay', label: 'GPay / PhonePe' },
    { value: 'cod', label: 'Cash on Delivery' }
  ];

  const stateOptions = [
    { value: 'TN', label: 'Tamil Nadu' }
  ];

  const cityOptions = [
    { value: 'chennai', label: 'Chennai' },
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'madurai', label: 'Madurai' },
    { value: 'tiruchirappalli', label: 'Tiruchirappalli' },
    { value: 'salem', label: 'Salem' },
    { value: 'tirunelveli', label: 'Tirunelveli' },
    { value: 'tiruppur', label: 'Tiruppur' },
    { value: 'vellore', label: 'Vellore' },
    { value: 'thoothukudi', label: 'Thoothukudi' },
    { value: 'thanjavur', label: 'Thanjavur' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData?.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (paymentMethod === 'razorpay') {
      // Handle Razorpay payment
      setIsProcessing(true);

      try {
        // Load Razorpay script
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert('Razorpay SDK failed to load. Please try again.');
          setIsProcessing(false);
          return;
        }

        // Create order
        const orderData = await createRazorpayOrder(orderTotal);

        // Initialize payment
        const rzp = initializeRazorpayPayment(
          orderData,
          (response) => {
            // Payment success
            console.log('Payment successful:', response);
            setIsProcessing(false);
            onCompleteOrder();
            onClose();
          },
          (error) => {
            // Payment failure
            console.error('Payment failed:', error);
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
          }
        );

        // Open Razorpay modal
        rzp.open();
      } catch (error) {
        console.error('Error initializing Razorpay:', error);
        setIsProcessing(false);
        alert('Failed to initialize payment. Please try again.');
      }
    } else {
      // Handle other payment methods
      setIsProcessing(true);

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onCompleteOrder();
        onClose();
      }, 2000);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>

        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Complete Your Order</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Payment Method Selection */}
            <div className="mb-6">
              <Select
                label="Payment Method"
                options={paymentOptions}
                value={paymentMethod}
                onChange={setPaymentMethod}
              />
            </div>



            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <Input
                  label="Card Number"
                  type="text"
                  value={formData?.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                  placeholder="1234 5678 9012 3456"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    value={formData?.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                    placeholder="MM/YY"
                    required
                  />
                  <Input
                    label="CVV"
                    type="text"
                    value={formData?.cvv}
                    onChange={(e) => handleInputChange('cvv', e?.target?.value)}
                    placeholder="123"
                    required
                  />
                </div>

                <Input
                  label="Cardholder Name"
                  type="text"
                  value={formData?.cardName}
                  onChange={(e) => handleInputChange('cardName', e?.target?.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {/* GPay / PhonePe Options */}
            {paymentMethod === 'gpay' && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg text-center">
                <Icon name="Smartphone" size={32} className="mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-800 mb-2">Scan the QR code with any UPI app to complete payment.</p>
                <div className="mx-auto w-48 h-48 bg-white border rounded-lg flex items-center justify-center mb-4">
                  <QRCode
                    value={`upi://pay?pa=gurukishore2005@oksbi&pn=kishore&am=${orderTotal.toFixed(2)}&cu=INR`}
                    size={176}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">UPI ID: gurukishore2005@oksbi</p>
                  <p className="text-sm font-medium text-gray-700">Amount: {formatPrice(orderTotal)}</p>
                  <p className="text-xs text-gray-500">Scan with GPay, PhonePe, Paytm, or any UPI app</p>
                  <div className="mt-3 p-2 bg-white rounded border text-xs text-gray-600 font-mono break-all">
                    upi://pay?pa=gurukishore2005@oksbi&pn=kishore&am={orderTotal.toFixed(2)}&cu=INR
                  </div>
                </div>
              </div>
            )}

            {/* Razorpay Option */}
            {paymentMethod === 'razorpay' && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg text-center">
                <Icon name="CreditCard" size={32} className="mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-gray-800">Secure payment powered by Razorpay. You'll be redirected to Razorpay's secure payment gateway.</p>
              </div>
            )}

            {/* Digital Wallet Options */}
            {(paymentMethod === 'paypal' || paymentMethod === 'apple' || paymentMethod === 'google') && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center">
                <Icon
                  name={paymentMethod === 'paypal' ? 'CreditCard' : 'Smartphone'}
                  size={32}
                  className="mx-auto mb-2 text-gray-400"
                />
                <p className="text-sm text-gray-600">
                  You'll be redirected to {paymentOptions?.find(p => p?.value === paymentMethod)?.label} to complete your payment
                </p>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-center">
                <Icon name="Truck" size={32} className="mx-auto mb-2 text-yellow-600" />
                <p className="text-sm text-gray-800">You selected Cash on Delivery. Please ensure someone is available to receive the package. COD orders may have additional verification.</p>
              </div>
            )}

            {/* Delivery Address */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-gray-900">Delivery Address</h4>

              <Input
                label="Email Address"
                type="email"
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                placeholder="your@email.com"
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                placeholder="+91 98765 43210"
                required
              />

              <Input
                label="House Address"
                type="text"
                value={formData?.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e?.target?.value)}
                placeholder="123 Main Street, Apartment 4B"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="City"
                  options={cityOptions}
                  value={formData?.city}
                  onChange={(value) => handleInputChange('city', value)}
                  placeholder="Select city"
                  required
                />
                <Select
                  label="State"
                  options={stateOptions}
                  value={formData?.state}
                  onChange={(value) => handleInputChange('state', value)}
                  placeholder="Select state"
                  required
                />
              </div>

              <Input
                label="PIN Code"
                type="text"
                value={formData?.zipCode}
                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                placeholder="600001"
                required
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3 mb-6">
              <Checkbox
                label="Save this card for future purchases"
                checked={formData?.saveCard}
                onChange={(e) => handleInputChange('saveCard', e?.target?.checked)}
              />
              
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={formData?.agreeTerms}
                onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
                required
              />
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="default"
                className="flex-1"
                loading={isProcessing}
                disabled={!formData?.agreeTerms}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(orderTotal)}`}
              </Button>
            </div>

            {/* Security Notice */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Icon name="Shield" size={12} />
                <span>SSL Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Lock" size={12} />
                <span>256-bit Encryption</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;