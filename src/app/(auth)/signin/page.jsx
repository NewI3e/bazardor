"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Link from "next/link";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { signIn } from "@/lib/auth-clint";

export default function SigninForm() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const data = {
      email,
      password,
    };

    const { data: resData, error } = await signIn.email({
      email: email, // required, The email address of the user.
      password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
      callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
    });
    if (error) {
      toast.error(error.message);
    }
  };
  const handelgoolesignup = async () => {
    const data = await signIn.social({
      provider: "google",
    });
    console.log(data);
  };
  const handleGithubSignup = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/", 
    });
  };

  return (
    <div className=" bg-[#f0f5f1] flex flex-col items-center px-4 pt-8">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>

        <p className="text-xs text-gray-500 mt-1">
          বিস্তারিত পেতে, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Signin Card */}
      <div className="w-full max-w-105 bg-white/80 border border-gray-200 rounded-xl p-5 sm:p-6">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-900">ইমেইল</Label>

            <Input placeholder="you@example.com" className="mt-1" />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <Label className="text-sm font-medium text-gray-900">
              পাসওয়ার্ড
            </Label>

            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="mt-1" />

            <FieldError />
          </TextField>

          {/* Signin Button */}
          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold mt-1"
          >
            সাইন ইন
          </Button>
        </Form>

        
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="text-xs text-gray-500">অথবা</span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social Signin */}
        <div className="grid grid-cols-2 gap-2">
          {/* Google Button */}
          <Button
            type="button"
            onClick={handelgoolesignup}
            variant="bordered"
            className="h-9 w-full rounded-lg border border-[#e2e8e5] bg-transparent px-2 text-[11px] font-semibold text-gray-900 shadow-none hover:bg-gray-50"
          >
            <svg viewBox="0 0 48 48" className="h-3.5 w-3.5 shrink-0">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.98 6.19c4.66-4.3 6.79-10.63 6.79-17.84Z"
              />
              <path
                fill="#FBBC05"
                d="M10.54 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24 24 0 0 0 0 21.56l7.98-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.79l-7.98-6.19c-2.15 1.45-4.89 2.3-7.93 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Google সাইন ইন
          </Button>

          {/* GitHub Button */}
          <Button
            type="button"
            onClick={handleGithubSignup}
            variant="bordered"
            className="h-9 w-full rounded-lg border border-[#e2e8e5] bg-transparent px-2 text-[11px] font-semibold text-gray-900 shadow-none hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-3.5 w-3.5 shrink-0"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.12c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            GitHub সাইন ইন
          </Button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-xs text-gray-600 mt-5">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-green-700 font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="text-xs text-gray-500 mt-5 hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
