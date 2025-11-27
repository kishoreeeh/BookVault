import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const GenreDiscoverySection = () => {
  const [hoveredGenre, setHoveredGenre] = useState(null);

  const genres = [
    {
      id: 1,
      name: "Mystery & Thriller",
      description: "Edge-of-your-seat suspense and mind-bending mysteries",
      icon: "Search",
      color: "from-red-500 to-red-700",
      bookCount: "2,340",
      popularBooks: [
        { title: "Gone Girl", author: "Gillian Flynn" },
        { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson" },
        { title: "Big Little Lies", author: "Liane Moriarty" }
      ],
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Romance",
      description: "Love stories that will make your heart flutter",
      icon: "Heart",
      color: "from-pink-500 to-rose-600",
      bookCount: "1,890",
      popularBooks: [
        { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid" },
        { title: "Beach Read", author: "Emily Henry" },
        { title: "The Hating Game", author: "Sally Thorne" }
      ],
      image: "https://images.unsplash.com/photo-1518621012118-1d2cc6b3d49a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Science Fiction",
      description: "Explore infinite possibilities and future worlds",
      icon: "Zap",
      color: "from-blue-500 to-purple-600",
      bookCount: "1,567",
      popularBooks: [
        { title: "Project Hail Mary", author: "Andy Weir" },
        { title: "Dune", author: "Frank Herbert" },
        { title: "The Martian", author: "Andy Weir" }
      ],
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Self-Help",
      description: "Transform your life with actionable insights",
      icon: "TrendingUp",
      color: "from-green-500 to-emerald-600",
      bookCount: "987",
      popularBooks: [
        { title: "Atomic Habits", author: "James Clear" },
        { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey" },
        { title: "Think and Grow Rich", author: "Napoleon Hill" }
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Fantasy",
      description: "Magical realms and epic adventures await",
      icon: "Sparkles",
      color: "from-purple-500 to-indigo-600",
      bookCount: "2,156",
      popularBooks: [
        { title: "The Name of the Wind", author: "Patrick Rothfuss" },
        { title: "The Way of Kings", author: "Brandon Sanderson" },
        { title: "The Hobbit", author: "J.R.R. Tolkien" }
      ],
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Biography",
      description: "Inspiring life stories of remarkable people",
      icon: "User",
      color: "from-orange-500 to-amber-600",
      bookCount: "743",
      popularBooks: [
        { title: "Educated", author: "Tara Westover" },
        { title: "Becoming", author: "Michelle Obama" },
        { title: "Steve Jobs", author: "Walter Isaacson" }
      ],
      image: "C:\Users\ADMIN\Downloads\educated.webp"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-crimson font-bold text-primary mb-4">
            Discover by Genre
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore curated collections across every genre. From heart-pounding thrillers to epic fantasies, find your next obsession.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {genres?.map((genre) => (
            <div
              key={genre?.id}
              className="group relative overflow-hidden rounded-2xl literary-shadow hover:shadow-2xl transition-all duration-500 cursor-pointer"
              onMouseEnter={() => setHoveredGenre(genre?.id)}
              onMouseLeave={() => setHoveredGenre(null)}
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={genre?.image}
                  alt={genre?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${genre?.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Icon name={genre?.icon} size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{genre?.bookCount}</div>
                      <div className="text-sm opacity-90">books</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-crimson font-bold mb-2">
                      {genre?.name}
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      {genre?.description}
                    </p>

                    {/* Popular Books - Show on Hover */}
                    <div className={`transition-all duration-300 ${
                      hoveredGenre === genre?.id 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-4'
                    }`}>
                      <div className="text-xs opacity-80 mb-2">Popular titles:</div>
                      <div className="space-y-1">
                        {genre?.popularBooks?.slice(0, 2)?.map((book, index) => (
                          <div key={index} className="text-xs">
                            <span className="font-medium">{book?.title}</span>
                            <span className="opacity-70"> by {book?.author}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className={`mt-4 transition-all duration-300 ${
                      hoveredGenre === genre?.id 
                        ? 'opacity-100 transform translate-y-0' 
                        : 'opacity-0 transform translate-y-4'
                    }`}>
                      <Link to={`/library-catalog?genre=${encodeURIComponent(genre?.name)}`}>
                        <Button
                          variant="default"
                          size="sm"
                          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-gray-900"
                          iconName="ArrowRight"
                          iconPosition="right"
                        >
                          Explore
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                  hoveredGenre === genre?.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Genre Spotlight */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Star" size={24} />
                </div>
                <span className="text-accent font-semibold">This Month's Spotlight</span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-crimson font-bold mb-4">
                Literary Fiction Renaissance
              </h3>
              <p className="text-gray-200 mb-6 leading-relaxed">
                Discover award-winning contemporary literature that's reshaping modern storytelling. From Pulitzer Prize winners to emerging voices, explore narratives that challenge, inspire, and transform.
              </p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">450+</div>
                  <div className="text-sm text-gray-300">New Titles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">15</div>
                  <div className="text-sm text-gray-300">Award Winners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">92%</div>
                  <div className="text-sm text-gray-300">Reader Rating</div>
                </div>
              </div>

              <Link to="/library-catalog?genre=Literary Fiction">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white px-8 py-3"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Explore Collection
                </Button>
              </Link>
            </div>

            <div className="relative">
              {/* Mock Book Covers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="w-full h-32 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon name="BookOpen" size={32} className="text-white/60" />
                  </div>
                  <div className="w-full h-24 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon name="BookOpen" size={24} className="text-white/60" />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="w-full h-24 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon name="BookOpen" size={24} className="text-white/60" />
                  </div>
                  <div className="w-full h-32 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Icon name="BookOpen" size={32} className="text-white/60" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-literary-gold/20 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Browse All Genres CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-crimson font-bold text-primary mb-4">
            Can't Find Your Favorite Genre?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We have over 50 genres and subgenres to explore. From niche academic texts to popular beach reads, there's something for every reader.
          </p>
          <Link to="/library-catalog">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
              iconName="Grid"
              iconPosition="left"
            >
              Browse All Genres
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenreDiscoverySection;