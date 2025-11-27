import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsideBookSection = ({ book }) => {
  const [activeTab, setActiveTab] = useState('chapters');

  const tabs = [
    { id: 'chapters', label: 'Chapters', icon: 'List' },
    { id: 'themes', label: 'Key Themes', icon: 'Tag' },
    { id: 'quotes', label: 'Notable Quotes', icon: 'Quote' },
    { id: 'discussion', label: 'Discussion Points', icon: 'MessageSquare' }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 literary-shadow">
      <h3 className="text-lg font-semibold text-primary mb-4">Inside This Book</h3>
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-gray-600 hover:text-primary hover:bg-gray-50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[300px]">
        {activeTab === 'chapters' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              Explore the structure and flow of this {book?.pages}-page journey
            </p>
            <div className="space-y-2">
              {book?.chapters?.map((chapter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">{chapter?.title}</h4>
                      <p className="text-sm text-gray-600">{chapter?.pages} pages • {chapter?.readingTime}</p>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Central themes and concepts explored throughout the book
            </p>
            <div className="grid gap-4">
              {book?.themes?.map((theme, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Icon name="Lightbulb" size={16} className="text-accent" />
                    {theme?.title}
                  </h4>
                  <p className="text-sm text-gray-700">{theme?.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Memorable passages that capture the essence of this work
            </p>
            <div className="space-y-4">
              {book?.notableQuotes?.map((quote, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary">
                  <blockquote className="text-gray-800 italic mb-2">
                    "{quote?.text}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <cite className="text-sm text-gray-600">— Chapter {quote?.chapter}</cite>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <Icon name="Share" size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Thought-provoking questions for book clubs and personal reflection
            </p>
            <div className="space-y-3">
              {book?.discussionPoints?.map((point, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-gray-800">{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Action Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Button variant="outline" fullWidth iconName="Users" iconPosition="left">
          Join Book Club Discussion
        </Button>
      </div>
    </div>
  );
};

export default InsideBookSection;