/**
 * App.tsx
 * Main application component: sets up routing, navbar, and layout for the website.
 */

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MainApp from "./MainApp";
import Home from "./Home";
import Contact from "./Contact";
import logo from "../assets/logo.png";

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100">
      
      {/* Fixed Navbar at the top of the page */}
      <nav
        className="backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50"
        style={{ backgroundColor: "#1F233F" }} // custom dark background
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Left: Logo and branding */}
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="SafeSight Logo" 
                className="h-14 w-27 object-contain" 
              />
            </div>

            {/* Right: Navigation links for desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/app"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                App
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button Placeholder */}
            <div className="md:hidden">
              {/* TODO: add burger menu for mobile navigation */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content area, scrollable, with spacing for fixed navbar */}
      <main className="flex-1 mt-16 overflow-y-auto">
        {/* Routes define which component is shown based on the URL path */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<MainApp />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}