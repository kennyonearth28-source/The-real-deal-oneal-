import fetch from "node-fetch";

export default async function Page() {
  const res = await fetch(
    "https://dutchie.com/dispensary/ethos-northeast-philadelphia/products/flower"
  );
  const data = await res.json();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Live Flower Inventory</h1>
      {data.products ? (
        <ul>
          {data.products.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price / 100}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
