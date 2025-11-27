import React from 'react';
import ReadingHeader from './components/ReadingHeader';
import ReadingContent from './components/ReadingContent';
import TableOfContents from './components/TableOfContents';
import SearchPanel from './components/SearchPanel';
import ReadingTimer from './components/ReadingTimer';
import ReadingSettings from './components/ReadingSettings';
import ReadingGoals from './components/ReadingGoals';

const ReadingInterface = () => {
  return (
    <div className="min-h-screen bg-background">
      <ReadingHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-card border-r border-border p-4 hidden md:block">
          <SearchPanel />
          <TableOfContents />
          <ReadingSettings />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-border">
            <ReadingTimer />
            <ReadingGoals />
          </div>
          <div className="flex-1 overflow-auto p-4">
            <ReadingContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingInterface;
