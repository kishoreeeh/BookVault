import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';
import RecommendedBooks from './components/RecommendedBooks';
import EmptyCart from './components/EmptyCart';
import CheckoutModal from './components/CheckoutModal';
import { useCart } from '../../context/CartContext';

const CheckoutCart = () => {
  const { cartItems, addToCart, updateQuantity, removeItem, updateRentalDuration, calculateSubtotal, calculateDiscount, calculateTax, calculateTotal, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutPaymentMethod, setCheckoutPaymentMethod] = useState('card');
  const [bookVaultCredits] = useState(15.50);
  const [creditsApplied, setCreditsApplied] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      type: "rental",
      rentalDuration: "24h",
      price: 4.99,
      originalPrice: 6.99,
      savings: 2.00,
      quantity: 1
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop",
      type: "purchase",
      price: 14.99,
      quantity: 1
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      type: "purchase",
      price: 12.99,
      isGift: true,
      giftRecipient: "Sarah Johnson",
      giftMessage: "Hope you enjoy this amazing book! Happy Birthday!",
      quantity: 1
    }
  ];

  const recommendedBooks = [
    {
      id: 4,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      rating: 4.6,
      reviews: 12543,
      rentalPrice: 3.99,
      purchasePrice: 13.99
    },
    {
      id: 5,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
      rating: 4.4,
      reviews: 8921,
      rentalPrice: 2.99,
      purchasePrice: 11.99
    },
    {
      id: 6,
      title: "Educated",
      author: "Tara Westover",
      cover: "C:\Users\ADMIN\Downloads\educated.webp",
      rating: 4.8,
      reviews: 15672,
      rentalPrice: 4.49,
      purchasePrice: 15.99
    }
  ];

  useEffect(() => {
    // Seed mock data into cart only if cart is empty (first run)
    if (!cartItems || cartItems.length === 0) {
      setTimeout(() => {
        mockCartItems.forEach(item => {
          // reuse addToCart but map mock shape to expected book shape
          addToCart({ id: item.id, title: item.title, author: item.author, cover: item.cover, price: item.price, purchasePrice: item.price, rentalPrice: item.price }, item.type);
        });
        setIsLoading(false);
      }, 600);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => updateQuantity(itemId, newQuantity);

  const handleRemoveItem = (itemId) => removeItem(itemId);

  const handleUpdateRentalDuration = (itemId, duration) => updateRentalDuration(itemId, duration);

  const handleAddToCart = (book, type) => addToCart(book, type);

  const handleApplyCredits = () => {
    const maxCreditsToApply = Math.min(bookVaultCredits, calculateTotal());
    setCreditsApplied(maxCreditsToApply);
  };

  const handleCompleteOrder = () => {
    // Handle successful order completion
    clearCart();
    setCreditsApplied(0);
    alert('Order completed successfully! You can now access your books.');
  };

  // Use calculations provided by cart context but subtract creditsApplied when showing total
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const tax = calculateTax();
  const total = Math.max(0, (subtotal || 0) - (discount || 0) + (tax || 0) - creditsApplied);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your cart...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/homepage" className="hover:text-primary">Home</Link>
            <Icon name="ChevronRight" size={16} />
            <Link to="/library-catalog" className="hover:text-primary">Catalog</Link>
            <Icon name="ChevronRight" size={16} />
            <span className="text-gray-900">Shopping Cart</span>
          </nav>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {/* Page Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-crimson font-semibold text-gray-900 mb-2">
                    Shopping Cart
                  </h1>
                  <p className="text-gray-600">
                    {cartItems?.length} {cartItems?.length === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>
                
                <div className="mt-4 lg:mt-0">
                  <Button variant="outline" asChild>
                    <Link to="/library-catalog">
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  {cartItems?.map((item) => (
                    <CartItem
                      key={item?.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                      onUpdateRentalDuration={handleUpdateRentalDuration}
                    />
                  ))}

                  {/* Subscription Upgrade Prompt */}
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <Icon name="Crown" size={24} className="text-yellow-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          Upgrade to BookVault Premium
                        </h3>
                        <p className="text-blue-100 mb-4">
                          Get unlimited rentals, exclusive early access, and 20% off all purchases for just $9.99/month.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button variant="secondary" size="sm">
                            <Icon name="Sparkles" size={16} className="mr-2" />
                            Learn More
                          </Button>
                          <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary">
                            Maybe Later
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <OrderSummary
                    subtotal={subtotal}
                    discount={discount}
                    tax={tax}
                    total={total}
                    bookVaultCredits={bookVaultCredits}
                    creditsApplied={creditsApplied}
                    onApplyCredits={handleApplyCredits}
                    onProceedToCheckout={(method) => { setCheckoutPaymentMethod(method || 'card'); setIsCheckoutModalOpen(true); }}
                  />
                </div>
              </div>

              {/* Recommended Books */}
              <div className="mt-12">
                <RecommendedBooks
                  recommendations={recommendedBooks}
                  onAddToCart={handleAddToCart}
                />
              </div>

              {/* Trust Signals */}
              <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 literary-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <Icon name="Truck" size={20} className="text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Instant Access</p>
                      <p className="text-sm text-gray-600">Start reading immediately</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Icon name="RefreshCw" size={20} className="text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Easy Returns</p>
                      <p className="text-sm text-gray-600">30-day money-back guarantee</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3">
                    <Icon name="Headphones" size={20} className="text-purple-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">24/7 Support</p>
                      <p className="text-sm text-gray-600">We're here to help</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Checkout Modal */}
          <CheckoutModal
            isOpen={isCheckoutModalOpen}
            onClose={() => setIsCheckoutModalOpen(false)}
            orderTotal={total}
            preselectedPaymentMethod={checkoutPaymentMethod}
            onCompleteOrder={handleCompleteOrder}
          />
    </div>
  );
};

export default CheckoutCart;