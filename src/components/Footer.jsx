import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 sm:py-6 text-center sm:text-left">

          <p className="text-xs sm:text-sm text-gray-600">
            বাজার দর — প্রতিদিনের বাজার দাম এক নজরে।
          </p>

          <p className="text-xs sm:text-sm text-gray-500">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;