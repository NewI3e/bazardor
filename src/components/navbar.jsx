"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession, signOut } from "@/lib/auth-clint";

import TodayDate from "./TodayDate";

const Navbar = () => {
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  

  // const today = useMemo(
  //   () =>
  //     new Intl.DateTimeFormat("bn-BD", {
  //       weekday: "long",
  //       day: "numeric",
  //       month: "long",
  //       year: "numeric",
  //       timeZone: "Asia/Dhaka",
  //     }).format(new Date()),
  //   [],
  // );

  const [formattedDate, setFormattedDate] = useState("");

  const user = session?.user;

  // বাংলা তারিখ
  // useEffect(() => {
  //   const today = new Intl.DateTimeFormat("bn-BD", {
  //     weekday: "long",
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     timeZone: "Asia/Dhaka",
  //   }).format(new Date());

  //   setFormattedDate(today);
  // }, []);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(
          Array.isArray(data) ? data : data.categories || data.data || [],
        );
      } catch (error) {
        console.error("Category fetching error:", error);
      }
    };

    fetchCategories();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error(error.message || "Logout failed");
        return;
      }

      setDropdownOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <header className="w-full bg-white">
      {/* Main Navbar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-green-700 flex items-center justify-center">
                <Image
                  src="/images/logo-icon.png"
                  alt="বাজার দর"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>

              {/* Name & Date */}
              <div>
                <h1 className="font-bold text-lg text-gray-900">বাজার দর</h1>

                <p className="text-[12px] text-black">
                  {<TodayDate /> || "তারিখ লোড হচ্ছে..."}
                </p>
              </div>
            </Link>

            {/* Authentication */}
            {isPending ? (
              <div className="w-24 h-9 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              /* Logged In */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || "Profile"}
                    className="w-9 h-9 rounded-full object-cover"
                  />

                  <span className="text-sm font-medium text-gray-800">
                    {user.name || "User"}
                  </span>

                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-500 rounded-xl shadow-lg py-2 z-50">
                    <Link
                      href={"/profile"}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      👤 আমার প্রোফাইল
                    </Link>

                    <div className="border-t border-gray-100 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      ↪ সাইন আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* log out log in */
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="border border-green-700 text-green-700 hover:bg-green-50 text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category  */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <nav className="flex items-center gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide py-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-green-700 transition shrink-0"
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
