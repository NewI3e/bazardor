import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProducts, toBn } from "@/lib/products";
import CategoryProducts from "@/components/CategoryProducts";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const products = await getProducts(slug);
  if (!products.length) notFound();

  const { categoryNameBn, categoryIcon } = products[0];

  const session = await auth.api.getSession({ headers: await headers() });
  const isLoggedIn = !!session;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <span className="text-5xl">{categoryIcon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryNameBn}</h1>
          <p className="text-sm text-gray-500">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} isLoggedIn={isLoggedIn} />
    </main>
  );
}