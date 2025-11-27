# TODO: Update Library Catalog Books

## Tasks
- [x] Expand mockBooks array in src/pages/library-catalog/index.jsx with 12-17 additional unique books (total 20-25 books)
- [x] Ensure all book titles are unique
- [x] Set proper prices: rentPrice between $2.00-$5.00, buyPrice between $10.00-$25.00, with rentPrice < buyPrice
- [x] Vary other fields (author, rating, reviewCount, readingTime, etc.) for diversity
- [x] Verify no duplicates in the catalog
- [x] Replace all coverImage URLs with actual book cover images (e.g., Atomic Habits with its real cover)
- [x] Fix duplicate Atomic Habits image issue
- [x] Ensure all books have valid cover images

# TODO: Payment Integration Migration

## Tasks
- [ ] Remove PayPal payment option from CheckoutModal.jsx
- [ ] Install Razorpay SDK for React
- [ ] Create Razorpay payment utility/service
- [ ] Update CheckoutModal to integrate Razorpay payment flow
- [ ] Add Razorpay environment variables to .env file
- [ ] Implement Razorpay payment handler with order creation
- [ ] Update payment success/failure handling
- [ ] Test Razorpay integration
