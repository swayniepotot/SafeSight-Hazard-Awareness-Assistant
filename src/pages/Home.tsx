/**
 * Home.tsx
 * Main information section for the website.
 */

import { Link } from "react-router-dom";
import { ShieldCheck, Eye, Thermometer } from "lucide-react"; // icons for cards

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-r from-blue-800 via-gray-900 to-gray-950">
        <h1 className="text-6xl font-extrabold mb-4 text-blue-500 tracking-wider">SafeSight</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-8">
          AI-powered hazard awareness designed to help those with Congenital Insensitivity to Pain (CIP). Monitor your environment, stay safe, and get real-time alerts.
        </p>
        <div className="flex gap-6">
          <Link
            to="/app"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transition-colors duration-200 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-xl"
          >
            Launch App
          </Link>
          <Link
            to="/contact"
            className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transition-colors duration-200 hover:bg-gray-600 hover:-translate-y-1 hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-500">The Problem</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 text-blue-400 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">What is CIP?</h3>
            <p className="text-gray-300">
              Congenital Insensitivity to Pain (CIP) is a rare genetic condition causing individuals to not feel pain, creating high risk for injuries from burns, cuts, and other hazards.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
            <Eye className="w-12 h-12 text-blue-400 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Why it’s Dangerous</h3>
            <p className="text-gray-300">
              Young children with CIP are most vulnerable. 20% of children with anhidrosis, a CIP type, die by age 3 from overheating, highlighting the urgent need for solutions.
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
            <Thermometer className="w-12 h-12 text-blue-400 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Current Gap</h3>
            <p className="text-gray-300">
              Despite the severity, limited technology exists to support CIP patients. Our solution introduces accessible AI-powered hazard monitoring for everyday safety.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-500">Our Solution</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-950 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
            <Eye className="w-12 h-12 text-teal-400 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Facial & Activity Detection</h3>
            <p className="text-gray-300">
              Uses AI to monitor facial expressions and daily activity, providing early alerts to potential hazards.
            </p>
          </div>
          <div className="bg-gray-950 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
            <Thermometer className="w-12 h-12 text-teal-400 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Room Hazard Recognition</h3>
            <p className="text-gray-300">
              Detects environmental hazards in real-time using webcam and thermal technology to keep users safe.
            </p>
          </div>
          <div className="bg-gray-950 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 text-teal-400 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Text-to-Speech Accessibility</h3>
            <p className="text-gray-300">
              Converts hazard alerts to audio for maximum accessibility and immediate user awareness.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-500">Ready to Try SafeSight?</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Experience our AI hazard detection technology and make everyday environments safer for those with CIP disorder.
        </p>
        <Link
          to="/app"
          className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-xl transition-transform transition-colors duration-200 hover:bg-blue-500 hover:-translate-y-1"
        >
          Launch App
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        &copy; {new Date().getFullYear()} SafeSight. All rights reserved.
      </footer>
    </div>
  );
}
