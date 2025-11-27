import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useCart } from '../../../context/CartContext';

const TrendingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
// ...existing code...
const trendingBooks = [
  { id: 1, title: 'The Housemaid', author: 'Freida McFadden', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop', rating: 4.2, reviews: 4120, rentPrice: '₹40/hour', buyPrice: '₹350', rentalPrice: 40, purchasePrice: 350, genre: 'Thriller', trending: true, description: 'A tense domestic thriller full of twists.' },
  { id: 2, title: 'It Ends With Us', author: 'Colleen Hoover', cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', rating: 4.6, reviews: 8721, rentPrice: '₹45/hour', buyPrice: '₹380', rentalPrice: 45, purchasePrice: 380, genre: 'Romance', trending: true, description: 'A powerful story about love and difficult choices.' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop', rating: 4.9, reviews: 25432, rentPrice: '₹50/hour', buyPrice: '₹420', rentalPrice: 50, purchasePrice: 420, genre: 'Classic', trending: true, description: 'A classic novel of justice and moral growth.' },
  { id: 4, title: '1984', author: 'George Orwell', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop', rating: 4.8, reviews: 30120, rentPrice: '₹48/hour', buyPrice: '₹460', rentalPrice: 48, purchasePrice: 460, genre: 'Dystopian', trending: true, description: 'A chilling dystopia about surveillance and control.' },
  { id: 5, title: 'The Book Thief', author: 'Markus Zusak', cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop', rating: 4.7, reviews: 17450, rentPrice: '₹42/hour', buyPrice: '₹430', rentalPrice: 42, purchasePrice: 430, genre: 'Historical', trending: true, description: 'A moving story set in WWII Germany.' },
  { id: 6, title: 'The Secret History', author: 'Donna Tartt', cover: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=300&h=400&fit=crop', rating: 4.5, reviews: 9321, rentPrice: '₹38/hour', buyPrice: '₹370', rentalPrice: 38, purchasePrice: 370, genre: 'Literary', trending: true, description: 'A dark academic mystery with intellectual suspense.' },
  { id: 7, title: 'Where the Crawdads Sing', author: 'Delia Owens', cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&h=400&fit=crop', rating: 4.5, reviews: 11234, rentPrice: '₹46/hour', buyPrice: '₹440', rentalPrice: 46, purchasePrice: 440, genre: 'Mystery', trending: true, description: 'A coming-of-age murder mystery set in the marshlands.' },
  { id: 8, title: 'Pride and Prejudice', author: 'Jane Austen', cover: 'https://images.unsplash.com/photo-1476958526483-36efcaa80f58?w=300&h=400&fit=crop', rating: 4.8, reviews: 15890, rentPrice: '₹35/hour', buyPrice: '₹360', rentalPrice: 35, purchasePrice: 360, genre: 'Classic', trending: true, description: 'A witty exploration of manners, marriage and morality.' },
  { id: 9, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://images.unsplash.com/photo-1496104679561-38b0b8d24c6a?w=300&h=400&fit=crop', rating: 4.4, reviews: 14320, rentPrice: '₹37/hour', buyPrice: '₹370', rentalPrice: 37, purchasePrice: 370, genre: 'Classic', trending: true, description: 'A tragic story of wealth, love and the American dream.' },
  { id: 10, title: 'The Catcher in the Rye', author: 'J.D. Salinger', cover: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&h=400&fit=crop', rating: 4.1, reviews: 11211, rentPrice: '₹36/hour', buyPrice: '₹355', rentalPrice: 36, purchasePrice: 355, genre: 'Classic', trending: true, description: 'A coming-of-age novel about teenage angst and alienation.' },
  { id: 18, title: 'The Alchemist', author: 'Paulo Coelho', cover: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=300&h=400&fit=crop&ixid=1', rating: 4.3, reviews: 20110, rentPrice: '₹39/hour', buyPrice: '₹365', rentalPrice: 39, purchasePrice: 365, genre: 'Philosophical', trending: true, description: 'A fable about following your dreams and listening to your heart.' },
  { id: 12, title: 'The Kite Runner', author: 'Khaled Hosseini', cover: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=300&h=400&fit=crop', rating: 4.6, reviews: 17890, rentPrice: '₹47/hour', buyPrice: '₹480', rentalPrice: 47, purchasePrice: 480, genre: 'Historical', trending: true, description: 'A powerful story of friendship and redemption.' },
  { id: 13, title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: 'https://images.unsplash.com/photo-1524985069026-6d7c1d7b9d9b?w=300&h=400&fit=crop', rating: 4.8, reviews: 22340, rentPrice: '₹50/hour', buyPrice: '₹599', rentalPrice: 50, purchasePrice: 599, genre: 'Fantasy', trending: true, description: 'An adventurous prelude to the Lord of the Rings.' },
  { id: 14, title: 'The Da Vinci Code', author: 'Dan Brown', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop', rating: 4.0, reviews: 13200, rentPrice: '₹41/hour', buyPrice: '₹390', rentalPrice: 41, purchasePrice: 390, genre: 'Thriller', trending: true, description: 'A fast-paced mystery involving secret societies and codes.' },
  { id: 15, title: 'The Hunger Games', author: 'Suzanne Collins', cover: 'https://images.unsplash.com/photo-1507842217343-5c1a2e6d2f15?w=300&h=400&fit=crop', rating: 4.5, reviews: 19999, rentPrice: '₹44/hour', buyPrice: '₹420', rentalPrice: 44, purchasePrice: 420, genre: 'Young Adult', trending: true, description: 'A dystopian survival story and commentary on spectacle.' },

  // Additional unique books (no duplicates)
  { id: 16, title: 'The Silent Patient', author: 'Alex Michaelides', cover: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=300&h=400&fit=crop', rating: 4.1, reviews: 9200, rentPrice: '₹39/hour', buyPrice: '₹380', rentalPrice: 39, purchasePrice: 380, genre: 'Thriller', trending: false, description: 'A psych thriller about silence and secrets.' },
  { id: 17, title: 'Normal People', author: 'Sally Rooney', cover: 'https://images.unsplash.com/photo-1507842217343-8a0b3b7b6c5f?w=300&h=400&fit=crop', rating: 4.0, reviews: 8200, rentPrice: '₹35/hour', buyPrice: '₹350', rentalPrice: 35, purchasePrice: 350, genre: 'Contemporary', trending: false, description: 'A tender exploration of complex relationships.' },
  { id: 19, title: 'Little Fires Everywhere', author: 'Celeste Ng', cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=300&h=400&fit=crop', rating: 4.2, reviews: 9800, rentPrice: '₹37/hour', buyPrice: '₹360', rentalPrice: 37, purchasePrice: 360, genre: 'Drama', trending: false, description: 'A novel about motherhood, secrecy and race.' },
  { id: 20, title: 'The Night Circus', author: 'Erin Morgenstern', cover: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop', rating: 4.4, reviews: 11000, rentPrice: '₹50/hour', buyPrice: '₹520', rentalPrice: 50, purchasePrice: 520, genre: 'Fantasy', trending: false, description: 'A magical competition in a traveling circus.' }
];
// ...existing code...
// ...existing code...

  const booksPerSlide = 4;
  const totalSlides = Math.ceil(trendingBooks?.length / booksPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentBooks = () => {
    const startIndex = currentSlide * booksPerSlide;
    return trendingBooks?.slice(startIndex, startIndex + booksPerSlide);
  };

  const { addToCart } = useCart();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-crimson font-bold text-primary mb-2">
              Trending Now
            </h2>
            <p className="text-gray-600">
              Discover what 50,000+ readers are loving this week
            </p>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
        </div>

        {/* Books Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides })?.map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingBooks?.slice(slideIndex * booksPerSlide, (slideIndex + 1) * booksPerSlide)?.map((book) => (
                      <div key={book?.id} className="group">
                        <div className="relative bg-white rounded-2xl literary-shadow hover:shadow-xl transition-all duration-300 overflow-hidden book-hover">
                          {/* Book Cover */}
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                              src={book?.cover}
                              alt={book?.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Trending Badge */}
                            {book?.trending && (
                              <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                                <Icon name="TrendingUp" size={12} />
                                <span>Trending</span>
                              </div>
                            )}

                            {/* Quick Action Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="flex space-x-3">
                                <Link to={`/book-detail-pages?id=${book?.id}`}>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-white text-primary hover:bg-gray-100"
                                    iconName="Eye"
                                    iconPosition="left"
                                  >
                                    Preview
                                  </Button>
                                </Link>
                                <Link to={`/reading-interface?id=${book?.id}&mode=rent`}>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-accent hover:bg-accent/90"
                                    iconName="Clock"
                                    iconPosition="left"
                                  >
                                    Rent
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Book Info */}
                          <div className="p-4">
                            <div className="mb-2">
                              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
                                {book?.genre}
                              </span>
                            </div>
                            
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                              {book?.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">by {book?.author}</p>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="flex items-center">
                                {[...Array(5)]?.map((_, i) => (
                                  <Icon
                                    key={i}
                                    name="Star"
                                    size={14}
                                    className={`${
                                      i < Math.floor(book?.rating)
                                        ? 'text-accent fill-current' :'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {book?.rating}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({book?.reviews?.toLocaleString()})
                              </span>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-center">
                                <div className="text-sm font-semibold text-accent">
                                  {book?.rentPrice}
                                </div>
                                <div className="text-xs text-gray-500">Rent</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-semibold text-primary">
                                  {book?.buyPrice}
                                </div>
                                <div className="text-xs text-gray-500">Buy</div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                              <div className="flex space-x-2">
                                <button onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); addToCart(book, 'rental'); alert(`${book?.title} added to cart as rental`); }} className="flex-1">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full text-accent border-accent hover:bg-accent hover:text-white"
                                    iconName="Clock"
                                    iconPosition="left"
                                  >
                                    Rent
                                  </Button>
                                </button>
                                <button onClick={(e) => { e?.preventDefault(); e?.stopPropagation(); addToCart(book, 'purchase'); alert(`${book?.title} added to cart`); }} className="flex items-center justify-center">
                                  <Button
                                    variant="default"
                                    size="icon"
                                    className="w-10 h-10 bg-primary hover:bg-primary/90"
                                    iconName="ShoppingCart"
                                  />
                                </button>
                              </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-center space-x-3 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="w-10 h-10 rounded-full"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides })?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="w-10 h-10 rounded-full"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/library-catalog">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
              iconName="ArrowRight"
              iconPosition="right"
            >
              View All Books
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;