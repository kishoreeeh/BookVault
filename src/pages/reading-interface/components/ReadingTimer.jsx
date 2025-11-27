import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ReadingTimer = ({ isVisible, onTimeUpdate }) => {
  const [sessionTime, setSessionTime] = useState(0); // in seconds
  const [totalTime, setTotalTime] = useState(4980); // 1h 23m in seconds
  const [isActive, setIsActive] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime(time => {
          const newTime = time + 1;
          setTotalTime(total => total + 1);
          
          // Show notification every hour for rental billing
          if (newTime > 0 && newTime % 3600 === 0) {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
          }
          
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    } else if (!isActive && sessionTime !== 0) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, sessionTime, onTimeUpdate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setSessionTime(0);
    setIsActive(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed top-20 right-4 z-40 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 literary-shadow border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <Icon name="Clock" size={16} className="text-primary" />
          </div>
          
          <div className="text-sm">
            <div className="font-semibold text-gray-900">
              {formatTime(sessionTime)}
            </div>
            <div className="text-xs text-gray-500">
              session
            </div>
          </div>
          
          <div className="w-px h-8 bg-gray-300" />
          
          <div className="text-sm">
            <div className="font-semibold text-primary">
              {formatTime(totalTime)}
            </div>
            <div className="text-xs text-gray-500">
              total today
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleTimer}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title={isActive ? 'Pause timer' : 'Resume timer'}
            >
              <Icon name={isActive ? "Pause" : "Play"} size={14} />
            </button>
            
            <button
              onClick={resetSession}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Reset session"
            >
              <Icon name="RotateCcw" size={14} />
            </button>
          </div>
        </div>
        
        {/* Reading Speed Indicator */}
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Reading speed</span>
            <span className="font-medium">245 wpm</span>
          </div>
        </div>
      </div>

      {/* Hourly Notification */}
      {showNotification && (
        <div className="fixed top-32 right-4 z-50 bg-accent text-white rounded-lg px-4 py-3 shadow-lg animate-slide-in-right">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} className="mt-0.5" />
            <div>
              <div className="font-semibold">Rental Hour Complete</div>
              <div className="text-sm opacity-90">
                You've been reading for {Math.floor(sessionTime / 3600)} hour(s). 
                Rental charges apply.
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReadingTimer;