import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReadingHeader = ({ 
  bookTitle, 
  author, 
  onToggleSettings, 
  onToggleContents, 
  onToggleSearch,
  isSettingsOpen,
  isContentsOpen,
  isSearchOpen,
  onToggleFocusMode,
  isFocusMode 
}) => {
  if (isFocusMode) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 literary-shadow">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6">
          {/* Left Section - Back & Book Info */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/reader-dashboard"
              className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Icon name="ArrowLeft" size={20} />
            </Link>
            
            <div className="hidden sm:block">
              <h1 className="text-lg font-crimson font-semibold text-primary truncate max-w-xs">
                {bookTitle}
              </h1>
              <p className="text-sm text-muted-foreground -mt-1 truncate max-w-xs">
                by {author}
              </p>
            </div>
          </div>

          {/* Center Section - Reading Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isContentsOpen ? "default" : "ghost"}
              size="sm"
              iconName="List"
              onClick={onToggleContents}
              className="hidden md:flex"
            >
              Contents
            </Button>
            
            <Button
              variant={isSearchOpen ? "default" : "ghost"}
              size="sm"
              iconName="Search"
              onClick={onToggleSearch}
            >
              Search
            </Button>
            
            <Button
              variant={isSettingsOpen ? "default" : "ghost"}
              size="sm"
              iconName="Settings"
              onClick={onToggleSettings}
            >
              Settings
            </Button>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Maximize2"
              onClick={onToggleFocusMode}
              className="hidden sm:flex"
            >
              Focus
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Bookmark"
              className="text-accent"
            >
              Bookmark
            </Button>
            
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
              />
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                    <Icon name="Share" size={16} />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                    <Icon name="Download" size={16} />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                    <Icon name="MessageSquare" size={16} />
                    <span>Notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ReadingHeader;