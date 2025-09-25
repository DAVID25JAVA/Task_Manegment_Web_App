import { UserContext } from "@/pages/_app";
import { LogOut, CheckCircle, X } from "lucide-react";
import { useContext, useState } from "react";
import API from "@/services/Api";
import { useRouter } from "next/router";

export default function Navbar() {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const { user, logoutUser } = useContext(UserContext);
  const router = useRouter();

  //  Logout Handler
  const handleLogOut = async () => {
     
  };

  // Handle logout confirmation
  const handleLogoutConfirm = async() => {
    try {
      await API("post", "user/logout");
      logoutUser();
      setShowConfirmLogout(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // Handle avatar click to show confirmation
  const handleAvatarClick = () => {
    setShowConfirmLogout(true);
  };

  return (
    <>
      <nav className="bg-white border-b-[1px] border-orange-500 px-6 py-4 flex justify-between items-center">
        <div className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          TaskMaster
        </div>
        {user && (
          <div
            onClick={handleAvatarClick}
            className="cursor-pointer bg-gradient-to-r text-xl from-pink-500 to-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 transition-all"
          >
            {user?.fullname?.charAt(0)?.toUpperCase()}
          </div>
        )}
        {/* : (
          <button
            onClick={handleLogOut}
            className="flex cursor-pointer outline-0 items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        )} */}
      </nav>

      {/* Logout Confirmation Popup */}
      {showConfirmLogout && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <button
              onClick={() => setShowConfirmLogout(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h3>
            <p className="mb-6 text-gray-600">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
