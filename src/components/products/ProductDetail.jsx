import { useCart } from "../../cart/context";

export default function ProductDetail({ product, onBack, onAdded }) {
  const { add } = useCart();

  const handleAdd = () => {
    add(product);
    onAdded?.(); // abre el drawer si te lo pasan por props
  };

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
      <button onClick={handleAdd}>Añadir al carrito</button>
    </div>
  );
}
