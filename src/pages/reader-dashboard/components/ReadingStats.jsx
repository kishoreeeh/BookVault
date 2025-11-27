import React from 'react';
import Icon from '../../../components/AppIcon';

const ReadingStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'BookOpen',
      label: 'Books Read',
      value: stats?.booksRead,
      color: 'text-primary',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Clock',
      label: 'Hours Reading',
      value: `${stats?.hoursReading}h`,
      color: 'text-accent',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: 'DollarSign',
      label: 'Money Saved',
      value: `₹${stats?.moneySaved}`,
      color: 'text-success',
      bgColor: 'bg-green-50'
    },
    {
      icon: 'Target',
      label: 'Reading Streak',
      value: `${stats?.readingStreak} days`,
      color: 'text-conversion-red',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-white rounded-xl literary-shadow p-4 text-center hover:shadow-lg transition-all duration-300">
          <div className={`w-12 h-12 ${item?.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <Icon name={item?.icon} size={20} className={item?.color} />
          </div>
          <div className="text-2xl font-bold text-primary mb-1">{item?.value}</div>
          <div className="text-sm text-muted-foreground">{item?.label}</div>
        </div>
      ))}
    </div>
  );
};

export default ReadingStats