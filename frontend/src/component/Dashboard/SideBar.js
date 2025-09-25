import { Home, User, ListTodo, MoveLeftIcon, X } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Sidebar() {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const menuItems = [
    { label: "Dashboard", icon: <Home />, key: "" },
    { label: "Tasks", icon: <ListTodo />, key: "tasklist" },
    { label: "Profile", icon: <User />, key: "profile" },
  ];

  
  const handleMenuItemClick = (key) => {
    router.push(`/dashboard/${key}`);
    setIsMobileOpen(false); // Close drawer after navigation
  };

  // Handle back to home click
  const handleBackToHome = () => {
    router.push("/");
    setIsMobileOpen(false);  
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-2 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0  bg-opacity-50 z-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Drawer & Desktop Sidebar */}
      <aside className={`
        fixed md:relative w-64 bg-white border-r-[1px] border-orange-500 shadow h-screen p-6
        transform transition-transform duration-300 ease-in-out z-50
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => handleMenuItemClick(item.key)}
              className="flex items-center text-orange-500 hover:bg-gradient-to-r from-pink-500 to-orange-500 hover:text-white p-2 rounded-lg gap-3 cursor-pointer font-medium transition-colors"
            >
              {item.icon} {item.label}
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <button 
            onClick={handleBackToHome}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 h-9 rounded-lg cursor-pointer text-white font-medium relative"
          >
            <MoveLeftIcon className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </aside>
    </>
  );
}