import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import Footer from "../Home/Footer";
import HeaderMain from "../Home/HeaderMain";

export default function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = signupInfo;

    if (!name || !email || !password || !confirmPassword) {
      return handleError("All fields are required");
    }

    if (password !== confirmPassword) {
      return handleError("Passwords do not match");
    }

    if (!agreed) {
      return handleError("Please agree to the Terms & Conditions");
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || "Account created successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      } else if (error) {
        const details =
          error?.details?.[0]?.message || message || "Signup failed";

        handleError(details);
      } else {
        handleError(message || "Signup failed");
      }

      console.log("Signup result:", result);
    } catch (error) {
      console.error("Signup error:", error);
      handleError("Unable to connect to server");
    }
  };

  return (
    <>
      <HeaderMain showSearchBar={false} />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">

          <div className="grid md:grid-cols-2">

            {/* Signup Form */}
            <div className="p-6 md:p-10 lg:p-12">

              <div className="mb-8">
                <p className="text-purple-600 font-semibold uppercase tracking-wider text-sm">
                  Join ReWear
                </p>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
                  Create your account
                </h1>

                <p className="text-gray-500 mt-2">
                  Buy, sell and swap pre-loved fashion.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-5">

                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={signupInfo.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={signupInfo.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={signupInfo.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={signupInfo.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 outline-none"
                    required
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-purple-600"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <span className="text-purple-600 underline cursor-pointer">
                      Terms & Conditions
                    </span>
                    .
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition"
                >
                  Create ReWear Account
                </button>

              </form>

              <p className="text-center text-gray-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Log in
                </Link>
              </p>

            </div>

            {/* Right Side */}
            <div className="hidden md:flex bg-purple-700 items-center justify-center p-10">
              <div className="text-center text-white">

                <div className="text-8xl mb-6">
                  ♻️
                </div>

                <h2 className="text-3xl font-bold">
                  Wear. Swap. Repeat.
                </h2>

                <p className="text-purple-100 mt-4 leading-relaxed">
                  Join ReWear and give your clothes a second life.
                  Discover affordable fashion and exchange clothes
                  with the community.
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />

      <ToastContainer />
    </>
  );
}