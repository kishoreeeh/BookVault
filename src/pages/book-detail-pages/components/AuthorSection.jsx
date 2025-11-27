import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthorSection = ({ author }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 literary-shadow">
      <h3 className="text-lg font-semibold text-primary mb-4">About the Author</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={author?.photo}
              alt={`${author?.name} author photo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{author?.name}</h4>
          <p className="text-sm text-gray-600 mb-3">{author?.nationality} • {author?.birthYear} - {author?.deathYear || 'Present'}</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{author?.biography}</p>
          
          {/* Author Stats */}
          <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Icon name="BookOpen" size={14} />
              <span>{author?.booksCount} books</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Award" size={14} />
              <span>{author?.awards?.length} awards</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              <span>{author?.followers} followers</span>
            </div>
          </div>

          {/* Awards */}
          {author?.awards?.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-800 mb-2">Notable Awards</h5>
              <div className="flex flex-wrap gap-2">
                {author?.awards?.slice(0, 3)?.map((award, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                  >
                    {award}
                  </span>
                ))}
                {author?.awards?.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{author?.awards?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" iconName="BookOpen" iconPosition="left">
              View All Books
            </Button>
            <Button variant="ghost" size="sm" iconName="Play" iconPosition="left">
              Author Interview
            </Button>
            <Button variant="ghost" size="sm" iconName="UserPlus" iconPosition="left">
              Follow Author
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSection;