import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TableOfContents = ({ isOpen, onClose, currentChapter, onChapterSelect }) => {
  if (!isOpen) return null;

  const chapters = [
    { id: 1, title: "The Beginning", page: 1, duration: "12 min", completed: true },
    { id: 2, title: "First Encounters", page: 15, duration: "18 min", completed: true },
    { id: 3, title: "The Mystery Unfolds", page: 32, duration: "22 min", completed: true },
    { id: 4, title: "Deeper Into Darkness", page: 58, duration: "25 min", completed: false, current: true },
    { id: 5, title: "Revelations", page: 89, duration: "20 min", completed: false },
    { id: 6, title: "The Truth Emerges", page: 112, duration: "28 min", completed: false },
    { id: 7, title: "Confrontation", page: 145, duration: "15 min", completed: false },
    { id: 8, title: "Resolution", page: 165, duration: "16 min", completed: false },
    { id: 9, title: "New Beginnings", page: 185, duration: "14 min", completed: false },
    { id: 10, title: "Epilogue", page: 203, duration: "8 min", completed: false }
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-80 bg-white border-r border-gray-200 z-40 literary-shadow">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-crimson font-semibold text-primary">Table of Contents</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClose}
        />
      </div>
      <div className="h-full overflow-y-auto pb-20">
        <div className="p-4">
          {/* Progress Overview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Reading Progress</span>
              <span className="text-sm text-primary font-semibold">40%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>4 of 10 chapters</span>
              <span>~2.5 hours remaining</span>
            </div>
          </div>

          {/* Chapter List */}
          <div className="space-y-2">
            {chapters?.map((chapter) => (
              <button
                key={chapter?.id}
                onClick={() => onChapterSelect(chapter?.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-sm ${
                  chapter?.current
                    ? 'border-primary bg-primary/5'
                    : chapter?.completed
                    ? 'border-green-200 bg-green-50' :'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium text-gray-500">
                        Chapter {chapter?.id}
                      </span>
                      {chapter?.completed && (
                        <Icon name="CheckCircle" size={14} className="text-green-500" />
                      )}
                      {chapter?.current && (
                        <Icon name="Play" size={14} className="text-primary" />
                      )}
                    </div>
                    <h3 className={`font-medium mb-1 ${
                      chapter?.current ? 'text-primary' : 'text-gray-900'
                    }`}>
                      {chapter?.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Page {chapter?.page}</span>
                      <span>{chapter?.duration}</span>
                    </div>
                  </div>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className="text-gray-400 mt-1" 
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Reading Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Reading Session</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Time Today</div>
                <div className="font-semibold text-primary">1h 23m</div>
              </div>
              <div>
                <div className="text-gray-500">Pages Read</div>
                <div className="font-semibold text-primary">26</div>
              </div>
              <div>
                <div className="text-gray-500">Reading Speed</div>
                <div className="font-semibold text-primary">245 wpm</div>
              </div>
              <div>
                <div className="text-gray-500">Streak</div>
                <div className="font-semibold text-primary">7 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;