"use client"

import React, { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 backdrop-blur-lg bg-opacity-80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
            <span className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              NewYear-Resolution
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">

              <button
                className="relative text-lg font-medium text-white hover:text-blue-400 transition-colors group"
              >
               <Link href={"/"}>Home</Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </button>

              <button
                className="relative text-lg font-medium text-white hover:text-blue-400 transition-colors group"
              >
               <h1>About</h1>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </button>

              <button
                className="relative text-lg font-medium text-white hover:text-blue-400 transition-colors group"
              >
               <h1>Contact</h1>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </button>

              <button
                className="relative text-lg font-medium text-white hover:text-blue-400 transition-colors group"
              >
               <Link href={"https://github.com/SuperexMack"}>Contribute</Link>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-900 to-purple-900 border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-3">
              <button
                className="block w-full text-left px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
              >
               <Link href={"/"}></Link>
              </button>

              <button
                className="block w-full text-left px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <h1>About</h1>
              </button>

              <button
                className="block w-full text-left px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <h1>Contact</h1>
              </button>

              <button
                className="block w-full text-left px-4 py-3 text-lg font-medium text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Link href={"https://github.com/SuperexMack"}>Contribute</Link>
              </button>
          </div>
        </div>
      )}
    </nav>
  );
}