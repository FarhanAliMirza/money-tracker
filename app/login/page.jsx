"use client";
import { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      sessionStorage.setItem("user", true);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    try {
      signInWithGoogle().then((res) => {
        if (res.user) {
          sessionStorage.setItem("user", true);
          router.push("/");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        {/* Login form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-white"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-700 text-white"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <button
          className="w-full my-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={(e) => handleGoogleLogin(e)}
        >
          Login with google
        </button>
        {/* Not a user section */}
        <div className="mt-4 text-center">
          <span className="text-gray-400">Not a user?</span>
          <a href="/signup" className="ml-1 text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
