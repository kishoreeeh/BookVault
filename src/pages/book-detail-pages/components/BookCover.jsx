import React from 'react';
import Image from '../../../components/AppImage';

const BookCover = ({ book }) => {
  return (
    <div className="relative group">
      <div className="aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-lg literary-shadow book-hover">
        <Image
          src={book?.coverImage}
          alt={`${book?.title} book cover`}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Format badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {book?.formats?.map((format) => (
          <span
            key={format}
            className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-primary rounded-full shadow-sm"
          >
            {format}
          </span>
        ))}
      </div>
      {/* Rating badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span className="text-xs font-medium text-gray-800">{book?.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCover;