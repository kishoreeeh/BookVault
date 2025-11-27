import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CurrentlyReadingCard from './components/CurrentlyReadingCard';
import ReadingStats from './components/ReadingStats';
import ReadingGoals from './components/ReadingGoals';
import ExpiringRentals from './components/ExpiringRentals';
import RecommendedBooks from './components/RecommendedBooks';
import AchievementBadges from './components/AchievementBadges';
import YourLibrary from './components/YourLibrary';
import SocialActivity from './components/SocialActivity';
import Icon from '../../components/AppIcon';

const ReaderDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for currently reading books
const currentlyReading = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      cover: "/assets/covers/evelyn.webp", // Updated to local image
      currentPage: 187,
      totalPages: 400,
      isRental: true,
      timeRemaining: 18
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
      currentPage: 89,
      totalPages: 320,
      isRental: false,
      timeRemaining: null
    }
  ];

  // Mock reading statistics
  const readingStats = {
    booksRead: 47,
    hoursReading: 156,
    moneySaved: 342,
    readingStreak: 12
  };

  // Mock reading goals
  const readingGoals = {
    monthlyTarget: 4,
    currentMonthBooks: 3,
    yearlyTarget: 50,
    currentYearBooks: 47
  };

  // Mock expiring rentals
  // ...existing code...
  const expiringRentals = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      cover: "/assets/covers/midnight-library.webp",  // Update this if you have the local image
      hoursRemaining: 6
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      cover: "C:\Users\ADMIN\Downloads\educated.webp",  // Using local image
      hoursRemaining: 12
    }
  ];
// ...existing code...

  // Mock recommended books
   const recommendations = [
    {
      id: 1,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      cover: "/assets/covers/achilles.webp",  // Update if you have the local image
      rating: 4.5,
      reviews: 1247,
      rentalPrice: 45,  // Updated to INR
      buyPrice: 499,    // Updated to INR
      reason: "Because you loved The Seven Husbands of Evelyn Hugo"
    },
    {
      id: 2,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      rating: 4.3,
      reviews: 892,
      rentalPrice: 2.49,
      buyPrice: 14.99,
      reason: "Popular among readers with similar taste"
    },
    {
      id: 3,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      rating: 4.2,
      reviews: 654,
      rentalPrice: 3.49,
      buyPrice: 16.99,
      reason: "Trending in your favorite genres"
    }
  ];

  // Mock achievements
  const achievements = [
    {
      id: 1,
      title: "7-Day Streak",
      description: "Read for 7 consecutive days",
      type: "streak",
      earnedDate: "Dec 15, 2024"
    },
    {
      id: 2,
      title: "Genre Explorer",
      description: "Read books from 5 different genres",
      type: "genre",
      earnedDate: "Dec 10, 2024"
    },
    {
      id: 3,
      title: "Speed Reader",
      description: "Finished a book in under 24 hours",
      type: "speed",
      earnedDate: "Dec 8, 2024"
    },
    {
      id: 4,
      title: "Book Collector",
      description: "Own 25+ books in your library",
      type: "milestone",
      earnedDate: "Dec 5, 2024"
    }
  ];

  // Mock owned books
  const ownedBooks = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
    }
  ];

  // Mock rental history
  const rentalHistory = [
    {
      id: 1,
      title: "The Alchemist",
      author: "Paulo Coelho",
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      rentalDate: "Dec 10, 2024",
      status: "completed"
    },
    {
      id: 2,
      title: "The Kite Runner",
      author: "Khaled Hosseini",
      cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      rentalDate: "Dec 5, 2024",
      status: "expired"
    }
  ];

  // Mock reading lists
  const readingLists = [
    {
      id: 1,
      name: "Summer Reading 2024",
      bookCount: 12,
      isPublic: true
    },
    {
      id: 2,
      name: "Personal Development",
      bookCount: 8,
      isPublic: false
    },
    {
      id: 3,
      name: "Mystery & Thriller",
      bookCount: 15,
      isPublic: true
    }
  ];

  // Mock social activities
  const socialActivities = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      action: "just finished reading ",
      bookTitle: "The Silent Patient",
      bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      userName: "Mike Chen",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      action: "added to wishlist ",
      bookTitle: "Dune",
      bookCover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=600&fit=crop",
      timeAgo: "5 hours ago"
    },
    {
      id: 3,
      userName: "Emma Wilson",
      userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      action: "started reading ",
      bookTitle: "The Handmaid\'s Tale",
      bookCover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      timeAgo: "1 day ago"
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-crimson font-semibold text-primary mb-2">
                  {getGreeting()}, Reader! 📚
                </h1>
                <p className="text-muted-foreground">
                  Ready to continue your literary journey? You have {currentlyReading?.length} books in progress.
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>{formatTime(currentTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>{currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="mb-8">
            <ReadingStats stats={readingStats} />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-8">
              {/* Currently Reading */}
              <section>
                <h2 className="text-xl font-crimson font-semibold text-primary mb-6">Currently Reading</h2>
                <div className="space-y-4">
                  {currentlyReading?.map((book) => (
                    <CurrentlyReadingCard key={book?.id} book={book} />
                  ))}
                </div>
              </section>

              {/* Expiring Rentals */}
              <ExpiringRentals rentals={expiringRentals} />

              {/* Your Library */}
              <YourLibrary ownedBooks={ownedBooks} rentalHistory={rentalHistory} />

              {/* Recommended Books */}
              <RecommendedBooks recommendations={recommendations} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Reading Goals */}
              <ReadingGoals goals={readingGoals} />

              {/* Achievement Badges */}
              <AchievementBadges achievements={achievements} />

              {/* Social Activity */}
              <SocialActivity activities={socialActivities} readingLists={readingLists} />

              {/* Quick Actions */}
              <div className="bg-white rounded-xl literary-shadow p-6">
                <h3 className="text-lg font-crimson font-semibold text-primary mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="Search" size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Browse Catalog</h4>
                      <p className="text-xs text-muted-foreground">Discover new books</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                      <Icon name="Settings" size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Reading Preferences</h4>
                      <p className="text-xs text-muted-foreground">Customize your experience</p>
                    </div>
                  </button>
                  
                  <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                      <Icon name="Users" size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Find Friends</h4>
                      <p className="text-xs text-muted-foreground">Connect with readers</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReaderDashboard;