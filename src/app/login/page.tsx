"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form onSubmit={handleLogin} className="bg-white p-3 rounded-2xl w-[28%] h-[40%]">
        <h1 className="text-center text-2xl mt-5 text-black font-bold">
          {loading ? "Processing..." : "Login page"}
        </h1>
        <div className="mt-7">
          <label className="text-black" htmlFor="email">Email</label>
          <br />
          <input
            className="mt-0.5 p-2 border text-black border-gray-900 rounded-lg mb-4 focus:outline-none w-[100%]"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="text-black" htmlFor="password">Password</label>
          <br />
          <input
            className="mt-0.5 p-2 border text-black border-gray-900 rounded-lg mb-4 focus:outline-none w-[100%]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <div className="flex justify-center items-center flex-col mt-4">
          <button
            type="submit"
            className="w-full p-2 border-none rounded-lg bg-blue-500 focus:outline-none hover:bg-blue-600 hover:cursor-pointer"
          >
            Login here!
          </button>
          <br />
          <div className="items-center flex justify-between w-full">
            <Link className="text-black hover:text-gray-900" href="/signup">
              Visit Signup page?
            </Link>
            <Link className="text-black hover:text-gray-900" href="/forgotPassword">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <button type="button" className="w-full p-2 border-none rounded-lg bg-red-500 focus:outline-none hover:bg-red-600 hover:cursor-pointer" onClick={() => signIn("google", { callbackUrl: "/" })}>
            Google
          </button>
        </div>
      </form>
    </div>
  );
}
