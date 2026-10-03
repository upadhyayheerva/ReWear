import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../../utils";
import Footer from "../Home/Footer";
import HeaderMain from "../Home/HeaderMain";
import { LogIn, RefreshCcw, ShieldCheck, ShoppingBag } from "lucide-react";

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      const result = await response.json();

      const { success, message, error, jwtToken, name } = result;

      if (success) {
        handleSuccess(message || "Login successful!");

        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (error) {
        const details =
          error?.details?.[0]?.message ||
          message ||
          "Login failed";

        handleError(details);
      } else {
        handleError(message || "Login failed");
      }

      console.log("Login result:", result);
    } catch (error) {
      console.error("Login error:", error);
      handleError("Unable to connect to server");
    }
  };

  return (
    <>
      <HeaderMain showSearchBar={false} />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
          <div className="grid md:grid-cols-2">

            {/* Login Form */}
            <div className="p-6 md:p-12 lg:p-16">
              <div className="max-w-md mx-auto">

                <div className="mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-5">
                    <LogIn
                      size={30}
                      className="text-purple-600"
                    />
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Welcome Back
                  </h1>

                  <p className="text-gray-500 mt-3">
                    Login to continue your ReWear journey.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">

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
                      value={loginInfo.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
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
                      value={loginInfo.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    />
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition shadow-md"
                  >
                    Login to ReWear
                  </button>
                </form>

                <p className="text-center text-gray-500 mt-7">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            {/* ReWear Information */}
            <div className="hidden md:flex bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 text-white p-12 lg:p-16 items-center">
              <div className="max-w-md mx-auto">

                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-white/15 p-3 rounded-2xl">
                    <RefreshCcw size={36} />
                  </div>

                  <h2 className="text-4xl font-bold">
                    ReWear
                  </h2>
                </div>

                <h3 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Wear.
                  <span className="block text-yellow-300">
                    Swap.
                  </span>
                  <span className="block">
                    Repeat.
                  </span>
                </h3>

                <p className="text-purple-100 text-lg mt-6 leading-relaxed">
                  Discover pre-loved fashion, sell clothes you no longer
                  need, or exchange your wardrobe with the community.
                </p>

                <div className="space-y-4 mt-10">

                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <ShoppingBag size={25} />
                    <div>
                      <p className="font-semibold">
                        Discover Fashion
                      </p>
                      <p className="text-sm text-purple-200">
                        Find unique pre-loved clothes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <RefreshCcw size={25} />
                    <div>
                      <p className="font-semibold">
                        Swap & Reuse
                      </p>
                      <p className="text-sm text-purple-200">
                        Give your clothes a second life.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                    <ShieldCheck size={25} />
                    <div>
                      <p className="font-semibold">
                        Simple Marketplace
                      </p>
                      <p className="text-sm text-purple-200">
                        Buy and sell with ease.
                      </p>
                    </div>
                  </div>

                </div>
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