import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReadingGoals = ({ goals }) => {
  const monthlyProgress = (goals?.currentMonthBooks / goals?.monthlyTarget) * 100;
  const yearlyProgress = (goals?.currentYearBooks / goals?.yearlyTarget) * 100;

  return (
    <div className="bg-white rounded-xl literary-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-crimson font-semibold text-primary">Reading Goals</h3>
        <Button variant="ghost" iconName="Settings" iconPosition="left">
          Edit Goals
        </Button>
      </div>
      <div className="space-y-6">
        {/* Monthly Goal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-gray-700">This Month</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {goals?.currentMonthBooks} of {goals?.monthlyTarget} books
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-primary rounded-full h-3 transition-all duration-500"
              style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-primary font-medium">
              {Math.round(monthlyProgress)}% Complete
            </span>
          </div>
        </div>

        {/* Yearly Goal */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-gray-700">This Year</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {goals?.currentYearBooks} of {goals?.yearlyTarget} books
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-accent rounded-full h-3 transition-all duration-500"
              style={{ width: `${Math.min(yearlyProgress, 100)}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-accent font-medium">
              {Math.round(yearlyProgress)}% Complete
            </span>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-700 mb-1">
                {monthlyProgress >= 100 ? 
                  "🎉 Monthly goal achieved! You're on fire!" :
                  monthlyProgress >= 75 ?
                  "Almost there! Just a few more books to reach your monthly goal." : "Keep going! Every page brings you closer to your goal."
                }
              </p>
              <p className="text-xs text-muted-foreground">
                You need {Math.max(0, goals?.monthlyTarget - goals?.currentMonthBooks)} more books this month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingGoals;