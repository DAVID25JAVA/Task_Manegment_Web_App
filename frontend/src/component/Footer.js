import { CheckCircle } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">TaskMaster</span>
            </div>

            <div className="flex space-x-8">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 TaskMaster. All rights reserved. Built with ❤ for
              productive teams.
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer