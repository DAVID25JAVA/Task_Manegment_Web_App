/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/component/Dashboard/SideBar";
import ProfileCard from "./profile";
import TaskList from "./tasklist";
import { User, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser({ name: "David Pal", email: "david@example.com" }); // Mock data
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    // Clear token and redirect (integrate with backend logout API if needed)
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Determine active section based on pathname (aligns with Sidebar routing)
  const getActiveSection = () => {
    if (pathname === "/profile") return "profile";
    if (pathname === "/tasks") return "tasks";
    return "dashboard"; // Default
  };

  const active = getActiveSection();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-pink-50 to-orange-50 overflow-hidden">
      {/* Sidebar - Pass router integration if needed, but use pathname for active state */}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overfl ow-hidden">
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Active Section Rendering */}

          {active === "dashboard" && (
            <div className="space-y-6">
              {/* Hero Welcome Section */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      Welcome back,
                      <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent ml-2">
                        {user.name}
                      </span>
                      !
                    </h1>
                    <p className="text-gray-600 text-sm lg:text-base">
                      Here's what's happening with your account today. Stay
                      productive! 🚀
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    <span>Dashboard Overview</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid - Enhanced with icons and better responsiveness */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tasks Card */}
                <div className="group bg-gradient-to-br from-pink-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90">Pending Tasks</p>
                      <p className="text-3xl font-bold mt-1">12</p>
                    </div>
                  </div>
                  <p className="text-xs opacity-80 mt-2">+2 from yesterday</p>
                </div>

                {/* Completed Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">
                        Completed
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">This week</p>
                </div>

                {/* Profile Completion Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">
                        Profile
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">
                        85%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Recent Activity or Quick Actions - Add for more engagement */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 hover:bg-pink-100 transition-all duration-200 group">
                    <AlertCircle className="w-8 h-8 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">
                      Add Task
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 hover:bg-pink-100 transition-all duration-200 group">
                    <CheckCircle className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">
                      Mark Complete
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 hover:bg-pink-100 transition-all duration-200 group">
                    <User className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">
                      Edit Profile
                    </span>
                  </button>
                  <button className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 hover:bg-pink-100 transition-all duration-200 group">
                    <TrendingUp className="w-8 h-8 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-gray-700">
                      View Analytics
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
