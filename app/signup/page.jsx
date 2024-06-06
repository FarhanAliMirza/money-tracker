"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
      e.preventDefault();
    try {
      console.log(password);
      sessionStorage.setItem("user", true);
      const res = await createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignUp = (e) => {
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
        <h2 className="text-2xl font-bold mb-6 text-white">Signup</h2>
        {/* Signup form */}
        <form className="space-y-4" onSubmit={handleSignup}>
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
            Signup
          </button>
        </form>
        <button
          className="w-full my-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={(e) => handleGoogleSignup(e)}
        >
          SignUp with google
        </button>
        {/* Already a user section */}
        <div className="mt-4 text-center">
          <span className="text-gray-400">Already a user?</span>
          <a href="/login" className="ml-1 text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
