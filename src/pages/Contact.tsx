/**
 * Contact.tsx
 * Offers the user to contact the owners.
 */


import React from "react";

export default function Contact() {
  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)] bg-gray-950 text-gray-100 px-4 py-4">
      
      {/* Top + middle content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 tracking-wide text-center">
          Contact Us
        </h1>

        <div className="bg-gray-900 rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-md">
          <form className="flex flex-col gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-gray-800 text-gray-100 px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-800 text-gray-100 px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              rows={3}
              className="bg-gray-800 text-gray-100 px-4 py-2 sm:py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2 sm:py-3 rounded-lg shadow-lg transition-colors duration-200 mt-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-4 text-gray-400 text-center border-t border-gray-800 w-full">
        &copy; {new Date().getFullYear()} SafeSight. All rights reserved.
      </footer>
    </div>
  );
}