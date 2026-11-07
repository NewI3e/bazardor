import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProducts, toBn, unitBn } from "@/lib/products";

const fmtAvg = (n) => toBn(Number.isInteger(n) ? n : n.toFixed(2));

export default function ProductPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে...
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const { slug } = await params;
  const all = await getProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) notFound();

  const { nameBn, image, unit, today, yesterday, change, markets } = product;

  const minPrice = Math.min(...markets.map((m) => m.min));
  const maxPrice = Math.max(...markets.map((m) => m.max));

  const rows = markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg); 

  const diff = Math.abs(today - yesterday); 
  const trend = {
    up: {
      text: `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`,
      color: "text-red-600",
      icon: "▲",
    },
    down: {
      text: `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`,
      color: "text-green-700",
      icon: "▼",
    },
    flat: {
      text: "গতকালের তুলনায় আজ দাম অপরিবর্তিত",
      color: "text-gray-500",
      icon: "—",
    },
  }[change.dir];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-6">
      {/* ////// */}
      <nav className="mb-4 flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-green-700">হোম</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-green-700">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800">{nameBn}</span>
      </nav>

      {/* Header card */}
      <section className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 text-4xl">
            {image}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{nameBn}</h1>
            <p className="text-xs text-gray-500">
              প্রতি {unitBn[unit]} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-xs text-gray-700">{trend.text}</p>
          </div>
        </div>

        <div className="min-w-27.5 rounded-xl bg-green-50/60 px-4 py-3 text-center">
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">{toBn(today)}</p>
          <p className="text-[11px] text-gray-500">টাকা / {unitBn[unit]}</p>
          <p className={`mt-1 text-[11px] font-medium ${trend.color}`}>
            {trend.icon} {toBn(Math.abs(change.pct))}%
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-[11px] text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {toBn(minPrice)} <span className="text-xs font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-[11px] text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-[11px] text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-xl font-bold text-red-600">
              {toBn(maxPrice)} <span className="text-xs font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-[11px] text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-[11px] text-gray-500">গড় দাম</p>
            <p className="mt-1 text-xl font-bold text-green-700">
              {toBn(today)} <span className="text-xs font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              প্রতি {unitBn[unit]}-এর হিসাবে
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-6 font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="border border-gray-200 p-3 text-left font-medium">বাজার</th>
                <th className="border border-gray-200 p-3 text-left font-medium">বিভাগ</th>
                <th className="border border-gray-200 p-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="border border-gray-200 p-3 text-right font-medium">সর্বাধিক</th>
                <th className="border border-gray-200 p-3 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.market} className="odd:bg-white even:bg-green-50/40">
                  <td className="border border-gray-200 p-3">{m.market}</td>
                  <td className="border border-gray-200 p-3 text-gray-600">{m.division}</td>
                  <td className="border border-gray-200 p-3 text-right">{toBn(m.min)} টাকা</td>
                  <td className="border border-gray-200 p-3 text-right">{toBn(m.max)} টাকা</td>
                  <td className="border border-gray-200 p-3 text-right font-medium">
                    {fmtAvg(m.avg)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}