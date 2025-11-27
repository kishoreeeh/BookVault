import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookCover from './components/BookCover';
import BookInfo from './components/BookInfo';
import PricingOptions from './components/PricingOptions';
import AuthorSection from './components/AuthorSection';
import ReviewsSection from './components/ReviewsSection';
import RecommendationsCarousel from './components/RecommendationsCarousel';

import SocialActions from './components/SocialActions';
import Icon from '../../components/AppIcon';

const BookDetailPages = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('id');
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock book data
  const mockBook = {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    publisher: "Canongate Books",
    publishYear: 2020,
    pages: 288,
    readingTime: "4-6 hours",
    language: "English",
    isbn: "978-0525559474",
    rating: 4.2,
    reviewCount: 12847,
    genres: ["Fiction", "Philosophy", "Contemporary", "Mental Health"],
    formats: ["Digital", "Audio", "Large Print"],
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    description: `Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?\n\nA dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time. Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life.`,
    contentWarnings: ["Depression", "Suicide ideation", "Mental health themes"],
    pricing: {
      rental: {
        hourly: 49,
        minimum: 2
      },
      purchase: 599
    },
    chapters: [
      { title: "The Librarian", pages: 12, readingTime: "15 min" },
      { title: "A Life of Disappointments", pages: 18, readingTime: "22 min" },
      { title: "The Midnight Library", pages: 24, readingTime: "30 min" },
      { title: "The Book of Regrets", pages: 16, readingTime: "20 min" },
      { title: "The Life She Always Wanted", pages: 22, readingTime: "28 min" },
      { title: "Swimming with Whales", pages: 20, readingTime: "25 min" },
      { title: "A Different Way to Be", pages: 26, readingTime: "32 min" },
      { title: "The Only Way to Learn Is to Live", pages: 30, readingTime: "38 min" }
    ],
    themes: [
      {
        title: "Infinite Possibilities",
        description: "Explores the concept that every choice creates a different version of our lives, and how we might have lived differently."
      },
      {
        title: "Regret and Acceptance",
        description: "Examines how regret shapes us and the importance of accepting our choices while finding meaning in our actual life."
      },
      {
        title: "Mental Health",
        description: "Sensitively addresses depression, anxiety, and suicidal ideation while offering hope and perspective on life's value."
      },
      {
        title: "Philosophy of Life",
        description: "Questions what makes a life worth living and how we define success, happiness, and fulfillment."
      }
    ],
    notableQuotes: [
      {
        text: "Between life and death there is a library, and within that library, the shelves go on forever.",
        chapter: 3
      },
      {
        text: "Every life contains many millions of decisions. Some big, some small. But every time one decision is taken over another, the outcomes differ.",
        chapter: 4
      },
      {
        text: "It is not the lives we regret not living that are the real problem. It is the regret itself.",
        chapter: 12
      }
    ],
    discussionPoints: [
      "How do you think the concept of infinite parallel lives affects how we should view our current choices?",
      "What role does regret play in shaping who we are, and is it always negative?",
      "How does the book handle the sensitive topic of mental health and suicide?",
      "What do you think the author is saying about the nature of a 'perfect' life?",
      "How might reading this book change someone's perspective on their own life decisions?"
    ]
  };

  // Dynamic author data based on book
  const getAuthorData = (authorName) => {
    const authors = {
      "Alex Michaelides": {
        name: "Alex Michaelides",
        nationality: "British-Cypriot",
        birthYear: 1977,
        deathYear: null,
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        biography: `Alex Michaelides is a British-Cypriot author, screenwriter, and former actor. He is best known for his debut novel The Silent Patient, which was a New York Times bestseller and adapted into a film.`,
        booksCount: 3,
        followers: 125000,
        awards: ["New York Times Bestseller", "Goodreads Choice Award"]
      },
      "Delia Owens": {
        name: "Delia Owens",
        nationality: "American",
        birthYear: 1949,
        deathYear: null,
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        biography: `Delia Owens is an American author and zoologist. She is best known for her novel Where the Crawdads Sing, which became a worldwide bestseller and was adapted into a film.`,
        booksCount: 5,
        followers: 89000,
        awards: ["Pulitzer Prize Nomination", "New York Times Bestseller"]
      },
      "Taylor Jenkins Reid": {
        name: "Taylor Jenkins Reid",
        nationality: "American",
        birthYear: 1983,
        deathYear: null,
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        biography: `Taylor Jenkins Reid is an American author known for her bestselling novels that explore the lives of women in Hollywood and beyond. Her works have been adapted into films and TV series.`,
        booksCount: 8,
        followers: 234000,
        awards: ["New York Times Bestseller", "Goodreads Choice Award"]
      },
      "James Clear": {
        name: "James Clear",
        nationality: "American",
        birthYear: 1986,
        deathYear: null,
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        biography: `James Clear is an American author and speaker known for his work on habits, decision-making, and continuous improvement. His book Atomic Habits has sold millions of copies worldwide.`,
        booksCount: 2,
        followers: 456000,
        awards: ["New York Times Bestseller", "Wall Street Journal Bestseller"]
      },
      "Matt Haig": {
        name: "Matt Haig",
        nationality: "British",
        birthYear: 1975,
        deathYear: null,
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        biography: `Matt Haig is a British author and journalist. He has written both fiction and non-fiction books for children and adults, often dealing with the subject of depression and anxiety. His work has been translated into more than thirty languages. He is a patron of the mental health charity CALM and has spoken openly about his own experiences with depression and anxiety.`,
        booksCount: 18,
        followers: 45200,
        awards: ["Goodreads Choice Award", "British Book Awards", "Nielsen Gold Book Award"]
      }
    };
    return authors[authorName] || authors["Matt Haig"]; // Fallback
  };

  const mockAuthor = getAuthorData(book?.author);

  const mockReviews = [
    {
      id: 1,
      reviewer: { name: "Sarah Johnson" },
      rating: 5,
      date: "2024-01-15",
      verified: true,
      similarTaste: true,
      readingMethod: "Purchased",
      content: `This book completely changed my perspective on life and the choices we make. Haig's writing is both philosophical and accessible, making complex ideas about parallel lives and regret feel tangible and relatable. The concept of the Midnight Library is brilliant - a place between life and death where you can explore all the lives you didn't live. I found myself questioning my own regrets and ultimately feeling more grateful for the life I have chosen.`,
      helpfulCount: 127
    },
    {
      id: 2,
      reviewer: { name: "Michael Chen" },
      rating: 4,
      date: "2024-01-10",
      verified: true,
      similarTaste: false,
      readingMethod: "Rented",
      content: `A thought-provoking read that tackles heavy themes with sensitivity and hope. While the premise is fantastical, the emotional core feels very real. Haig does an excellent job of exploring depression and suicidal ideation without being preachy or overly sentimental. The pacing is good, though some of the alternate lives felt more compelling than others. Overall, a book that stays with you long after reading.`,
      helpfulCount: 89
    },
    {
      id: 3,
      reviewer: { name: "Emma Rodriguez" },
      rating: 3,
      date: "2024-01-08",
      verified: false,
      similarTaste: true,
      readingMethod: "Rented",
      content: `I wanted to love this book more than I did. The concept is fascinating and the writing is beautiful, but I felt like it didn't quite deliver on its promise. Some of the alternate lives felt rushed, and I wished we could have spent more time exploring fewer scenarios in greater depth. That said, it's definitely worth reading for the unique premise and the important conversations it starts about mental health.`,
      helpfulCount: 34
    }
  ];

  const mockRecommendations = [
    {
      id: "2",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      rating: 4.1,
      reviewCount: 8934,
      recommendationReason: "Similar themes",
      pricing: { rental: { hourly: 49 }, purchase: 599 }
    },
    {
      id: "3",
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 15672,
      recommendationReason: "Same genre",
      pricing: { rental: { hourly: 49 }, purchase: 499 }
    },
    {
      id: "4",
      title: "Anxious People",
      author: "Fredrik Backman",
      coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      rating: 4.3,
      reviewCount: 11234,
      recommendationReason: "Mental health focus",
      pricing: { rental: { hourly: 49 }, purchase: 549 }
    },
    {
      id: "5",
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      rating: 4.4,
      reviewCount: 9876,
      recommendationReason: "Philosophical fiction",
      pricing: { rental: { hourly: 59 }, purchase: 649 }
    },
    {
      id: "6",
      title: "Project Hail Mary",
      author: "Andy Weir",
      coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&h=400&fit=crop",
      rating: 4.7,
      reviewCount: 13456,
      recommendationReason: "Popular choice",
      pricing: { rental: { hourly: 69 }, purchase: 699 }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchBook = async () => {
      setLoading(true);
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find the book from the library catalog based on the ID
      const mockBooks = [
        {
          id: "1",
          title: "The Silent Patient",
          author: "Alex Michaelides",
          genre: "mystery",
          coverImage: "https://images-na.ssl-images-amazon.com/images/I/81JJPDNlxSL.jpg",
          rating: 4.5,
          reviewCount: 2847,
          readingTime: 420,
          rentPrice: 35,
          buyPrice: 650,
          isAvailable: true,
          isNewRelease: false,
          isWishlisted: false,
          isAwardWinner: false,
          isStaffPick: true,
          isAudiobook: true,
          isBestseller: true,
          isSeries: false,
          description: "A gripping psychological thriller about a woman who refuses to speak after allegedly murdering her husband.",
          publisher: "Celadon Books",
          publishYear: 2019,
          pages: 336,
          language: "English",
          isbn: "978-1250301697",
          genres: ["Mystery", "Thriller", "Psychological Fiction"],
          formats: ["Digital", "Audio", "Hardcover"],
          contentWarnings: ["Violence", "Mental Health", "Murder"],
          pricing: {
            rental: {
              hourly: 2.99,
              minimum: 2
            },
            purchase: 14.99
          }
        },
        {
          id: "2",
          title: "Where the Crawdads Sing",
          author: "Delia Owens",
          genre: "mystery",
          coverImage: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
          rating: 4.8,
          reviewCount: 5234,
          readingTime: 480,
          rentPrice: 40,
          buyPrice: 700,
          isAvailable: true,
          isNewRelease: false,
          isWishlisted: true,
          isAwardWinner: true,
          isStaffPick: false,
          isAudiobook: true,
          isBestseller: true,
          isSeries: false,
          description: "A coming-of-age mystery set in the marshlands of North Carolina, blending nature writing with a compelling murder mystery.",
          publisher: "G.P. Putnam's Sons Books for Young Readers",
          publishYear: 2018,
          pages: 384,
          language: "English",
          isbn: "978-0735219090",
          genres: ["Mystery", "Coming-of-Age", "Nature"],
          formats: ["Digital", "Audio", "Paperback"],
          contentWarnings: ["Violence", "Abuse", "Isolation"],
          pricing: {
            rental: {
              hourly: 3.49,
              minimum: 2
            },
            purchase: 16.99
          }
        },
        {
          id: "3",
          title: "The Seven Husbands of Evelyn Hugo",
          author: "Taylor Jenkins Reid",
          genre: "romance",
          coverImage: "/assets/covers/evelyn.webp",
          rating: 4.7,
          reviewCount: 3456,
          readingTime: 360,
          rentPrice: 45,
          buyPrice: 800,
          isAvailable: true,
          isNewRelease: false,
          isWishlisted: false,
          isAwardWinner: false,
          isStaffPick: true,
          isAudiobook: true,
          isBestseller: true,
          isSeries: false,
          description: "A reclusive Hollywood icon finally decides to give her life story to an unknown journalist.",
          publisher: "Washington Square Press",
          publishYear: 2017,
          pages: 400,
          language: "English",
          isbn: "978-1501161933",
          genres: ["Romance", "Historical Fiction", "LGBTQ+"],
          formats: ["Digital", "Audio", "Hardcover"],
          contentWarnings: ["Homophobia", "Abuse", "Mental Health"],
          pricing: {
            rental: {
              hourly: 2.99,
              minimum: 2
            },
            purchase: 13.99
          }
        },
        {
          id: "4",
          title: "Atomic Habits",
          author: "James Clear",
          genre: "self-help",
          coverImage: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
          rating: 4.6,
          reviewCount: 8901,
          readingTime: 300,
          rentPrice: 50,
          buyPrice: 900,
          isAvailable: true,
          isNewRelease: false,
          isWishlisted: false,
          isAwardWinner: false,
          isStaffPick: true,
          isAudiobook: true,
          isBestseller: true,
          isSeries: false,
          description: "A practical guide to building good habits and breaking bad ones through small, incremental changes.",
          publisher: "Avery",
          publishYear: 2018,
          pages: 320,
          language: "English",
          isbn: "978-0735211292",
          genres: ["Self-Help", "Psychology", "Productivity"],
          formats: ["Digital", "Audio", "Hardcover"],
          contentWarnings: [],
          pricing: {
            rental: {
              hourly: 3.99,
              minimum: 2
            },
            purchase: 17.99
          }
        },
        {
          id: "5",
          title: "The Midnight Library",
          author: "Matt Haig",
          genre: "fantasy",
          coverImage: "https://images-na.ssl-images-amazon.com/images/I/81J6APjwxlL.jpg",
          rating: 4.4,
          reviewCount: 2134,
          readingTime: 240,
          rentPrice: 55,
          buyPrice: 1000,
          isAvailable: true,
          isNewRelease: true,
          isWishlisted: false,
          isAwardWinner: false,
          isStaffPick: false,
          isAudiobook: true,
          isBestseller: false,
          isSeries: false,
          description: "A philosophical novel about a library that exists between life and death, where each book represents a different life path.",
          publisher: "Canongate Books",
          publishYear: 2020,
          pages: 288,
          language: "English",
          isbn: "978-0525559474",
          genres: ["Fiction", "Philosophy", "Contemporary", "Mental Health"],
          formats: ["Digital", "Audio", "Large Print"],
          contentWarnings: ["Depression", "Suicide ideation", "Mental health themes"],
          pricing: {
            rental: {
              hourly: 2.99,
              minimum: 2
            },
            purchase: 14.99
          }
        }
      ];

      const foundBook = mockBooks.find(book => book.id === bookId);
      setBook(foundBook || mockBook); // Fallback to mockBook if not found
      setLoading(false);
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading book details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="BookX" size={48} className="text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Book Not Found</h2>
            <p className="text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <span>Home</span>
            <Icon name="ChevronRight" size={14} />
            <span>Catalog</span>
            <Icon name="ChevronRight" size={14} />
            <span>{book?.genres?.[0]}</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-primary font-medium">{book?.title}</span>
          </nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Book Cover */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <BookCover book={book} />
              </div>
            </div>

            {/* Middle Column - Book Info */}
            <div className="lg:col-span-6 space-y-8">
              <BookInfo book={book} />
              <AuthorSection author={mockAuthor} />
              <ReviewsSection
                reviews={mockReviews}
                averageRating={book?.rating}
                totalReviews={book?.reviewCount}
              />
            </div>

            {/* Right Column - Pricing & Actions */}
            <div className="lg:col-span-3 space-y-6">
              <PricingOptions book={book} />
              <SocialActions book={book} />
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-12">
            <RecommendationsCarousel recommendations={mockRecommendations} />
          </div>
        </div>
      </main>
      {/* Mobile Sticky Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
            <Icon name="ShoppingCart" size={18} />
            Rent ₹{book?.pricing?.rental?.hourly}/hr
          </button>
          <button className="flex-1 bg-secondary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
            <Icon name="CreditCard" size={18} />
            Buy ₹{book?.pricing?.purchase}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPages;
