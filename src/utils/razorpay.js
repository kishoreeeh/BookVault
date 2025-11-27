import Razorpay from 'razorpay';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_R5uZgmenogCy4j';
const RAZORPAY_KEY_SECRET = import.meta.env.VITE_RAZORPAY_KEY_SECRET || 'iou4q509iexeJOlJNCpq7gBd';

// Initialize Razorpay instance (for backend - mocked here)
export const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Create order function (mocked since no backend)
export const createRazorpayOrder = async (amount, currency = 'INR') => {
  try {
    // In a real implementation, this would call your backend API
    // For demo purposes, we'll create a mock order
    const orderId = `order_${Date.now()}`;

    return {
      id: orderId,
      amount: amount * 100, // Razorpay expects amount in paisa
      currency,
      key: RAZORPAY_KEY_ID,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Initialize payment on frontend
export const initializeRazorpayPayment = (orderData, onSuccess, onFailure) => {
  const options = {
    key: orderData.key,
    amount: orderData.amount,
    currency: orderData.currency,
    name: 'BookVault',
    description: 'Book Purchase/Rental',
    // For test mode, we don't use order_id as it requires backend order creation
    // order_id: orderData.id,
    handler: function (response) {
      // Payment successful
      console.log('Payment successful:', response);
      onSuccess(response);
    },
    prefill: {
      name: 'Customer Name',
      email: 'customer@example.com',
      contact: '9999999999',
    },
    theme: {
      color: '#3B82F6', // Primary blue color
    },
    modal: {
      ondismiss: function() {
        console.log('Payment modal dismissed');
        onFailure({ reason: 'dismissed' });
      }
    },
    // Enable QR code payment for UPI apps
    config: {
      display: {
        language: 'en',
        hide: [
          {
            method: 'paylater'
          }
        ],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on('payment.failed', function (response) {
    console.error('Payment failed:', response.error);
    onFailure(response.error);
  });

  return rzp;
};

// Load Razorpay script dynamically
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script is already in the DOM
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.onload = () => resolve(true);
      existingScript.onerror = () => resolve(false);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    document.head.appendChild(script);
  });
};
