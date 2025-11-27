import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Discover",
      description: "Browse our vast library of 100,000+ books with intelligent recommendations tailored to your taste.",
      icon: "Search",
      color: "bg-blue-500",
      features: [
        "Personalized recommendations",
        "Advanced search filters",
        "Genre-based discovery",
        "Author spotlights"
      ]
    },
    {
      id: 2,
      title: "Choose Your Access",
      description: "Rent by the hour to sample new authors or buy forever to build your permanent digital library.",
      icon: "Clock",
      color: "bg-accent",
      features: [
        "Flexible rental pricing",
        "Permanent ownership option",
        "Instant access",
        "No hidden fees"
      ]
    },
    {
      id: 3,
      title: "Start Reading",
      description: "Enjoy a distraction-free reading experience with customizable themes and seamless sync across devices.",
      icon: "BookOpen",
      color: "bg-primary",
      features: [
        "Customizable reading interface",
        "Cross-device synchronization",
        "Bookmarks and highlights",
        "Offline reading support"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-crimson font-bold text-primary mb-4">
            How BookVault Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform your reading experience. From discovery to ownership, we've made it seamless.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              {/* Connection Line (Desktop) */}
              {index < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
              )}

              <div className="relative bg-white rounded-2xl p-8 literary-shadow hover:shadow-xl transition-all duration-300 group">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {step?.id}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 ${step?.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={step?.icon} size={32} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-crimson font-bold text-primary mb-4">
                  {step?.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step?.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {step?.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3 text-sm text-gray-600">
                      <Icon name="Check" size={16} className="text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 literary-shadow">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-crimson font-bold text-primary mb-6">
                Experience the Difference
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Instant Access</h4>
                    <p className="text-gray-600">
                      Start reading immediately after purchase or rental. No downloads, no waiting.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Smartphone" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cross-Device Sync</h4>
                    <p className="text-gray-600">
                      Your bookmarks, highlights, and reading progress sync seamlessly across all devices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-literary-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={20} className="text-literary-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
                    <p className="text-gray-600">
                      Your reading data is encrypted and private. We never share your personal information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock Interface Preview */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon name="BookOpen" size={16} />
                    </div>
                    <span className="font-semibold">Reading Interface</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="h-2 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 bg-white/20 rounded w-3/4"></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-80">Chapter 3 of 12</span>
                  <div className="flex items-center space-x-2">
                    <Icon name="Bookmark" size={14} />
                    <Icon name="Settings" size={14} />
                    <Icon name="Share" size={14} />
                  </div>
                </div>

                <div className="mt-4 h-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/4 bg-accent rounded-full"></div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-literary-gold/20 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-crimson font-bold text-primary mb-4">
            Ready to Start Your Literary Journey?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 50,000+ readers who've discovered the perfect balance between exploration and ownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/library-catalog">
              <Button
                variant="default"
                size="lg"
                className="bg-primary hover:bg-primary/90 px-8 py-3"
                iconName="BookOpen"
                iconPosition="left"
              >
                Browse Library
              </Button>
            </Link>
            <Link to="/reader-dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
                iconName="User"
                iconPosition="left"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;