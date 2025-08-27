import { useState } from "react";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import CartDrawer from "./components/cart/CartDrawer";
import ThemeControls from "./components/ui/ThemeControls";
import ChatPanel from "./components/chat/Chat";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="page">
      <header className="nav">
        <div
          className="container"
          style={{ display: "flex", gap: 8, alignItems: "center", padding: 12 }}
        >
          <h1 style={{ margin: 0 }}>EcomChat</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <ThemeControls />
            <button className="btn" onClick={() => setCartOpen(true)}>
              🛒
            </button>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />

      <main>
        {!selected && <ProductList onSelectProduct={setSelected} />}
        {selected && (
          <ProductDetail
            product={selected}
            onBack={() => setSelected(null)}
            onAdded={() => setCartOpen(true)}
          />
        )}
      </main>

      {/* FAB de chat */}
      <button className="fab" onClick={() => setChatOpen(true)} title="Chat">
        💬
      </button>
    </div>
  );
}
