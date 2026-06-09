import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from "../features/api/authApi";
import { setCredentials, selectAuthLoading } from "../features/slices/authSlice"; // Fixed path
import { ROUTES } from "../config";
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authLoading = useSelector(selectAuthLoading);

  const [signIn, { isLoading: isSigningIn }] = useSignInMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // pages/Login.jsx - Updated handleLogin function
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    const errs = {};
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      errs.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(normalizedEmail)) {
      errs.email = "Invalid email format.";
    }

    if (!password) {
      errs.password = "Password is required.";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    try {
      // Call the signIn mutation from RTK Query
      const response = await signIn({
        email: normalizedEmail,
        password,
      }).unwrap();


      // Extract data from response
      const { accessToken, user, refreshToken } = response;

      // Dispatch to Redux store
      dispatch(setCredentials({
        user: user,
        token: accessToken
      }));

      // Store tokens in localStorage
      if (accessToken) {
        localStorage.setItem('token', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Show success message
      toast.success(response.message || "Login successful! Redirecting...");

      // ✅ FIXED: Handle uppercase roles from backend
      const role = user?.role?.toUpperCase(); // Normalize to uppercase

      const dashboardMap = {
        ADMIN: ROUTES.ADMIN_DASHBOARD || "/admin/dashboard",
        USER: ROUTES.USER_DASHBOARD || "/user/dashboard",
        CONSULTANT: ROUTES.CONSULTANT_DASHBOARD || "/consultant/dashboard",
      };

      const redirectPath = dashboardMap[role] || ROUTES.HOME;

      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 100);

    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Login failed. Please try again.";

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status === 401) {
        errorMessage = "Invalid email or password.";
      } else if (error?.status === 403) {
        errorMessage = "Your account is locked or not verified.";
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-dvh flex">
      {/* Left Side: Brand Imagery */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden shrink-0">
        <img
          src="/login.jpg"
          alt="Login visual"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Right Side: Authentication Form */}
      <div className="flex-1 bg-white flex items-center justify-center shadow-[-7px_0px_11.4px_0px_rgba(0,0,0,0.25)] overflow-y-auto p-4">
        <div className="w-full max-w-xl">
          {/* Back Button */}
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-base text-gray-600 hover:text-[#E2AB0B] font-medium transition-colors mb-2 group"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Home
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-[#000000] mb-3">
              Login to Your Account
            </h1>
            <p className="text-[#373737] text-base leading-relaxed">
              Great to have you with us again at netwerkmediums. Sign in now and
              receive insights that truly make a difference.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2 tracking-wide">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSigningIn || authLoading}
                className={`w-full px-4 py-3 bg-[#FEF5E7] border-none rounded text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#E2AB0B] outline-none transition-all disabled:opacity-60 ${errors.email ? "ring-2 ring-red-400" : ""
                  }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password here..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSigningIn || authLoading}
                  className={`w-full px-4 py-3 bg-[#FEF5E7] border-none rounded text-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#E2AB0B] outline-none transition-all disabled:opacity-60 ${errors.password ? "ring-2 ring-red-400" : ""
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm font-medium text-[#E2AB0B] hover:text-[#DF900A] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSigningIn || authLoading}
              className="w-full bg-[#E2AB0B] disabled:opacity-60 text-white py-3 rounded font-bold text-sm transition-all shadow-md active:scale-[0.98] inline-flex items-center justify-center gap-2"
            >
              {(isSigningIn || authLoading) ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-base text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#E2AB0B] font-medium hover:text-[#DF900A] transition-colors"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;