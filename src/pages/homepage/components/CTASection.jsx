import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const benefits = [
    {
      icon: "BookOpen",
      title: "100,000+ Books",
      description: "Access the world\'s largest digital library"
    },
    {
      icon: "Clock",
      title: "Flexible Pricing",
      description: "Rent by hour or buy forever - your choice"
    },
    {
      icon: "Smartphone",
      title: "Read Anywhere",
      description: "Seamless sync across all your devices"
    },
    {
      icon: "Users",
      title: "Join 50K+ Readers",
      description: "Be part of our thriving reading community"
    }
  ];

  const pricingHighlights = [
    { feature: "Unlimited browsing", included: true },
    { feature: "Personalized recommendations", included: true },
    { feature: "Cross-device sync", included: true },
    { feature: "Offline reading", included: true },
    { feature: "Community features", included: true },
    { feature: "24/7 customer support", included: true }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-crimson font-bold text-primary mb-6">
            Start Your Literary Journey Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join thousands of readers who've discovered the perfect balance between exploration and ownership. 
            Your next favorite book is waiting.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/reader-dashboard">
              <Button
                variant="default"
                size="xl"
                className="bg-primary hover:bg-primary/90 px-10 py-4 text-lg font-semibold"
                iconName="UserPlus"
                iconPosition="left"
              >
                Create Free Account
              </Button>
            </Link>
            <Link to="/library-catalog">
              <Button
                variant="outline"
                size="xl"
                className="border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 text-lg font-semibold"
                iconName="BookOpen"
                iconPosition="left"
              >
                Browse Library
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-green-500" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CreditCard" size={16} className="text-blue-500" />
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={16} className="text-purple-500" />
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Headphones" size={16} className="text-orange-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits?.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Icon 
                  name={benefit?.icon} 
                  size={32} 
                  className="text-primary group-hover:text-white transition-colors duration-300" 
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {benefit?.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Value Proposition Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Rental Benefits */}
          <div className="bg-white rounded-3xl p-8 literary-shadow hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-crimson font-bold text-primary">Perfect for Exploration</h3>
                <p className="text-gray-600">Try before you buy</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Sample books from $0.50/hour</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Discover new authors risk-free</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Perfect for book clubs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">No long-term commitment</span>
              </div>
            </div>

            <div className="bg-accent/5 rounded-2xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">$0.50 - $1.00</div>
                <div className="text-sm text-gray-600">Average hourly rate</div>
              </div>
            </div>
          </div>

          {/* Purchase Benefits */}
          <div className="bg-white rounded-3xl p-8 literary-shadow hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Heart" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-crimson font-bold text-primary">Build Your Library</h3>
                <p className="text-gray-600">Own your favorites forever</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Permanent access to your books</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Unlimited re-reading</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Share with family members</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-green-500" />
                <span className="text-gray-700">Offline access forever</span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">$8.99 - $24.99</div>
                <div className="text-sm text-gray-600">Competitive pricing</div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 literary-shadow">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-crimson font-bold text-primary mb-4">
              Everything You Need to Read More
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every BookVault account comes with premium features designed to enhance your reading experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricingHighlights?.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Check" size={14} className="text-green-600" />
                </div>
                <span className="text-gray-700">{item?.feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-crimson font-bold mb-4">
              Ready to Transform Your Reading?
            </h3>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
              Join 50,000+ readers who've already discovered the BookVault difference. 
              Start with a free account and explore our library today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reader-dashboard">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-semibold"
                  iconName="Sparkles"
                  iconPosition="left"
                >
                  Get Started Free
                </Button>
              </Link>
              <Link to="/library-catalog">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-semibold"
                  iconName="Search"
                  iconPosition="left"
                >
                  Explore Books
                </Button>
              </Link>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>50,000+ readers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={16} />
                <span>100,000+ books</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;