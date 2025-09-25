import React, { useContext, useState } from "react";
import { CheckCircle, Eye, EyeOff, Mail, Lock, X } from "lucide-react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/services/Api";
import toast from "react-hot-toast";
import { UserContext } from "../_app";

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const payload = {
          email: values.email.toLowerCase(),
          password: values.password,
        };

        const res = await API("post", "user/login", payload);
        console.log("login res---->", res);

        if (res?.message) {
          toast.success(res?.message);
          setUser(res.user, res?.token);
          router.push("/dashboard");
        } else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    
      <div className="md:min-h-screen bg-pink-50 flex md:items-center justify-center p-4">
        <div className="w-full mt-20  max-w-md bg-white rounded-2xl shadow-xl p-8 relative">
           
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                TaskMaster
              </h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full text-black pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-pink-500"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full text-black pl-10 pr-12 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-pink-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white bg-gradient-to-r from-pink-500 to-orange-500 py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Switch to Signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  router.push("/auth/signup");
                  
                }}
                className="font-semibold cursor-pointer bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
     
  );
};

export default LoginForm;
