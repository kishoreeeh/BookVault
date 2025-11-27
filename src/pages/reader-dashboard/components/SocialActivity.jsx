import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SocialActivity = ({ activities, readingLists }) => {
  return (
    <div className="bg-white rounded-xl literary-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-crimson font-semibold text-primary">Social & Lists</h3>
        <Button variant="ghost" iconName="Plus" iconPosition="left">
          Create List
        </Button>
      </div>
      {/* Reading Lists */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Your Reading Lists</h4>
        <div className="space-y-2">
          {readingLists?.map((list) => (
            <div key={list?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="List" size={14} className="text-white" />
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-900">{list?.name}</h5>
                  <p className="text-xs text-muted-foreground">{list?.bookCount} books</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  list?.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {list?.isPublic ? 'Public' : 'Private'}
                </span>
                <Button variant="ghost" size="sm" iconName="Share" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Friend Activity */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Friend Activity</h4>
        <div className="space-y-3">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={activity?.userAvatar} 
                  alt={activity?.userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity?.userName}</span> {activity?.action}
                  <Link to="/book-detail-pages" className="text-primary hover:text-secondary transition-colors">
                    {activity?.bookTitle}
                  </Link>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity?.timeAgo}</p>
              </div>
              <div className="w-10 h-12 rounded overflow-hidden flex-shrink-0">
                <Image 
                  src={activity?.bookCover} 
                  alt={activity?.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Book Club Invitations */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Book Club Invitations</h4>
          <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">2 new</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <h5 className="text-sm font-medium text-gray-900">Mystery Lovers Club</h5>
              <p className="text-xs text-muted-foreground">Currently reading: The Silent Patient</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Decline</Button>
              <Button variant="default" size="sm">Join</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialActivity;