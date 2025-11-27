import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    discover: [
      { name: "Browse Library", path: "/library-catalog" },
      { name: "New Releases", path: "/library-catalog?filter=new" },
      { name: "Bestsellers", path: "/library-catalog?filter=bestsellers" },
      { name: "Free Books", path: "/library-catalog?filter=free" },
      { name: "Author Spotlights", path: "/library-catalog?section=authors" }
    ],
    account: [
      { name: "My Dashboard", path: "/reader-dashboard" },
      { name: "Reading History", path: "/reader-dashboard?tab=history" },
      { name: "Wishlist", path: "/reader-dashboard?tab=wishlist" },
      { name: "Account Settings", path: "/reader-dashboard?tab=settings" },
      { name: "Billing", path: "/reader-dashboard?tab=billing" }
    ],
    support: [
      { name: "Help Center", path: "/support" },
      { name: "Contact Us", path: "/contact" },
      { name: "Reading Guide", path: "/guide" },
      { name: "Technical Support", path: "/support/technical" },
      { name: "Community Forum", path: "/community" }
    ],
    company: [
      { name: "About BookVault", path: "/about" },
      { name: "Our Mission", path: "/mission" },
      { name: "Careers", path: "/careers" },
      { name: "Press Kit", path: "/press" },
      { name: "Publisher Partners", path: "/publishers" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/bookvault" },
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/bookvault" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/bookvault" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/bookvault" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/bookvault" }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                  <path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6H6zm0 2h7v5h5v11H6V4zm2 8v2h8v-2H8zm0 4v2h8v-2H8z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-crimson font-bold">BookVault</h3>
                <p className="text-sm text-gray-300">Literary Sanctuary</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premium digital library platform that revolutionizes book consumption through flexible ownership models. Read more, own what matters.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-accent"
                />
                <button className="px-6 py-2 bg-accent hover:bg-accent/90 rounded-r-lg transition-colors">
                  <Icon name="Send" size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Get book recommendations and exclusive offers
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="font-semibold mb-4">Discover</h4>
            <ul className="space-y-3">
              {footerLinks?.discover?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">My Account</h4>
            <ul className="space-y-3">
              {footerLinks?.account?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.name}>
                  <Link
                    to={link?.path}
                    className="text-gray-300 hover:text-accent transition-colors text-sm"
                  >
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-accent mb-1">100K+</div>
              <div className="text-sm text-gray-400">Books Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">50K+</div>
              <div className="text-sm text-gray-400">Active Readers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">2.5M+</div>
              <div className="text-sm text-gray-400">Books Read</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">4.9★</div>
              <div className="text-sm text-gray-400">Reader Rating</div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-400">
              <span>© {currentYear} BookVault. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-accent transition-colors">
                Cookie Policy
              </Link>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-blue-400" />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;