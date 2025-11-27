import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReadingContent = ({ 
  settings, 
  isFocusMode, 
  onToggleFocusMode,
  currentPage,
  onPageChange 
}) => {
  const [selectedText, setSelectedText] = useState('');
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [highlights, setHighlights] = useState([]);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [noteText, setNoteText] = useState('');

  const bookContent = `Chapter 4: Deeper Into Darkness

The moonlight barely illuminated the path ahead as Sarah ventured deeper into the ancient forest. Each step seemed to echo with the whispers of centuries past, and the shadows danced between the towering oak trees like specters from another realm.

She clutched the leather-bound journal tightly against her chest, its pages containing the cryptic clues that had led her to this mysterious place. The words of her grandmother echoed in her mind: "Some secrets are buried for a reason, child. But sometimes, the truth must be unearthed, no matter the cost."

The mysterious figure appeared at the edge of the forest, cloaked in shadows and uncertainty. Sarah felt her heart racing as she tried to make out the silhouette against the pale moonlight. Was this the guardian her grandmother had spoken of? Or something far more sinister?

As she approached, the figure seemed to dissolve into the mist, leaving only the faint scent of jasmine and old parchment in the air. Sarah realized she was no longer alone in her quest for answers. The forest itself seemed alive, watching her every move with ancient eyes.

The path ahead split into three directions, each leading deeper into the heart of the woodland. According to the journal, she needed to choose wisely – only one path would lead to the hidden chamber where the truth lay waiting. The other two would lead to endless wandering, or worse.

Sarah took a deep breath and studied the cryptic symbols carved into the bark of the nearest tree. The moonlight revealed intricate patterns that seemed to shift and change as she watched. This was no ordinary forest, and she was no ordinary visitor.

With determination burning in her heart, she chose the middle path and stepped forward into the unknown, ready to face whatever secrets the darkness might reveal.`;

  const getThemeClasses = () => {
    switch (settings?.theme) {
      case 'sepia':
        return 'bg-amber-50 text-amber-900';
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'contrast':
        return 'bg-black text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const getFontClasses = () => {
    const fontMap = {
      inter: 'font-sans',
      crimson: 'font-serif',
      opendyslexic: 'font-mono',
      georgia: 'font-serif'
    };
    return fontMap?.[settings?.fontFamily] || 'font-sans';
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString()?.trim();
    
    if (text) {
      setSelectedText(text);
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      setMenuPosition({
        x: rect?.left + rect?.width / 2,
        y: rect?.top - 10
      });
      setShowHighlightMenu(true);
    } else {
      setShowHighlightMenu(false);
    }
  };

  const addHighlight = (color) => {
    if (selectedText) {
      const newHighlight = {
        id: Date.now(),
        text: selectedText,
        color,
        note: '',
        page: currentPage
      };
      setHighlights([...highlights, newHighlight]);
      setShowHighlightMenu(false);
      window.getSelection()?.removeAllRanges();
    }
  };

  const addNote = () => {
    setShowNoteDialog(true);
    setShowHighlightMenu(false);
  };

  const saveNote = () => {
    if (selectedText && noteText) {
      const newHighlight = {
        id: Date.now(),
        text: selectedText,
        color: 'yellow',
        note: noteText,
        page: currentPage
      };
      setHighlights([...highlights, newHighlight]);
      setNoteText('');
      setShowNoteDialog(false);
      window.getSelection()?.removeAllRanges();
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowHighlightMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-300 ${getThemeClasses()}`}>
      {/* Focus Mode Toggle (Double-tap area) */}
      {isFocusMode && (
        <div 
          className="fixed top-4 right-4 z-50"
          onDoubleClick={onToggleFocusMode}
        >
          <Button
            variant="ghost"
            size="sm"
            iconName="Minimize2"
            onClick={onToggleFocusMode}
            className="bg-black/20 backdrop-blur-sm text-white hover:bg-black/30"
          >
            Exit Focus
          </Button>
        </div>
      )}
      {/* Reading Timer */}
      {settings?.showTimer && !isFocusMode && (
        <div className="fixed top-20 right-4 z-40 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 literary-shadow">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="font-medium">1h 23m</span>
            <span className="text-gray-500">reading</span>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className={`max-w-4xl mx-auto px-6 py-8 ${isFocusMode ? 'pt-16' : 'pt-24'}`}>
        <div 
          className={`prose prose-lg max-w-none ${getFontClasses()} ${settings?.fontSize === 'xs' ? 'text-xs' : settings?.fontSize === 'sm' ? 'text-sm' : settings?.fontSize === 'base' ? 'text-base' : settings?.fontSize === 'lg' ? 'text-lg' : settings?.fontSize === 'xl' ? 'text-xl' : 'text-2xl'} ${settings?.lineHeight === 'tight' ? 'leading-tight' : settings?.lineHeight === 'normal' ? 'leading-normal' : settings?.lineHeight === 'relaxed' ? 'leading-relaxed' : 'leading-loose'}`}
          onMouseUp={handleTextSelection}
          style={{ 
            color: settings?.theme === 'dark' || settings?.theme === 'contrast' ? 'white' : 'inherit',
            lineHeight: settings?.lineHeight === 'tight' ? '1.25' : settings?.lineHeight === 'normal' ? '1.5' : settings?.lineHeight === 'relaxed' ? '1.75' : '2'
          }}
        >
          {bookContent?.split('\n\n')?.map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Page Navigation */}
        {!isFocusMode && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              iconName="ChevronLeft"
              iconPosition="left"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Page {currentPage} of 203
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentPage / 203) * 100}%` }} 
                />
              </div>
            </div>

            <Button
              variant="outline"
              iconName="ChevronRight"
              iconPosition="right"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= 203}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      {/* Highlight Menu */}
      {showHighlightMenu && (
        <div 
          className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
          style={{
            left: menuPosition?.x - 100,
            top: menuPosition?.y - 60
          }}
        >
          <div className="flex items-center space-x-1">
            <button
              onClick={() => addHighlight('yellow')}
              className="w-8 h-8 bg-yellow-300 rounded hover:bg-yellow-400 transition-colors"
              title="Yellow highlight"
            />
            <button
              onClick={() => addHighlight('green')}
              className="w-8 h-8 bg-green-300 rounded hover:bg-green-400 transition-colors"
              title="Green highlight"
            />
            <button
              onClick={() => addHighlight('blue')}
              className="w-8 h-8 bg-blue-300 rounded hover:bg-blue-400 transition-colors"
              title="Blue highlight"
            />
            <button
              onClick={() => addHighlight('pink')}
              className="w-8 h-8 bg-pink-300 rounded hover:bg-pink-400 transition-colors"
              title="Pink highlight"
            />
            <div className="w-px h-6 bg-gray-300 mx-1" />
            <button
              onClick={addNote}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Add note"
            >
              <Icon name="MessageSquare" size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Note Dialog */}
      {showNoteDialog && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Add Note</h3>
              <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                "{selectedText}"
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e?.target?.value)}
                placeholder="Add your note here..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex justify-end space-x-3 mt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowNoteDialog(false);
                    setNoteText('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={saveNote}
                  disabled={!noteText?.trim()}
                >
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Reading Progress Indicator */}
      {!isFocusMode && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200 z-30">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentPage / 203) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default ReadingContent;