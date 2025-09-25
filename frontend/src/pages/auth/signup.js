import React, { useState } from "react";
import {
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
} from "lucide-react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "@/services/Api";  
import toast from "react-hot-toast";

const SignupForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .nullable()
      .notRequired(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special char"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      setIsLoading(true);

      try {
        const payload = {
          fullname: values.fullName,
          email: values.email.toLowerCase(),
          phone: values.phoneNumber,
          password: values.password,
        };

        const res = await API("post", "user/register", payload);
        

        if (res?.message) {
          toast.success(res?.message);
          resetForm();
          router.push("/auth/login");  
        } else {
           toast.error(res?.message)
        }
      } catch (error) {
         toast.error(error?.message)
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mt-20 bg-white rounded-2xl shadow-xl p-8">
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Join TaskMaster</h2>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-4 text-black py-3 rounded-lg border-2 ${
                  formik.touched.fullName && formik.errors.fullName
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
            )}
          </div>

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
                className={`w-full pl-10 text-black pr-4 py-3 rounded-lg border-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                }`}
                placeholder="Enter your email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number  
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full pl-10 text-black pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-pink-500"
                placeholder="Enter your phone number"
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full text-black pl-10 pr-12 py-3 rounded-lg border-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full text-black pl-10 pr-12 py-3 rounded-lg border-2 ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-pink-500"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
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
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-semibold bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 bg-clip-text text-transparent hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
