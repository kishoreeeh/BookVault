import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const YourLibrary = ({ ownedBooks, rentalHistory }) => {
  const [activeTab, setActiveTab] = useState('owned');

  const tabs = [
    { id: 'owned', label: 'Owned Books', count: ownedBooks?.length },
    { id: 'rentals', label: 'Rental History', count: rentalHistory?.length }
  ];

  return (
    <div className="bg-white rounded-xl literary-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-crimson font-semibold text-primary">Your Library</h3>
        <Link to="/library-catalog" className="text-sm text-primary hover:text-secondary transition-colors">
          Browse More
        </Link>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab?.label} ({tab?.count})
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'owned' && (
          <>
            {ownedBooks?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {ownedBooks?.slice(0, 6)?.map((book) => (
                  <Link key={book?.id} to="/reading-interface" className="group">
                    <div className="relative">
                      <div className="w-full h-32 rounded-lg overflow-hidden shadow-md">
                        <Image 
                          src={book?.cover} 
                          alt={book?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
                        <Icon name="Play" size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 mt-2 line-clamp-2">{book?.title}</h4>
                    <p className="text-xs text-muted-foreground">{book?.author}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={24} className="text-gray-400" />
                </div>
                <p className="text-muted-foreground mb-4">You don't own any books yet</p>
                <Button variant="default" iconName="ShoppingCart" iconPosition="left">
                  Browse Books
                </Button>
              </div>
            )}
          </>
        )}

        {activeTab === 'rentals' && (
          <>
            {rentalHistory?.length > 0 ? (
              <div className="space-y-3">
                {rentalHistory?.slice(0, 5)?.map((rental) => (
                  <div key={rental?.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={rental?.cover} 
                        alt={rental?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{rental?.title}</h4>
                      <p className="text-sm text-muted-foreground truncate">{rental?.author}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground">
                          Rented: {rental?.rentalDate}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          rental?.status === 'completed' ? 'bg-green-100 text-green-700' :
                          rental?.status === 'expired'? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {rental?.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {rental?.status === 'completed' && (
                        <Button variant="outline" size="sm" iconName="ShoppingCart" iconPosition="left">
                          Buy
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" iconName="RotateCcw" iconPosition="left">
                        Rent Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={24} className="text-gray-400" />
                </div>
                <p className="text-muted-foreground mb-4">No rental history yet</p>
                <Button variant="default" iconName="BookOpen" iconPosition="left">
                  Start Reading
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default YourLibrary;