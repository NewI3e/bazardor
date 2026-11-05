"use client"; 

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";


const toBn = (n) =>
  String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const unitBn = { kg: "কেজি", litre: "লিটার", l: "লিটার", dozen: "হালি", piece: "পিস" };

const Marque = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch");
        setProducts(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(true);
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <div className="h-9.25 bg-base-100 border-y animate-pulse" />;
  }
  if (error || products.length === 0) return null;

  return (
    <div className="border-y border-base-300 bg-base-100 bg-white">
      <Marquee pauseOnHover speed={40} gradient={false}>
        {products.map((p) => {
          const up = p.change?.dir === "up";
          return (
            <div
              key={p.id}
              className="flex items-center gap-2 px-6 py-2 text-xs border-r border-base-300"
            >
              <span>{p.image}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span>
                {toBn(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
              </span>
              <span className={up ? "text-red-500" : "text-green-600"}>
                {up ? "▲" : "▼"} {toBn(p.change.pct)}%
              </span>
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Marque;