import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecommendationsCarousel = ({ recommendations, title = "Readers Also Enjoyed" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, recommendations?.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 literary-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-8 h-8 p-0"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="w-8 h-8 p-0"
          />
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {recommendations?.map((book) => (
            <div
              key={book?.id}
              className="flex-shrink-0 w-1/4 min-w-0 group cursor-pointer"
            >
              <div className="space-y-3">
                {/* Book Cover */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg book-hover">
                  <Image
                    src={book?.coverImage}
                    alt={`${book?.title} book cover`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button variant="secondary" size="sm" iconName="Eye" iconPosition="left">
                      Preview
                    </Button>
                  </div>

                  {/* Recommendation Reason */}
                  <div className="absolute top-2 left-2 right-2">
                    <span className="inline-block px-2 py-1 bg-primary/90 text-white text-xs rounded-full">
                      {book?.recommendationReason}
                    </span>
                  </div>
                </div>

                {/* Book Info */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {book?.title}
                  </h4>
                  <p className="text-xs text-gray-600">{book?.author}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(Math.round(book?.rating))}
                    </div>
                    <span className="text-xs text-gray-500">({book?.reviewCount})</span>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-primary font-medium">₹{book?.pricing?.rental?.hourly}/hr</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-600">₹{book?.pricing?.purchase}</span>
                    </div>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <Icon name="Heart" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === currentIndex ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsCarousel;