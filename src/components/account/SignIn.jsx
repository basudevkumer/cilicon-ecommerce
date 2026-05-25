import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaLock,
  FaRocket,
  FaHeadset,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { BiLogInCircle } from "react-icons/bi";
import BreadCrumb from "../commonComponent/breadcrumb/BreadCrumb";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Zod validation schema
const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address (e.g., name@example.com)"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

const SignIn = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    location.state?.message || "",
  );

  // React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      setServerError("");
      console.log("Login Data:", {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // firebase
      const userCreandtial = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log(userCreandtial.user);

      // Success - redirect to dashboard or home
      reset();

      // Show success message and redirect
      // alert("Login successful!");

      // Redirect based on user role or intended page
      const from = location.state?.from?.pathname || document.referrer || "/";
      console.log(from);

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Sign in error:", error);
      setServerError("Invalid email or password. Please try again.");
    }
  };

  // Handle social logins
  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
    // Implement social OAuth here
  };

  // Clear success message on input focus
  const handleInputFocus = () => {
    if (successMessage) {
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray_50 to-gray_100 font-publicSans">
      <BreadCrumb />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-slideDown">
              <p className="text-green-600 text-sm flex items-center gap-2">
                <FaCheckCircle
                  className="text-green-500 flex-shrink-0"
                  size={18}
                />
                <span>{successMessage}</span>
              </p>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-gray_00 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
            {/* Header with Decoration */}
            <div className="bg-gradient-to-r from-primary_500 to-primary_600 px-8 py-8 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <BiLogInCircle className="text-white text-3xl" />
                  <h1 className="heading3 text-white">Welcome Back! 👋</h1>
                </div>
                <p className="text-white/90 sm_400 flex items-center gap-2">
                  <FaArrowRight className="text-white/70" size={14} />
                  Sign in to continue your journey with us
                </p>
              </div>
            </div>

            {/* Form Container */}
            <div className="p-8">
              {/* Server Error */}
              {serverError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <RiErrorWarningFill
                      className="text-red-500 flex-shrink-0"
                      size={18}
                    />
                    <span>{serverError}</span>
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Email Field */}
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block label4 text-gray_700 mb-2"
                  >
                    <span className="flex items-center gap-2">
                      <MdEmail className="text-primary_500" />
                      Email Address <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    onFocus={handleInputFocus}
                    className={`w-full h-14 px-4 rounded-xl border-2 bg-gray_50 outline-none transition-all
                      ${
                        errors.email
                          ? "border-red-500 bg-red-50 focus:border-red-500"
                          : "border-gray_200 focus:border-primary_500 focus:bg-gray_00"
                      }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <RiErrorWarningFill className="flex-shrink-0" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="password" className="label4 text-gray_700">
                      <span className="flex items-center gap-2">
                        <MdPassword className="text-primary_500" />
                        Password <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary_500 hover:text-primary_600 hover:underline flex items-center gap-1"
                    >
                      <FaLock size={12} />
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      {...register("password")}
                      onFocus={handleInputFocus}
                      className={`w-full h-14 px-4 rounded-xl border-2 bg-gray_50 outline-none transition-all pr-12
                        ${
                          errors.password
                            ? "border-red-500 bg-red-50 focus:border-red-500"
                            : "border-gray_200 focus:border-primary_500 focus:bg-gray_00"
                        }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray_500 hover:text-gray_700 transition-colors"
                      tabIndex="-1"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <RiErrorWarningFill className="flex-shrink-0" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-3 mb-6">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    {...register("rememberMe")}
                    className="w-4 h-4 rounded border-gray_300 text-primary_500 focus:ring-primary_500"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-gray_600 cursor-pointer flex items-center gap-1"
                  >
                    <FaShieldAlt className="text-gray_400" size={14} />
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary_500 to-primary_600 hover:from-primary_600 hover:to-primary_700 disabled:from-primary_300 disabled:to-primary_300 text-white heading6 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <BiLogInCircle
                        className="group-hover:translate-x-1 transition-transform"
                        size={20}
                      />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray_200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray_00 text-gray_500 flex items-center gap-2">
                      <span className="w-8 h-px bg-gray_300"></span>
                      Or continue with
                      <span className="w-8 h-px bg-gray_300"></span>
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray_200 rounded-xl hover:border-primary_500 hover:bg-primary_50 transition-all disabled:opacity-50 group"
                  >
                    <FaGoogle className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline text-sm">Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("facebook")}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray_200 rounded-xl hover:border-primary_500 hover:bg-primary_50 transition-all disabled:opacity-50 group"
                  >
                    <FaFacebook className="text-blue-600 text-xl group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline text-sm">Facebook</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin("twitter")}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray_200 rounded-xl hover:border-primary_500 hover:bg-primary_50 transition-all disabled:opacity-50 group"
                  >
                    <FaTwitter className="text-blue-400 text-xl group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline text-sm">Twitter</span>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray_600 sm_400">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-primary_500 hover:text-primary_600 font-semibold hover:underline inline-flex items-center gap-1 group"
                    >
                      Create free account
                      <FaArrowRight
                        className="group-hover:translate-x-1 transition-transform"
                        size={12}
                      />
                    </Link>
                  </p>
                </div>

                {/* Additional Links */}
                <div className="mt-6 pt-6 border-t border-gray_100">
                  <div className="flex justify-center gap-4 text-xs text-gray_500">
                    <Link
                      to="/need-help"
                      className="hover:text-primary_500 hover:underline flex items-center gap-1"
                    >
                      <FaShieldAlt size={12} />
                      Privacy
                    </Link>
                    <span>•</span>
                    <Link
                      to="/customer-support"
                      className="hover:text-primary_500 hover:underline"
                    >
                      Terms
                    </Link>
                    <span>•</span>
                    <Link
                      to="/need-help"
                      className="hover:text-primary_500 hover:underline flex items-center gap-1"
                    >
                      <FaHeadset size={12} />
                      Help
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Features Section with React Icons */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="text-3xl mb-2 text-primary_500 group-hover:scale-110 transition-transform">
                <FaLock className="mx-auto" />
              </div>
              <p className="text-xs text-gray_600 font-medium">Secure Login</p>
              <p className="text-[10px] text-gray_400 mt-1">
                128-bit encryption
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="text-3xl mb-2 text-primary_500 group-hover:scale-110 transition-transform">
                <FaRocket className="mx-auto" />
              </div>
              <p className="text-xs text-gray_600 font-medium">Fast Access</p>
              <p className="text-[10px] text-gray_400 mt-1">Instant loading</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="text-3xl mb-2 text-primary_500 group-hover:scale-110 transition-transform">
                <FaHeadset className="mx-auto" />
              </div>
              <p className="text-xs text-gray_600 font-medium">24/7 Support</p>
              <p className="text-[10px] text-gray_400 mt-1">Live chat</p>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray_400 flex items-center justify-center gap-2">
              <FaShieldAlt className="text-green_500" />
              Protected by enterprise-grade security
            </p>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SignIn;
