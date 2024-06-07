"use client";
import { SignUp } from "@clerk/nextjs";
const SignupPage = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-gray-800 shadow-md rounded-md">
        <SignUp />
      </div>
    </div>
  );
};

export default SignupPage;
