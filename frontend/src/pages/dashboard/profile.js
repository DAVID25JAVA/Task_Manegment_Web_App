import { useContext, useState, useEffect } from "react";
import { User, Mail, Phone, Pencil, X, Save } from "lucide-react";
import { UserContext } from "../_app";
import API from "@/services/Api";
import toast from "react-hot-toast";

export default function ProfileCard() {
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Populate formData from user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        fullname: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      // ✅ Cookie-based auth: No token needed in header
      const res = await API("put", "user/update-profile", payload);

      if (res?.success) {
        toast.success(res.message);

        // Update context + localStorage
        const updatedUser = {
          ...user,
          fullname: formData.name,
          email: formData.email,
          phone: formData.phone,
        };

        setUser(updatedUser); // context update
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setShowModal(false);
      } else {
        toast.error(res?.message || "Profile update failed");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Profile Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg mx-auto overflow-hidden border border-gray-100">
        <div className="relative h-40 bg-gradient-to-br from-pink-500 via-pink-400 to-orange-500 flex items-end justify-center pb-6">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10 w-28 h-28 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-pink-500 text-4xl font-bold shadow-2xl border-4 border-white/80 ring-2 ring-white/50">
            {user?.fullname?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setShowModal(true)}
          className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 border border-white/50 hover:scale-105"
        >
          <Pencil className="w-5 h-5 text-pink-500" />
        </button>

        {/* Profile Info */}
        <div className="px-6 pb-4 text-center">
          <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
          <p className="text-sm text-gray-500 mt-1">{formData.email}</p>
        </div>

        <div className="border-t border-gray-100 mx-6"></div>

        <div className="p-6 space-y-4">
          {/* Name */}
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <User className="w-5 h-5 text-pink-500" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-gray-600">
                Name
              </span>
              <span className="block text-base font-medium text-gray-900 truncate">
                {formData.name}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Mail className="w-5 h-5 text-pink-500" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-gray-600">
                Email
              </span>
              <span className="block text-base font-medium text-gray-900 truncate">
                {formData.email}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-100">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Phone className="w-5 h-5 text-pink-500" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-gray-600">
                Phone
              </span>
              <span className="block text-base font-medium text-gray-900 truncate">
                {formData.phone || "Not added"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Edit Profile
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-black border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-black border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-black border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* Save */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-lg font-medium shadow-md hover:opacity-90 transition"
              >
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
