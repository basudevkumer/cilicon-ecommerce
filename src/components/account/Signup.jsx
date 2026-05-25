import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaRegEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";
import BreadCrumb from "../commonComponent/breadcrumb/BreadCrumb";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Zod validation schema
const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must not exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),

    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address (e.g., name@example.com)")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)",
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    terms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {

  const auth = getAuth();


  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  // React Hook Form with Zod
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched", // Validate on blur
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // Watch password for confirm password validation
  const password = watch("password");

  // Form submit handler
  const onSubmit = async (data) => {
    try {
      setServerError("");
      console.log("Signup Data:", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        terms: data.terms,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      //firebase config
      const userCreandtial = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      console.log(userCreandtial.user);

      // Success - redirect to login or dashboard

      reset();
      navigate("/login", {
        state: { message: "Account created successfully! Please login." },
      });
    } catch (error) {
      console.error("Signup error:", error);
      setServerError(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  };

  // Handle Google signup
  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // Implement Google OAuth here
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const pwd = password || "";
    let strength = 0;

    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[@$!%*?&]/.test(pwd)) strength++;

    return strength;
  };

  const passwordStrength = getPasswordStrength();
  const strengthText =
    ["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength - 1] ||
    "Very Weak";
  const strengthColor =
    [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ][passwordStrength - 1] || "bg-gray-200";

  return (
    <div>
      <BreadCrumb />
      <div className="min-h-screen flex items-center justify-center bg-gray_50 font-publicSans py-8 px-4">
        <div className="w-full max-w-md bg-gray_00 rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="heading3 text-gray_900">Create Account 🚀</h1>
            <p className="sm_400 text-gray_500 mt-1">
              Join with us and start your journey
            </p>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {serverError}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div className="mb-4">
              <label className="label4 text-gray_600">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <FaRegUser
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    errors.fullName ? "text-red-400" : "text-gray_400"
                  }`}
                />
                <input
                  type="text"
                  {...register("fullName")}
                  placeholder="John Doe"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-gray_50 border transition outline-none
                    ${
                      errors.fullName
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : touchedFields.fullName && !errors.fullName
                          ? "border-green-500 bg-green-50"
                          : "border-gray_100 focus:border-primary_500 focus:bg-gray_00"
                    }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="label4 text-gray_600">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <FaRegEnvelope
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    errors.email ? "text-red-400" : "text-gray_400"
                  }`}
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="example@email.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-gray_50 border transition outline-none
                    ${
                      errors.email
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : touchedFields.email && !errors.email
                          ? "border-green-500 bg-green-50"
                          : "border-gray_100 focus:border-primary_500 focus:bg-gray_00"
                    }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="label4 text-gray_600">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <FaLock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    errors.password ? "text-red-400" : "text-gray_400"
                  }`}
                />
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3 rounded-xl bg-gray_50 border transition outline-none
                    ${
                      errors.password
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : touchedFields.password && !errors.password
                          ? "border-green-500 bg-green-50"
                          : "border-gray_100 focus:border-primary_500 focus:bg-gray_00"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray_400 hover:text-gray_600"
                  tabIndex="-1"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 h-full rounded transition-all ${
                          level <= passwordStrength
                            ? strengthColor
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-xs mt-1 ${passwordStrength >= 3 ? "text-green-600" : "text-orange-600"}`}
                  >
                    Password Strength: {strengthText}
                  </p>
                </div>
              )}

              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.password.message}
                </p>
              )}

              {/* Password Requirements */}
              {touchedFields.password && !errors.password && (
                <ul className="text-xs text-gray-500 mt-2 space-y-1">
                  <li className={password?.length >= 8 ? "text-green-600" : ""}>
                    ✓ At least 8 characters
                  </li>
                  <li
                    className={/[A-Z]/.test(password) ? "text-green-600" : ""}
                  >
                    ✓ One uppercase letter
                  </li>
                  <li
                    className={/[a-z]/.test(password) ? "text-green-600" : ""}
                  >
                    ✓ One lowercase letter
                  </li>
                  <li
                    className={/[0-9]/.test(password) ? "text-green-600" : ""}
                  >
                    ✓ One number
                  </li>
                  <li
                    className={
                      /[@$!%*?&]/.test(password) ? "text-green-600" : ""
                    }
                  >
                    ✓ One special character (@$!%*?&)
                  </li>
                </ul>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="label4 text-gray_600">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <FaLock
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    errors.confirmPassword ? "text-red-400" : "text-gray_400"
                  }`}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3 rounded-xl bg-gray_50 border transition outline-none
                    ${
                      errors.confirmPassword
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : touchedFields.confirmPassword &&
                            !errors.confirmPassword
                          ? "border-green-500 bg-green-50"
                          : "border-gray_100 focus:border-primary_500 focus:bg-gray_00"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray_400 hover:text-gray_600"
                  tabIndex="-1"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center gap-x-3 mb-6">
              <input
                type="checkbox"
                {...register("terms")}
                className="mt-1 cursor-pointer"
                id="terms"
              />
              <label
                htmlFor="terms"
                className="tiny_400 text-gray-500 cursor-pointer"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-primary_500 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-primary_500 hover:underline"
                >
                  Privacy Policy
                </Link>
                <span className="text-red-500">*</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-xs -mt-4 mb-4 flex items-center gap-1">
                <span>⚠️</span>
                {errors.terms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary_500 hover:bg-primary_600 disabled:bg-primary_300 text-white md_500 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  Creating Account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray_100"></div>
              <span className="tiny_400 text-gray_400">OR</span>
              <div className="flex-1 h-px bg-gray_100"></div>
            </div>

            {/* Google Signup */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              className="w-full border border-gray_100 hover:border-gray_200 py-3 rounded-xl sm_500 text-gray_700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>

            {/* Footer */}
            <p className="tiny_400 text-gray_500 text-center mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary_500 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;