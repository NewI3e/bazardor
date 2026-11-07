import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-emerald-600">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mt-3 text-gray-500">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি
          পাওয়া যাচ্ছে না অথবা পেজটি সরানো হয়েছে।
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center mt-6
          rounded-xl bg-emerald-600 px-6 py-3
          font-medium text-white transition
          hover:bg-emerald-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}