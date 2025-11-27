import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeIcon = (type) => {
    const iconMap = {
      streak: 'Flame',
      genre: 'Compass',
      milestone: 'Trophy',
      speed: 'Zap',
      social: 'Users'
    };
    return iconMap?.[type] || 'Award';
  };

  const getBadgeColor = (type) => {
    const colorMap = {
      streak: 'text-orange-500 bg-orange-50',
      genre: 'text-purple-500 bg-purple-50',
      milestone: 'text-yellow-500 bg-yellow-50',
      speed: 'text-blue-500 bg-blue-50',
      social: 'text-green-500 bg-green-50'
    };
    return colorMap?.[type] || 'text-gray-500 bg-gray-50';
  };

  return (
    <div className="bg-white rounded-xl literary-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-crimson font-semibold text-primary">Recent Achievements</h3>
        <span className="text-sm text-muted-foreground">{achievements?.length} earned</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements?.map((achievement) => (
          <div key={achievement?.id} className="text-center group cursor-pointer">
            <div className={`w-16 h-16 rounded-full ${getBadgeColor(achievement?.type)} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`}>
              <Icon name={getBadgeIcon(achievement?.type)} size={24} />
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-1">{achievement?.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{achievement?.description}</p>
            <div className="text-xs text-muted-foreground mt-1">
              {achievement?.earnedDate}
            </div>
          </div>
        ))}
      </div>
      {achievements?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Award" size={24} className="text-gray-400" />
          </div>
          <p className="text-muted-foreground">Start reading to earn your first achievement!</p>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;