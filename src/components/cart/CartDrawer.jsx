import { useCart } from "../../cart/context";

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, add, removeOne, removeAll, clear } = useCart();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: open ? 0 : -460,
        width: 360,
        height: "100dvh",
        background: "var(--card)",
        color: "var(--text)",
        transition: "right .25s",
        padding: 16,
        zIndex: 50,
      }}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", right: 12, top: 12 }}
      >
        ✕
      </button>
      <h3>Tu carrito</h3>

      {items.length === 0 && <p>Vacío</p>}

      {items.map((i) => (
        <div
          key={i.id}
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            margin: "8px 0",
          }}
        >
          <img src={i.image} width="40" height="40" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, lineHeight: 1.2 }}>{i.title}</div>
            <small>
              ${i.price} × {i.qty}
            </small>
          </div>
          <button onClick={() => removeOne(i)}>-</button>
          <button onClick={() => add(i)}>+</button>
          <button onClick={() => removeAll(i)}>🗑</button>
        </div>
      ))}

      <hr />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <strong>Subtotal</strong> <strong>${subtotal.toFixed(2)}</strong>
      </div>
      <button onClick={clear} style={{ marginTop: 8, width: "100%" }}>
        Vaciar
      </button>
      <button style={{ marginTop: 8, width: "100%" }}>Pagar (demo)</button>
    </div>
  );
}
