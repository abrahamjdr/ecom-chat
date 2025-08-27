import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ onSelectProduct }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => r.json())
      .then(setItems)
      .catch((e) => console.error("Productos:", e));
  }, []);

  if (!items.length)
    return (
      <div className="container">
        <p>Cargando productos…</p>
      </div>
    );

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <div className="grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
        ))}
      </div>
    </div>
  );
}
