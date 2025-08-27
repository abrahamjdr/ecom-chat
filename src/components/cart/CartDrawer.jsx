import { useCart } from "../../cart/context";

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, add, removeOne, removeAll, clear } = useCart();

  return (
    <aside className={`cart-drawer ${open ? "open" : ""}`}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: 12,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3 style={{ margin: 0, flex: 1 }}>Tu carrito</h3>
        <button className="btn-ghost" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* body */}
      <div className="cart-body">
        {items.length === 0 && <p>Vacío.</p>}

        {items.map((i) => (
          <div key={i.id} className="cart-item">
            <img src={i.image} alt={i.title} />
            <div style={{ flex: 1 }}>
              <div className="cart-title">{i.title}</div>
              <small>
                ${i.price} × {i.qty}
              </small>
            </div>
            <div className="cart-controls" style={{ display: "flex", gap: 6 }}>
              <button className="btn-ghost" onClick={() => removeOne(i)}>
                -
              </button>
              <button className="btn-ghost" onClick={() => add(i)}>
                +
              </button>
              <button className="btn-ghost" onClick={() => removeAll(i)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* acciones abajo */}
      <div className="cart-actions">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <strong>Subtotal</strong>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <button className="btn-ghost" onClick={clear}>
          Vaciar
        </button>
        <button className="btn">Pagar (demo)</button>
      </div>
    </aside>
  );
}
