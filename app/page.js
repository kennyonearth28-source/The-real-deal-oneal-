"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await fetch("/api/inventory");
        const data = await res.json();
        setInventory(data.inventory || []);
      } catch (err) {
        console.error("Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading inventory...</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Live Inventory</h1>
      {inventory.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <ul className="space-y-4">
          {inventory.map((item) => (
            <li
              key={item.id}
              className="border rounded-lg p-4 shadow-sm flex flex-col items-center"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover mb-2 rounded"
                />
              )}
              <h2 className="font-semibold text-lg">{item.name}</h2>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
              {item.category && (
                <p className="text-xs text-gray-400 mt-1">{item.category}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
