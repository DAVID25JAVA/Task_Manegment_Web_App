import { useState, useContext } from "react";
import { Menu, X, ChevronDown, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import API from "@/services/Api";
import { UserContext } from "@/pages/_app";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConfirmLogout, setConfirmLogout] = useState(false);
  const router = useRouter();

  const { user, logoutUser  } = useContext(UserContext);

  // ✅ Logout Handler
  const handleLogOut = async () => {
    try {
      await API("post", "user/logout");  
      logoutUser ();  
      setConfirmLogout(false);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      router.push("/");  
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // ✅ Close mobile menu on section link click
  const handleSectionClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div onClick={()=>router.push("/")} className=" cursor-pointer text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            TaskMaster
          </div>
          {/* Desktop Menu - Only Features, Testimonials, Newsletter */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="#features" 
              scroll={true}  
              className="text-gray-700 hover:text-blue-600"
              onClick={handleSectionClick} 
            >
              Features
            </Link>
            <Link 
              href="#testimonials" 
              scroll={true}
              className="text-gray-700 hover:text-blue-600"
              onClick={handleSectionClick}
            >
              Testimonials
            </Link>
            <Link 
              href="#newsletter" 
              scroll={true}
              className="text-gray-700 hover:text-blue-600"
              onClick={handleSectionClick}
            >
              Newsletter
            </Link>

            {user ? (
              <>
                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 rounded-full"
                >
                  Dashboard
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 text-white flex items-center justify-center font-bold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                      <button
                        onClick={() => setConfirmLogout(true)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only Features, Testimonials, Newsletter */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link 
              href="#features" 
              scroll={true}
              className="block text-gray-700 hover:text-blue-600"
              onClick={handleSectionClick}
            >
              Features
            </Link>
            <Link 
              href="#testimonials" 
              scroll={true}
              className="block text-gray-700 hover:text-blue-600"
              onClick={handleSectionClick}
            >
              Testimonials
            </Link>
            <Link 
              href="#newsletter" 
              scroll={true}
              className="block text-gray-700 hover:text-blue-600"
              onClick={handleSectionClick}
            >
              Newsletter
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 bg-orange-500 text-white rounded-lg text-center"
                  onClick={handleSectionClick} // Close menu on dashboard click
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => setConfirmLogout(true)}
                  className="block text-center w-full px-4 py-2 text-white bg-pink-500 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="block px-4 py-2 bg-orange-500 text-white rounded-lg text-center"
                onClick={handleSectionClick} // Close menu on sign in click
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Confirm Logout Popup */}
      {isConfirmLogout && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-2xl bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4 text-black">Confirm Logout</h3>
            <p className="mb-6 text-black">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-4 py-2 bg-pink-400 rounded-lg hover:bg-pink-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
