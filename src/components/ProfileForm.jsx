"use client";

import { useState } from "react";
import { signOut } from "@/lib/auth-clint";
import toast from "react-hot-toast";

export default function ProfileForm({ user, updateProfile }) {
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/signin";
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {/* User information */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "Profile"}
              className="h-12 w-12 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-lg font-semibold text-emerald-700">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-gray-800">
              {user.name || "ব্যবহারকারী"}
            </h2>
            <p className="truncate text-xs text-gray-500">
              {user.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="shrink-0 rounded-md border border-red-300 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            ↪ সাইন আউট
          </button>
        </div>
      </div>

      {/* Update profile */}
      <form
        action={async (formData) => {
          setLoading(true);

          try {
            await updateProfile(formData);
            toast.success("প্রোফাইল আপডেট হয়েছে");
          } catch (error) {
            toast.error(error.message || "আপডেট করা যায়নি");
          } finally {
            setLoading(false);
          }
        }}
        className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6"
      >
        <h3 className="mb-6 text-sm font-semibold text-gray-800">
          তথ্য
        </h3>

        <label
          htmlFor="name"
          className="mb-2 block text-xs font-medium text-gray-600"
        >
          নাম
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className="mb-3 w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-green-700 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
        </button>
      </form>
    </div>
  );
}