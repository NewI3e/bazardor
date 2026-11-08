"use client";
import { useEffect, useState } from "react";
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

  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const user = session?.user;

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
      setMobileOpen(false);
      toast.success("সফলভাবে সাইন আউট হয়েছে");

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setCatOpen(false);
  };

  return (
    <header className="w-full bg-white">
      {/* Main Navbar */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-green-400 flex items-center justify-center">
                <Image
                  src="/images/logo-icon.png"
                  alt="বাজার দর"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>

              
              <div>
                <h1 className="font-bold text-lg text-gray-900">বাজার দর</h1>

                
                <p className="text-[10px] sm:text-[12px] text-black">
                  <TodayDate />
                </p>
              </div>
            </Link>

            
            <div className="flex items-center gap-2">
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

                    
                    <span className="hidden sm:inline text-sm font-medium text-gray-800">
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
               
                <div className="hidden md:flex items-center gap-2">
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

              
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"
                aria-label="Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M6 6l12 12M18 6L6 18"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {mobileOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-3 py-3 space-y-1">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-green-700 bg-green-50"
          >
            হোম
          </Link>

         
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>ক্যাটাগরি</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                catOpen ? "rotate-180" : ""
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

          {catOpen && (
            <div className="grid grid-cols-2 gap-2 px-1 pb-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700 hover:text-green-700"
                >
                  <span>{category.icon}</span>
                  <span>{category.nameBn}</span>
                </Link>
              ))}
            </div>
          )}

          {/* Auth buttons (only when logged out) */}
          {!isPending && !user && (
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
              <Link
                href="/signin"
                onClick={closeMobileMenu}
                className="text-center border border-green-700 text-green-700 text-sm font-medium py-2.5 rounded-lg"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                onClick={closeMobileMenu}
                className="text-center bg-green-700 text-white text-sm font-medium py-2.5 rounded-lg"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      )}

      
      <div className="hidden md:block border-b border-gray-100">
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