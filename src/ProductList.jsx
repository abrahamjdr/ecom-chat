import { useEffect, useState } from "react";

export default function ProductList({ onSelectProduct }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((r) => r.json())
      .then(setItems)
      .catch((e) => console.error("Productos:", e));
  }, []);

  if (!items.length) return <p>Cargando productos…</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((p) => (
        <li
          key={p.id}
          onClick={() => onSelectProduct(p)}
          style={{
            display: "flex",
            gap: 12,
            cursor: "pointer",
            margin: "8px 0",
          }}
        >
          <img src={p.image} alt={p.title} width="48" height="48" />
          <div>
            <strong>{p.title}</strong>
            <div>${p.price}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
