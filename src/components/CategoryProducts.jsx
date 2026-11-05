"use client";

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { toBn } from "@/lib/products";

export default function CategoryProducts({ products, isLoggedIn }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.today - b.today);
    if (sort === "desc") list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="mb-4 flex items-center justify-end gap-2 rounded-xl border border-gray-100 bg-white p-4">
        <label className="text-sm text-gray-500">সাজান</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded border px-2 py-1 text-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-3 text-xs text-gray-500">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} isLoggedIn={isLoggedIn} />
        ))}
      </div>
    </>
  );
}