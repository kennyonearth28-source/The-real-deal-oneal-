import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Dutchie API endpoint
    const url = "https://dutchie.com/dispensary/ethos-northeast-philadelphia/products/flower";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    const data = await response.json();

    // Map only the fields we want (no prices)
    const inventory = data.products.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description || "",
      category: item.category?.name || "",
      image: item.image_url || "",
    }));

    res.status(200).json({ inventory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
}
