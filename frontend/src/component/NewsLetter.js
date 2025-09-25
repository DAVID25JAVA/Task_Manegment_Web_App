import React from "react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

function NewsLetter({ onGetStarted }) {
  const [email, setEmail] = useState("");
  return (
    <div>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-orange-500 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of productive teams and transform the way you work
            today
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-4 rounded-full border text-white text-lg w-full sm:w-80 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            />
            <button
              onClick={onGetStarted}
              className="group bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 flex items-center whitespace-nowrap"
            >
              Start Free Trial
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-pink-300 opacity-20 rounded-full animate-bounce"></div>
      </section>
    </div>
  );
}

export default NewsLetter;
