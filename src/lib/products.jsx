const API = "https://api.abcz.workers.dev/api/bazardor/products";

export async function getProducts(category) {
  const url = category ? `${API}?category=${category}` : API;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

const bnDigits = "০১২৩৪৫৬৭৮৯";
export const toBn = (n) => String(n).replace(/\d/g, (d) => bnDigits[d]);

export const unitBn = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };

export const formatPrice = (n) => `${toBn(n.toLocaleString("en-US"))} টাকা`;