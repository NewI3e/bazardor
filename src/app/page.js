import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getProducts, toBn } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import TodayDate from "@/components/TodayDate";

async function ProductSections({ products }) {
  let isLoggedIn = false;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    isLoggedIn = !!session;
  } catch {}

  const rising = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const falling = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Section
        title="আজ দাম বেড়েছে"
        icon="▲"
        iconClass="text-red-600"
        products={rising}
        isLoggedIn={isLoggedIn}
      />
      <Section
        title="আজ দাম কমেছে"
        icon="▼"
        iconClass="text-green-700"
        products={falling}
        isLoggedIn={isLoggedIn}
      />

      <div id="all-products" className="mt-10 scroll-mt-20">
        <h2 className="text-lg font-bold text-gray-900">সব পণ্য</h2>
        <p className="mb-4 text-xs text-gray-500">
          মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, iconClass, products, isLoggedIn, id }) {
  return (
    <section id={id} className="mt-10">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
        {icon && <span className={`text-sm ${iconClass}`}>{icon}</span>}
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} isLoggedIn={isLoggedIn} />
        ))}
      </div>
    </section>
  );
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Banner */}
      <section className="mt-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 mb-10">
            <TodayDate />
          </span>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গত, সর্বনিম্ন-সর্বাধিক ও দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link
            href="#all-products"
            className="mt-5 inline-block rounded-md bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <Image
          src="/images/bazar-hero.png"
          alt="বাজারের সবজি ও ফলের ঝুড়ি"
          width={420}
          height={300}
          priority
          className="h-auto w-full max-w-sm"
        />
      </section>

      <Suspense
        fallback={
          <div className="mt-10 text-center text-sm text-gray-500">
            বাজারের তথ্য লোড হচ্ছে...
          </div>
        }
      >
        <ProductSections products={products} />
      </Suspense>
    </main>
  );
}
