import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

import Input from './Input';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage', icon: 'Home' },
    { name: 'Catalog', path: '/library-catalog', icon: 'BookOpen' },
    { name: 'Dashboard', path: '/reader-dashboard', icon: 'User' },
    { name: 'Reading', path: '/reading-interface', icon: 'Book' },
  ];

  const moreMenuItems = [
    { name: 'Book Details', path: '/book-detail-pages', icon: 'Info' },
    { name: 'Cart', path: '/checkout-cart', icon: 'ShoppingCart' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Searching for:', searchQuery);
      // Handle search logic here
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 literary-shadow">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm0 2h7v5h5v11H6V4zm2 8v2h8v-2H8zm0 4v2h8v-2H8z"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-crimson font-semibold text-primary">BookVault</h1>
              <p className="text-xs text-muted-foreground -mt-1">Literary Sanctuary</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {moreMenuItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        isActivePath(item?.path) ? 'text-primary bg-gray-50' : 'text-gray-600'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="hidden md:block relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search books, authors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-64 pr-10"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Icon name="Search" size={20} />
                </button>
              )}
            </div>

            {/* Mobile Search */}
            <button className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
              <Icon name="Search" size={20} />
            </button>

            {/* Cart */}
            <Link
              to="/checkout-cart"
              className="relative p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Icon name="ShoppingCart" size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Login and Sign Up Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Icon name="LogIn" size={16} className="inline mr-2" />
                Login
              </button>
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <Icon name="UserPlus" size={16} className="inline mr-2" />
                Sign Up
              </button>
            </div>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
              </button>

              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link to="/reader-dashboard" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </Link>
                  <Link to="/reader-dashboard" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <Icon name="BookOpen" size={16} />
                    <span>My Library</span>
                  </Link>
                  <Link to="/reader-dashboard" className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-2" />
                  <button className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <Input
                  type="search"
                  placeholder="Search books, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </form>

              {/* Navigation Items */}
              {[...navigationItems, ...moreMenuItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-white' :'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}

              {/* Mobile Login/Sign Up */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <Icon name="LogIn" size={18} />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsSignupModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300"
                >
                  <Icon name="UserPlus" size={18} />
                  <span>Sign Up</span>
                </button>
              </div>

              {/* Mobile User Actions */}
              <hr className="my-4" />
              <Link
                to="/reader-dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <Icon name="User" size={18} />
                <span>Profile</span>
              </Link>
              <Link
                to="/reader-dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
              >
                <Icon name="Settings" size={18} />
                <span>Settings</span>
              </Link>
              <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors w-full text-left">
                <Icon name="LogOut" size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
