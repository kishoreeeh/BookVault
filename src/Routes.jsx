import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import CheckoutCart from './pages/checkout-cart';
import ReadingInterface from './pages/reading-interface';
import ReaderDashboard from './pages/reader-dashboard';
import BookDetailPages from './pages/book-detail-pages';
import LibraryCatalog from './pages/library-catalog';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/checkout-cart" element={<CheckoutCart />} />
        <Route path="/reading-interface" element={<ReadingInterface />} />
        <Route path="/reader-dashboard" element={<ReaderDashboard />} />
        <Route path="/book-detail-pages" element={<BookDetailPages />} />
        <Route path="/library-catalog" element={<LibraryCatalog />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
