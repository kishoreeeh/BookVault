import React from 'react';

import Button from '../../../components/ui/Button';

const ReadingSettings = ({ 
  isOpen, 
  onClose, 
  settings, 
  onSettingsChange 
}) => {
  if (!isOpen) return null;

  const themes = [
    { id: 'light', name: 'Light', bg: 'bg-white', text: 'text-gray-900' },
    { id: 'sepia', name: 'Sepia', bg: 'bg-amber-50', text: 'text-amber-900' },
    { id: 'dark', name: 'Dark', bg: 'bg-gray-900', text: 'text-white' },
    { id: 'contrast', name: 'High Contrast', bg: 'bg-black', text: 'text-white' }
  ];

  const fonts = [
    { id: 'inter', name: 'Inter', family: 'font-sans' },
    { id: 'crimson', name: 'Crimson Text', family: 'font-serif' },
    { id: 'opendyslexic', name: 'OpenDyslexic', family: 'font-mono' },
    { id: 'georgia', name: 'Georgia', family: 'font-serif' }
  ];

  const fontSizes = [
    { id: 'xs', name: 'Extra Small', size: 'text-xs' },
    { id: 'sm', name: 'Small', size: 'text-sm' },
    { id: 'base', name: 'Normal', size: 'text-base' },
    { id: 'lg', name: 'Large', size: 'text-lg' },
    { id: 'xl', name: 'Extra Large', size: 'text-xl' },
    { id: '2xl', name: 'XXL', size: 'text-2xl' }
  ];

  const lineHeights = [
    { id: 'tight', name: 'Tight', height: 'leading-tight' },
    { id: 'normal', name: 'Normal', height: 'leading-normal' },
    { id: 'relaxed', name: 'Relaxed', height: 'leading-relaxed' },
    { id: 'loose', name: 'Loose', height: 'leading-loose' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-crimson font-semibold text-primary">Reading Settings</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {themes?.map((theme) => (
                <button
                  key={theme?.id}
                  onClick={() => onSettingsChange('theme', theme?.id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings?.theme === theme?.id
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-full h-8 rounded ${theme?.bg} ${theme?.text} flex items-center justify-center text-xs mb-2`}>
                    Aa
                  </div>
                  <span className="text-sm font-medium">{theme?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Font Family</h3>
            <div className="space-y-2">
              {fonts?.map((font) => (
                <button
                  key={font?.id}
                  onClick={() => onSettingsChange('fontFamily', font?.id)}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    settings?.fontFamily === font?.id
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`${font?.family} text-base`}>{font?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Font Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes?.map((size) => (
                <button
                  key={size?.id}
                  onClick={() => onSettingsChange('fontSize', size?.id)}
                  className={`p-3 text-center rounded-lg border transition-all ${
                    settings?.fontSize === size?.id
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`${size?.size} font-medium mb-1`}>Aa</div>
                  <span className="text-xs text-gray-600">{size?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Line Height */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Line Spacing</h3>
            <div className="grid grid-cols-2 gap-3">
              {lineHeights?.map((height) => (
                <button
                  key={height?.id}
                  onClick={() => onSettingsChange('lineHeight', height?.id)}
                  className={`p-3 text-center rounded-lg border transition-all ${
                    settings?.lineHeight === height?.id
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`text-sm ${height?.height} mb-1`}>
                    Line one<br />Line two
                  </div>
                  <span className="text-xs text-gray-600">{height?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Page Animation */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Page Animation</h3>
            <div className="space-y-2">
              {[
                { id: 'flip', name: 'Page Flip', desc: 'Realistic page turning' },
                { id: 'slide', name: 'Slide', desc: 'Simple left-right transition' },
                { id: 'fade', name: 'Fade', desc: 'Smooth fade transition' },
                { id: 'none', name: 'None', desc: 'Instant page change' }
              ]?.map((animation) => (
                <button
                  key={animation?.id}
                  onClick={() => onSettingsChange('pageAnimation', animation?.id)}
                  className={`w-full p-3 text-left rounded-lg border transition-all ${
                    settings?.pageAnimation === animation?.id
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{animation?.name}</div>
                  <div className="text-sm text-gray-600">{animation?.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Reading Timer</div>
                <div className="text-sm text-gray-600">Show session duration</div>
              </div>
              <button
                onClick={() => onSettingsChange('showTimer', !settings?.showTimer)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings?.showTimer ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings?.showTimer ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-scroll</div>
                <div className="text-sm text-gray-600">Automatic page scrolling</div>
              </div>
              <button
                onClick={() => onSettingsChange('autoScroll', !settings?.autoScroll)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings?.autoScroll ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings?.autoScroll ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Social Highlights</div>
                <div className="text-sm text-gray-600">Share highlights with others</div>
              </div>
              <button
                onClick={() => onSettingsChange('socialHighlights', !settings?.socialHighlights)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings?.socialHighlights ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings?.socialHighlights ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
          >
            Apply Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReadingSettings;