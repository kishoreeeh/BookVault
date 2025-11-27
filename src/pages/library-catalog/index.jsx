import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import SearchBar from './components/SearchBar';
import SortingControls from './components/SortingControls';
import BookGrid from './components/BookGrid';

const LibraryCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    availability: [],
    genre: [],
    author: [],
    rating: [],
    price: [],
    features: []
  });
  const [sortBy, setSortBy] = useState('discovery');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock book data
  const mockBooks = [
    {
      id: 1,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      genre: "mystery",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81JJPDNlxSL.jpg",
      rating: 4.5,
      reviewCount: 2847,
      readingTime: 420,
      rentPrice: 35,
      buyPrice: 600,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A gripping psychological thriller about a woman who refuses to speak after allegedly murdering her husband."
    },
    {
      id: 2,
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
      description: "A coming-of-age mystery set in the marshlands of North Carolina, blending nature writing with a compelling murder mystery."
    },
    {
      id: 3,
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
      description: "A reclusive Hollywood icon finally decides to give her life story to an unknown journalist."
    },
    {
      id: 4,
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
      description: "A practical guide to building good habits and breaking bad ones through small, incremental changes."
    },
    {
      id: 5,
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
      description: "A philosophical novel about a library that exists between life and death, where each book represents a different life path."
    },
   // ...existing code...
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert", 
      genre: "sci-fi",
      coverImage: "/assets/covers/dune.webp", // Updated to use local image
      rating: 4.9,
      reviewCount: 12456,
      readingTime: 720,
      rentPrice: 60,
      buyPrice: 1100,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: true,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: true,
      description: "Epic science fiction novel set on the desert planet Arrakis, following Paul Atreides and the struggle for control of the spice melange."
    },
// ...existing code...
    {
      id: 7,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "business",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81cpDaCJJCL.jpg",
      rating: 4.5,
      reviewCount: 3789,
      readingTime: 270,
      rentPrice: 65,
      buyPrice: 950,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "Timeless lessons on wealth, greed, and happiness, exploring how psychology affects our financial decisions."
    },
    {
      id: 8,
      title: "The Thursday Murder Club",
      author: "Richard Osman",
      genre: "mystery",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81N7FmJhbhL.jpg",
      rating: 4.3,
      reviewCount: 1876,
      readingTime: 390,
      rentPrice: 70,
      buyPrice: 850,
      isAvailable: false,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: false,
      isAudiobook: true,
      isBestseller: false,
      isSeries: true,
      description: "A cozy mystery featuring four unlikely friends in a retirement village who meet weekly to investigate cold cases."
    },
    {
      id: 9,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "fantasy",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
      rating: 4.3,
      reviewCount: 5678,
      readingTime: 240,
      rentPrice: 45,
      buyPrice: 650,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "A philosophical novel about a shepherd boy who dreams of discovering a treasure and embarks on a journey of self-discovery."
    },
    {
      id: 10,
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      genre: "self-help",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
      rating: 4.2,
      reviewCount: 6789,
      readingTime: 240,
      rentPrice: 80,
      buyPrice: 800,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A counterintuitive approach to living a good life by embracing our limitations and focusing on what truly matters."
    },
    {
      id: 11,
      title: "The Power of Habit",
      author: "Charles Duhigg",
      genre: "business",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81iAAD7R6eL.jpg",
      rating: 4.4,
      reviewCount: 5678,
      readingTime: 360,
      rentPrice: 85,
      buyPrice: 1200,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "An exploration of the science behind habits and how they can be changed to improve our lives."
    },
    {
      id: 12,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      genre: "history",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
      rating: 4.8,
      reviewCount: 7890,
      readingTime: 600,
      rentPrice: 35,
      buyPrice: 550,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "An exploration of the history of our species, from the Stone Age to the modern age, examining how Homo sapiens came to dominate the Earth."
    },
    {
      id: 13,
      title: "The Song of Achilles",
      author: "Madeline Miller",
      genre: "fantasy",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81lJ87K2QJL.jpg",
      rating: 4.5,
      reviewCount: 2345,
      readingTime: 420,
      rentPrice: 40,
      buyPrice: 600,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: false,
      isStaffPick: false,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "A retelling of the Iliad from Patroclus's perspective, focusing on his relationship with Achilles."
    },
    {
      id: 14,
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "fantasy",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
      rating: 4.3,
      reviewCount: 5678,
      readingTime: 240,
      rentPrice: 45,
      buyPrice: 650,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "A philosophical novel about a shepherd boy who dreams of discovering a treasure and embarks on a journey of self-discovery."
    },
    {
      id: 15,
      title: "The Name of the Wind",
      author: "Patrick Rothfuss",
      genre: "fantasy",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/91b2sP5v5-L.jpg",
      rating: 4.7,
      reviewCount: 4567,
      readingTime: 720,
      rentPrice: 50,
      buyPrice: 700,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: true,
      description: "The first book in the Kingkiller Chronicle, following the life of Kvothe, a gifted young man who grows to be the most notorious magician."
    },
    {
      id: 21,
      title: "Circe",
      author: "Madeline Miller",
      genre: "fantasy",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81s0B6NYXML.jpg",
      rating: 4.6,
      reviewCount: 3456,
      readingTime: 480,
      rentPrice: 30,
      buyPrice: 500,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A reimagining of the life of Circe, the witch from Homer's Odyssey, exploring themes of power, love, and transformation."
    },
    {
      id: 22,
      title: "The Four Winds",
      author: "Kristin Hannah",
      genre: "history",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81aY1lxk+9L.jpg",
      rating: 4.6,
      reviewCount: 3456,
      readingTime: 480,
      rentPrice: 90,
      buyPrice: 1300,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: false,
      isStaffPick: false,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A historical novel set during the Great Depression, following a woman's struggle to survive and protect her family."
    },
    {
      id: 23,
      title: "The Guest List",
      author: "Lucy Foley",
      genre: "mystery",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81YkqyaFVEL.jpg",
      rating: 4.1,
      reviewCount: 2345,
      readingTime: 420,
      rentPrice: 95,
      buyPrice: 1400,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: false,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "A mystery thriller set on a remote island during a wedding celebration, where secrets and murder unfold."
    },
    {
      id: 24,
      title: "The Invisible Life of Addie LaRue",
      author: "V.E. Schwab",
      genre: "fantasy",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
      rating: 4.5,
      reviewCount: 4567,
      readingTime: 480,
      rentPrice: 100,
      buyPrice: 1500,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A woman makes a Faustian bargain to live forever but is cursed to be forgotten by everyone she meets."
    },
    {
      id: 25,
      title: "Project Hail Mary",
      author: "Andy Weir",
      genre: "sci-fi",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
      rating: 4.7,
      reviewCount: 6789,
      readingTime: 600,
      rentPrice: 105,
      buyPrice: 1600,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A lone astronaut must save the Earth from an extinction-level threat in this science fiction thriller."
    },
    {
      id: 16,
      title: "Becoming",
      author: "Michelle Obama",
      genre: "biography",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      rating: 4.6,
      reviewCount: 6789,
      readingTime: 480,
      rentPrice: 110,
      buyPrice: 1700,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: true,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "The memoir of former First Lady Michelle Obama, detailing her life from childhood to her time in the White House."
    },
    {
      id: 17,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      genre: "sci-fi",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81XSN3hA5gL.jpg",
      rating: 4.4,
      reviewCount: 3456,
      readingTime: 240,
      rentPrice: 115,
      buyPrice: 1800,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: false,
      isSeries: true,
      description: "A comedic science fiction series following Arthur Dent as he travels through space after Earth's destruction."
    },
    {
      id: 18,
      title: "The Martian",
      author: "Andy Weir",
      genre: "sci-fi",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/91N7wZ1G2zL.jpg",
      rating: 4.8,
      reviewCount: 5678,
      readingTime: 480,
      rentPrice: 120,
      buyPrice: 1900,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: true,
      isAudiobook: true,
      isBestseller: true,
      isSeries: false,
      description: "A survival story of an astronaut stranded on Mars, using science and ingenuity to stay alive."
    },
    {
      id: 19,
      title: "Normal People",
      author: "Sally Rooney",
      genre: "romance",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81NQA1BDHWL.jpg",
      rating: 4.2,
      reviewCount: 2345,
      readingTime: 360,
      rentPrice: 125,
      buyPrice: 2000,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: true,
      isAwardWinner: false,
      isStaffPick: false,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "A story of Marianne and Connell, two young people from different backgrounds whose relationship evolves over time."
    },
    {
      id: 20,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      genre: "romance",
      coverImage: "https://images-na.ssl-images-amazon.com/images/I/81aY1lxk+9L.jpg",
      rating: 4.1,
      reviewCount: 4567,
      readingTime: 300,
      rentPrice: 130,
      buyPrice: 2100,
      isAvailable: true,
      isNewRelease: false,
      isWishlisted: false,
      isAwardWinner: false,
      isStaffPick: false,
      isAudiobook: true,
      isBestseller: false,
      isSeries: false,
      description: "A classic coming-of-age novel following Holden Caulfield's experiences in New York City after being expelled from school."
    }
  ];

  // Generate more books for pagination
  const generateMoreBooks = (page) => {
    const booksPerPage = 20;
    const startIndex = (page - 1) * booksPerPage;
    return Array.from({ length: booksPerPage }, (_, i) => ({
      ...mockBooks?.[i % mockBooks?.length],
      id: startIndex + i + 1,
      // keep original title (no suffix) to allow deduplication across pages
      title: mockBooks?.[i % mockBooks?.length]?.title,
    }));
  };

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setBooks(generateMoreBooks(1));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Listen for mobile filter toggle
    const handleToggleMobileFilters = () => {
      setIsFilterSidebarOpen(true);
    };

    document.addEventListener('toggleMobileFilters', handleToggleMobileFilters);
    return () => document.removeEventListener('toggleMobileFilters', handleToggleMobileFilters);
  }, []);

  const handleFilterChange = (category, value, checked) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev?.[category], value]
        : prev?.[category]?.filter(item => item !== value)
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      availability: [],
      genre: [],
      author: [],
      rating: [],
      price: [],
      features: []
    });
  };

  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    const newBooks = generateMoreBooks(nextPage);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter out duplicates by title before appending
    const existingTitles = new Set(books.map(b => b.title));
    const uniqueNew = newBooks.filter(nb => !existingTitles.has(nb.title));

    // Append only unique books
    setBooks(prev => [...prev, ...uniqueNew]);
    setCurrentPage(nextPage);

    // If we couldn't produce a full page of unique books, stop loading more
    if (uniqueNew.length === 0 || nextPage >= 5) {
      setHasMore(false);
    }
  };

  const handleVoiceSearch = (transcript) => {
    setSearchQuery(transcript);
  };

  const getFilterCounts = () => {
    const totalBooks = mockBooks.length;
    const genreCounts = mockBooks.reduce((acc, book) => {
      acc[book.genre] = (acc[book.genre] || 0) + 1;
      return acc;
    }, {});

    return {
      total: totalBooks,
      genre: {
        'mystery': genreCounts.mystery || 0,
        'romance': genreCounts.romance || 0,
        'sci-fi': genreCounts['sci-fi'] || 0,
        'fantasy': genreCounts.fantasy || 0,
        'biography': genreCounts.biography || 0,
        'history': genreCounts.history || 0,
        'self-help': genreCounts['self-help'] || 0,
        'business': genreCounts.business || 0,
      },
      availability: {
        'available-now': mockBooks.filter(b => b.isAvailable).length,
        'new-releases': mockBooks.filter(b => b.isNewRelease).length,
        'award-winners': mockBooks.filter(b => b.isAwardWinner).length,
        'staff-picks': mockBooks.filter(b => b.isStaffPick).length,
      },
      rating: {
        '5-stars': mockBooks.filter(b => b.rating === 5).length,
        '4-stars': mockBooks.filter(b => b.rating >= 4).length,
        '3-stars': mockBooks.filter(b => b.rating >= 3).length,
        '2-stars': mockBooks.filter(b => b.rating >= 2).length,
      },
      price: {
        'free': mockBooks.filter(b => b.rentPrice === 0).length,
        'under-5': mockBooks.filter(b => b.rentPrice < 5).length,
        '5-15': mockBooks.filter(b => b.rentPrice >= 5 && b.rentPrice <= 15).length,
        '15-25': mockBooks.filter(b => b.rentPrice > 15 && b.rentPrice <= 25).length,
        'over-25': mockBooks.filter(b => b.rentPrice > 25).length,
      },
      features: {
        'audiobook': mockBooks.filter(b => b.isAudiobook).length,
        'quick-read': mockBooks.filter(b => b.readingTime <= 240).length,
        'bestseller': mockBooks.filter(b => b.isBestseller).length,
        'series': mockBooks.filter(b => b.isSeries).length,
      },
      author: {
        'stephen-king': mockBooks.filter(b => b.author === 'Stephen King').length,
        'agatha-christie': mockBooks.filter(b => b.author === 'Agatha Christie').length,
        'j-k-rowling': mockBooks.filter(b => b.author === 'J.K. Rowling').length,
        'dan-brown': mockBooks.filter(b => b.author === 'Dan Brown').length,
        'gillian-flynn': mockBooks.filter(b => b.author === 'Gillian Flynn').length,
      }
    };
  };

  const getResultsCount = () => {
    // Use actual total count from mock data
    const baseCount = getFilterCounts().total;
    const activeFiltersCount = Object.values(filters)?.flat()?.length;
    return Math.max(baseCount - (activeFiltersCount * 2), books?.length); // Reduced penalty for more accurate counts
  };

  const getContextualMessage = () => {
    if (searchQuery) {
      return `books match your search for "${searchQuery}"`;
    }
    
    const activeGenres = filters?.genre;
    if (activeGenres?.length > 0) {
      return `books match your taste in ${activeGenres?.join(', ')} novels`;
    }
    
    return 'books in our catalog';
  };

  return (
    <>
      <Helmet>
        <title>Library Catalog - BookVault | Discover Your Next Great Read</title>
        <meta name="description" content="Browse BookVault's extensive library catalog with advanced search and filtering. Discover books by genre, author, rating, and more. Rent or buy your next favorite book." />
        <meta name="keywords" content="book catalog, library, search books, filter books, rent books, buy books, BookVault" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="pt-16">
          {/* Search Header */}
          <div className="bg-white border-b border-gray-200 py-6">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-2xl">
                  <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onVoiceSearch={handleVoiceSearch}
                  />
                </div>
                
                <div className="text-center lg:text-right">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {getResultsCount()?.toLocaleString()}
                    </span>
                    {' '}{getContextualMessage()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex">
            {/* Filter Sidebar */}
            <FilterSidebar
              isOpen={isFilterSidebarOpen}
              onClose={() => setIsFilterSidebarOpen(false)}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              filterCounts={getFilterCounts()}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
              <SortingControls
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultsCount={getResultsCount()}
              />

              <BookGrid
                books={books}
                viewMode={viewMode}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LibraryCatalog;