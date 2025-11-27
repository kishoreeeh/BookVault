import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ReviewsSection = ({ reviews, averageRating, totalReviews }) => {
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: 'verified', label: 'Verified Purchases' },
    { value: 'similar-taste', label: 'Similar Taste' },
    { value: '5-star', label: '5 Stars' },
    { value: '4-star', label: '4 Stars' },
    { value: '3-star', label: '3 Stars' },
    { value: '2-star', label: '2 Stars' },
    { value: '1-star', label: '1 Star' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'helpful', label: 'Most Helpful' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' }
  ];

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 literary-shadow">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Reader Reviews</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {renderStars(Math.round(averageRating))}
              <span className="ml-2 text-lg font-semibold text-gray-900">{averageRating}</span>
            </div>
            <span className="text-gray-500">({totalReviews?.toLocaleString()} reviews)</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Edit3" iconPosition="left">
          Write Review
        </Button>
      </div>
      {/* Rating Distribution */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-800 mb-3">Rating Distribution</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((stars) => {
            const count = reviews?.filter(r => r?.rating === stars)?.length;
            const percentage = (count / reviews?.length) * 100;
            
            return (
              <div key={stars} className="flex items-center gap-3 text-sm">
                <span className="w-8 text-gray-600">{stars}★</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-12 text-gray-600 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Select
          options={filterOptions}
          value={filterBy}
          onChange={setFilterBy}
          placeholder="Filter reviews"
          className="sm:w-48"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
          className="sm:w-48"
        />
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                {review?.reviewer?.name?.charAt(0)}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h5 className="font-medium text-gray-900">{review?.reviewer?.name}</h5>
                  {review?.verified && (
                    <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full flex items-center gap-1">
                      <Icon name="CheckCircle" size={12} />
                      Verified Purchase
                    </span>
                  )}
                  {review?.similarTaste && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      Similar Taste
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review?.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(review?.date)}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{review?.readingMethod}</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-3">{review?.content}</p>

                {/* Review Actions */}
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                    <Icon name="MessageCircle" size={14} />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                    <Icon name="Flag" size={14} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {reviews?.length > 3 && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;