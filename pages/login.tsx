import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "../app/globals.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!validateEmail(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        console.log("Token:", storedToken);
      } else {
        console.log("No token found");
      }
      localStorage.setItem("userName", user?.name || "Guest");
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full h-screen flex flex-col md:flex-row">
      <div className="ml-6 mt-4">
        <Link href="/" className="text-3xl mt-10 ml-2 font-semibold">
          BluePilot
        </Link>
      </div>
      <div className="relative w-full md:w-1/2 h-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ clipPath: "circle(40% at center)" }}
        >
          <div
            className="relative w-full h-full"
            style={{
              backgroundImage: `url('/logininterview.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full"></div>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#4895ef] to-[#c77dff] uppercase tracking-wide">
              Sign in to Bluepilot
            </h2>
            <h3>Welcome back! Please sign in to continue</h3>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4895ef] focus:border-[#4895ef] sm:text-sm"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4895ef] focus:border-[#4895ef] sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-7 right-3 flex items-center justify-center p-2 text-sm leading-5 opacity-50"
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#4895ef] to-[#c77dff] hover:from-[#c77dff] hover:to-[#4895ef] focus:outline-none"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="mt-4 text-sm">
            Forgot your password?{" "}
            <Link
              href="/forgot-password"
              className="text-[#4895ef] hover:text-[#c77dff]"
              aria-label="Forgot password"
            >
              Reset it
            </Link>
          </p>
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#4895ef] hover:text-[#c77dff]"
              aria-label="Switch to sign-up"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
