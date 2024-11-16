import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to manage the hamburger menu
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <header style={{ background: 'linear-gradient(115deg, #004769, #000000)' }} className="text-white fixed w-full top-0 z-50">      
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        {/* Hamburger menu button */}
        <button
          className="text-xl transition-colors duration-300 hover:text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          &#9776; {/* This is the hamburger icon */}
        </button>

        <div className="flex items-center">
          <img src="/kissu-music-high-resolution-logo-grayscale-transparent.svg" alt="Kissu Music Logo" className="h-8 mx-auto" />
        </div>

        {/* Search icon */}
        <Link
          to="/search"
          className="text-xl transition-colors duration-300 hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </Link>

        {/* Navigation links - hidden on mobile, visible on larger screens */}
        <nav className="hidden md:flex space-x-6 items-center absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="transition-colors duration-300 hover:text-gray-300 text-xl">
            Home
          </Link>
          <Link to="/top-charts" className="transition-colors duration-300 hover:text-gray-300 text-xl">
            Top Charts
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="transition-colors duration-300 hover:text-gray-300 text-xl"
            >
              Language
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
                {['English', 'Hindi', 'Marathi', 'Punjabi', 'Haryanvi', 'Bhojpuri'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang.toLowerCase())}
                    className="block px-4 py-2 hover:bg-gray-700 w-full text-left transition-colors duration-300"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg absolute top-full left-0 w-full">
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              className="transition-colors duration-300 hover:bg-gray-700 rounded-md px-4 py-2 text-white"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/top-charts"
              className="transition-colors duration-300 hover:bg-gray-700 rounded-md px-4 py-2 text-white"
              onClick={() => setMenuOpen(false)}
            >
              Top Charts
            </Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="transition-colors duration-300 hover:bg-gray-700 rounded-md px-4 py-2 text-left w-full text-white"
              >
                Language
              </button>
              {dropdownOpen && (
                <div className="mt-2 w-full bg-gray-800 text-white rounded-md shadow-lg">
                  {['English', 'Hindi', 'Marathi', 'Punjabi', 'Haryanvi', 'Bhojpuri'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang.toLowerCase())}
                      className="block px-4 py-2 hover:bg-gray-700 w-full text-left transition-colors duration-300"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/search"
              className="transition-colors duration-300 hover:bg-gray-700 rounded-md px-4 py-2 text-white"
              onClick={() => setMenuOpen(false)}
            >
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
