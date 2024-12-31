import React from 'react';
import { Sparkles } from 'lucide-react';
import Link from "next/link";


export function Heading() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white mb-8">
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Level up your dev game in 2025! 🚀</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
            New-Year Resolution
            <br />
            <span className="font-extrabold">For Developers</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-blue-100 font-medium">
            Drop your LeetCode & GitHub profiles and let our AI analyze your 
            coding journey. Time to transform from a regular dev to a 
            <span className="text-pink-400 font-bold"> 100x beast! </span> 
            💪
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <button className="group w-full sm:w-auto px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:scale-105">
              Donate 🔥
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-xl font-bold text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-white/20">
              <Link href={"/userdata"}>Explore 💻</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}