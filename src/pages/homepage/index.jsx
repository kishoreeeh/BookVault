import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SearchSection from './components/SearchSection';
import TrendingSection from './components/TrendingSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import GenreDiscoverySection from './components/GenreDiscoverySection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <SearchSection />
        <TrendingSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <GenreDiscoverySection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;