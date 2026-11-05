import Link from "next/link";
import { formatPrice, toBn, unitBn } from "@/lib/products";

export default function ProductCard({ product, isLoggedIn }) {
  const { slug, nameBn, image, unit, today, change } = product;

  // logged out -> sign in page, logged in -> specific product page
  const href = isLoggedIn ? `/products/${slug}` : "/signin";

  const badge = {
    up: { icon: "▲", cls: "bg-red-50 text-red-600" },
    down: { icon: "▼", cls: "bg-green-50 text-green-700" },
    flat: { icon: "—", cls: "bg-gray-100 text-gray-500" },
  }[change.dir];

  return (
    <Link
      href={href}
      className="block rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-2xl">
          {image}
        </span>
        <div>
          <h3 className="font-semibold text-gray-900">{nameBn}</h3>
          <p className="text-xs text-gray-500">প্রতি {unitBn[unit]}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">{formatPrice(today)}</span>
        <span className={`rounded px-2 py-0.5 text-xs font-medium ${badge.cls}`}>
          {badge.icon} {toBn(Math.abs(change.pct))}%
        </span>
      </div>
    </Link>
  );
}