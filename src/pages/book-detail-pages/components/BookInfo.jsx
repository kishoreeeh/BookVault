import React from 'react';
import Icon from '../../../components/AppIcon';

const BookInfo = ({ book }) => {
  return (
    <div className="space-y-6">
      {/* Title and Author */}
      <div>
        <h1 className="text-3xl lg:text-4xl font-crimson font-semibold text-primary mb-2">
          {book?.title}
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          by <span className="font-medium text-primary hover:underline cursor-pointer">{book?.author}</span>
        </p>
        <p className="text-sm text-gray-500">{book?.publisher} • {book?.publishYear}</p>
      </div>
      {/* Quick Stats */}
      <div className="flex flex-wrap gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Icon name="BookOpen" size={16} />
          <span>{book?.pages} pages</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} />
          <span>{book?.readingTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} />
          <span>Published {book?.publishYear}</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Globe" size={16} />
          <span>{book?.language}</span>
        </div>
      </div>
      {/* Genre Tags */}
      <div className="flex flex-wrap gap-2">
        {book?.genres?.map((genre) => (
          <span
            key={genre}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
          >
            {genre}
          </span>
        ))}
      </div>
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-3">About This Book</h3>
        <p className="text-gray-700 leading-relaxed">{book?.description}</p>
      </div>
      {/* Content Warnings */}
      {book?.contentWarnings && book?.contentWarnings?.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} />
            Content Advisory
          </h4>
          <p className="text-sm text-yellow-700">
            This book contains: {book?.contentWarnings?.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookInfo;