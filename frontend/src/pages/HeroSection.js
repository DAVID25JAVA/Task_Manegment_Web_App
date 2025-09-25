import React from "react";
import { ArrowRight } from "lucide-react";

function HeroSection({ }) {
 
  
  return (
    <div>
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-orange-500 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Hero Section */}
        <div className="relative z-10 container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Manage Tasks Like a
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Pro
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white opacity-90 mb-10 leading-relaxed">
              Transform your productivity with the most intuitive task
              management platform. Built for teams that move fast and think big.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                // onClick={}
                className="group bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 flex items-center"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all">
                Watch Demo
              </button>
            </div>

            <div className="text-white opacity-75">
              <p>
                ✨ No credit card required • 🚀 Setup in under 2 minutes • 🎯
                Free forever plan
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-300 opacity-20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-300 opacity-30 rounded-full animate-ping"></div>
      </header>
    </div>
  );
}

export default HeroSection;
