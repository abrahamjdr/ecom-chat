import { useState } from "react";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import CartDrawer from "./CartDrawer";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header
        style={{ display: "flex", gap: 8, alignItems: "center", padding: 12 }}
      >
        <h1 style={{ margin: 0 }}>EcomChat</h1>
        <button
          style={{ marginLeft: "auto" }}
          onClick={() => setCartOpen(true)}
        >
          🛒
        </button>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main style={{ padding: 16 }}>
        {!selected && <ProductList onSelectProduct={setSelected} />}
        {selected && (
          <ProductDetail
            product={selected}
            onBack={() => setSelected(null)}
            onAdded={() => setCartOpen(true)} // abrir carrito tras añadir
          />
        )}
      </main>
    </>
  );
}
