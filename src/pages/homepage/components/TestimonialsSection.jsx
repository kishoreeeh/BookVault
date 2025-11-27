import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Literature Professor",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      content: `BookVault has revolutionized how I approach reading. I can sample 10 books for the price of buying one, which has helped me discover so many new authors I never would have tried otherwise.`,
      rating: 5,
      booksRead: 127,
      favoriteGenre: "Literary Fiction"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Graduate Student",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: `As a student on a tight budget, the rental option is a lifesaver. I can access expensive textbooks and research materials without breaking the bank. The highlighting feature syncs perfectly across devices.`,
      rating: 5,
      booksRead: 89,
      favoriteGenre: "Academic"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Book Club Organizer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: `Our book club loves BookVault! We can all rent the same title for our monthly discussions, and those who fall in love with a book can easily purchase it. The flexibility is unmatched.`,
      rating: 5,
      booksRead: 203,
      favoriteGenre: "Contemporary Fiction"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: `The reading interface is beautifully designed and the cross-device sync is flawless. I start reading on my laptop during lunch and seamlessly continue on my phone during my commute.`,
      rating: 5,
      booksRead: 156,
      favoriteGenre: "Science Fiction"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Retired Teacher",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      content: `I've built an amazing digital library through BookVault. The recommendation engine introduced me to authors I never knew existed. It's like having a personal librarian who knows my taste perfectly.`,
      rating: 5,
      booksRead: 342,
      favoriteGenre: "Historical Fiction"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-crimson font-bold text-white mb-4">
            What Our Readers Say
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Join thousands of satisfied readers who've transformed their reading experience with BookVault
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-8 lg:p-12 literary-shadow">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="flex items-center mb-6">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className="text-accent fill-current"
                    />
                  ))}
                </div>
                
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                  "{testimonials?.[currentTestimonial]?.content}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonials?.[currentTestimonial]?.avatar}
                      alt={testimonials?.[currentTestimonial]?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonials?.[currentTestimonial]?.name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials?.[currentTestimonial]?.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reader Stats */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Reader Profile</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Books Read</span>
                    <span className="font-semibold text-primary">
                      {testimonials?.[currentTestimonial]?.booksRead}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Favorite Genre</span>
                    <span className="font-semibold text-primary">
                      {testimonials?.[currentTestimonial]?.favoriteGenre}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-semibold text-primary">2023</span>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="mt-6 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-center space-x-2">
                    <Icon name="Award" size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">Verified Reader</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Icon name="ChevronLeft" size={20} className="text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Icon name="ChevronRight" size={20} className="text-primary" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-accent' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Additional Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {testimonials?.slice(0, 3)?.map((testimonial, index) => (
            <div key={testimonial?.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className="text-accent fill-current"
                  />
                ))}
              </div>
              
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                "{testimonial?.content?.substring(0, 120)}..."
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm">
                    {testimonial?.name}
                  </h5>
                  <p className="text-white/70 text-xs">
                    {testimonial?.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold text-accent mb-2">50K+</div>
            <div className="text-sm text-gray-200">Happy Readers</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-accent mb-2">4.9</div>
            <div className="text-sm text-gray-200">Average Rating</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-accent mb-2">2.5M+</div>
            <div className="text-sm text-gray-200">Books Read</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-accent mb-2">98%</div>
            <div className="text-sm text-gray-200">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;