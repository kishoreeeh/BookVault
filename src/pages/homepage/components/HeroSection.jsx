import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

  const floatingBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      rentPrice: "$0.75/hour",
      buyPrice: "$14.99"
    },
    {
      id: 2,
      title: "Atomic Habits",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      rentPrice: "$0.60/hour",
      buyPrice: "$16.99"
    },
    {
      id: 3,
      title: "The Seven Husbands",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rentPrice: "$0.50/hour",
      buyPrice: "$12.99"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookIndex((prev) => (prev + 1) % floatingBooks?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-crimson font-bold leading-tight">
                Read More,
                <span className="block text-accent">Own What Matters</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-lg">
                Your literary sanctuary where flexibility meets passion. Rent by the hour or buy forever—the choice is yours.
              </p>
            </div>

            {/* Value Proposition */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Rent by Hour</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Sample books for as low as $0.50/hour. Perfect for discovering new authors.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-literary-gold rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Buy Forever</h3>
                </div>
                <p className="text-gray-200 text-sm">
                  Own your favorites permanently. Build your digital library with confidence.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/library-catalog">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Explore Library
                </Button>
              </Link>
              <Link to="/reader-dashboard">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
                  iconName="User"
                  iconPosition="left"
                >
                  Start Reading
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50K+</div>
                <div className="text-sm text-gray-300">Active Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100K+</div>
                <div className="text-sm text-gray-300">Books Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1.2M+</div>
                <div className="text-sm text-gray-300">Books Read Today</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Books Animation */}
          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {floatingBooks?.map((book, index) => (
                <div
                  key={book?.id}
                  className={`absolute transition-all duration-1000 transform ${
                    index === currentBookIndex
                      ? 'scale-110 z-30 opacity-100'
                      : index === (currentBookIndex + 1) % floatingBooks?.length
                      ? 'scale-90 translate-x-20 z-20 opacity-70' :'scale-75 -translate-x-20 z-10 opacity-40'
                  }`}
                >
                  <div className="book-hover">
                    <div className="relative group">
                      <div className="w-48 h-64 rounded-lg overflow-hidden literary-shadow">
                        <Image
                          src={book?.cover}
                          alt={book?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Book Info Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h4 className="text-white font-semibold text-sm mb-2">{book?.title}</h4>
                        <div className="flex justify-between text-xs">
                          <span className="text-accent">{book?.rentPrice}</span>
                          <span className="text-literary-gold">{book?.buyPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-accent/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 bg-literary-gold/20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-0 w-12 h-12 bg-white/20 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <Icon name="ChevronDown" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;