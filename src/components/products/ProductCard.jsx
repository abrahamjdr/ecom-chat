import { useCart } from "../../cart/context";

export default function ProductCard({ product, onSelect }) {
  const { add } = useCart();

  return (
    <article className="card-product">
      <img src={product.image} alt={product.title} />
      <h3 className="truncate-2" style={{ margin: "4px 0 0" }}>
        {product.title}
      </h3>

      <div className="card-actions">
        <span className="price">${product.price}</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost" onClick={() => onSelect(product)}>
            Ver
          </button>
          <button className="btn" onClick={() => add(product)}>
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}
