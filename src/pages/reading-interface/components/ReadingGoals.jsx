import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReadingGoals = ({ isVisible }) => {
  const [showGoals, setShowGoals] = useState(false);
  
  const dailyGoal = {
    target: 60, // minutes
    current: 83, // minutes
    streak: 7,
    completed: true
  };

  const weeklyGoal = {
    target: 5, // books
    current: 3,
    completed: false
  };

  const monthlyGoal = {
    target: 20, // books
    current: 12,
    completed: false
  };

  const achievements = [
    {
      id: 1,
      title: "Speed Reader",
      description: "Read 250+ words per minute",
      icon: "Zap",
      unlocked: true,
      date: "2025-01-15"
    },
    {
      id: 2,
      title: "Night Owl",
      description: "Read for 2+ hours after 10 PM",
      icon: "Moon",
      unlocked: true,
      date: "2025-01-18"
    },
    {
      id: 3,
      title: "Consistent Reader",
      description: "7-day reading streak",
      icon: "Calendar",
      unlocked: true,
      date: "2025-01-20"
    },
    {
      id: 4,
      title: "Genre Explorer",
      description: "Read 5 different genres",
      icon: "Compass",
      unlocked: false,
      progress: "3/5"
    }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Goals Toggle Button */}
      <button
        onClick={() => setShowGoals(!showGoals)}
        className="fixed bottom-20 right-4 z-40 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary/90 transition-all"
        title="Reading Goals"
      >
        <Icon name="Target" size={20} />
      </button>
      {/* Goals Panel */}
      {showGoals && (
        <div className="fixed bottom-20 right-16 z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 literary-shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-crimson font-semibold text-lg text-primary">Reading Goals</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowGoals(false)}
              />
            </div>
          </div>

          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {/* Daily Goal */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-green-600" />
                  <span className="font-medium text-green-800">Daily Goal</span>
                </div>
                {dailyGoal?.completed && (
                  <Icon name="CheckCircle" size={16} className="text-green-600" />
                )}
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-green-700 mb-1">
                  <span>{dailyGoal?.current} min</span>
                  <span>{dailyGoal?.target} min target</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((dailyGoal?.current / dailyGoal?.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-green-600">
                <div className="flex items-center space-x-1">
                  <Icon name="Flame" size={12} />
                  <span>{dailyGoal?.streak} day streak</span>
                </div>
                <div>+{dailyGoal?.current - dailyGoal?.target} min bonus!</div>
              </div>
            </div>

            {/* Weekly Goal */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="BookOpen" size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-800">Weekly Goal</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-blue-700 mb-1">
                  <span>{weeklyGoal?.current} books</span>
                  <span>{weeklyGoal?.target} books target</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(weeklyGoal?.current / weeklyGoal?.target) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-xs text-blue-600">
                {weeklyGoal?.target - weeklyGoal?.current} books to go
              </div>
            </div>

            {/* Monthly Goal */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Trophy" size={16} className="text-purple-600" />
                  <span className="font-medium text-purple-800">Monthly Goal</span>
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-sm text-purple-700 mb-1">
                  <span>{monthlyGoal?.current} books</span>
                  <span>{monthlyGoal?.target} books target</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(monthlyGoal?.current / monthlyGoal?.target) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="text-xs text-purple-600">
                {Math.round(((monthlyGoal?.current / monthlyGoal?.target) * 100))}% complete
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Recent Achievements</h4>
              <div className="space-y-2">
                {achievements?.slice(0, 3)?.map((achievement) => (
                  <div 
                    key={achievement?.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      achievement?.unlocked 
                        ? 'bg-accent/10 border border-accent/20' :'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement?.unlocked 
                        ? 'bg-accent text-white' :'bg-gray-300 text-gray-500'
                    }`}>
                      <Icon name={achievement?.icon} size={14} />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${
                        achievement?.unlocked ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement?.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {achievement?.description}
                      </div>
                      {!achievement?.unlocked && achievement?.progress && (
                        <div className="text-xs text-accent font-medium">
                          {achievement?.progress}
                        </div>
                      )}
                    </div>
                    
                    {achievement?.unlocked && (
                      <Icon name="CheckCircle" size={16} className="text-accent" />
                    )}
                  </div>
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                className="mt-3"
                iconName="Award"
              >
                View All Achievements
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingGoals;