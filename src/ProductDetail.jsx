export default function ProductDetail({ product, onBack, onAddToCart }) {
  return (
    <div>
      <button onClick={onBack}>← Volver</button>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ maxWidth: 220 }} />
      <p>
        <em>{product.category}</em>
      </p>
      <p>{product.description}</p>
      <p>
        <strong>${product.price}</strong>
      </p>
      <button onClick={() => onAddToCart(product)}>Añadir al carrito</button>
    </div>
  );
}
